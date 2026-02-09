'use client'

import { useState, useEffect, useMemo, useCallback, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { Opportunity } from '@/types/database.types'
import Link from 'next/link'

const DESTINATIONS = [
  { value: 'Costa Rica', label: 'Costa Rica' },
  { value: 'Thailand', label: 'Thailand' },
  { value: 'Peru', label: 'Peru' },
  { value: 'Nepal', label: 'Nepal' },
  { value: 'Ghana', label: 'Ghana' },
]

const DURATION_OPTIONS = [
  { value: 'any', label: 'Any Duration' },
  { value: '1-2', label: '1-2 weeks' },
  { value: '3-4', label: '3-4 weeks' },
  { value: '5-8', label: '5-8 weeks' },
  { value: '9-12', label: '9-12 weeks' },
]

const SORT_OPTIONS = [
  { value: 'total_cost', label: 'Lowest Total Cost' },
  { value: 'advertised_cost', label: 'Lowest Advertised Cost' },
  { value: 'name', label: 'Program Name' },
  { value: 'duration_value', label: 'Best Weekly Value' },
]

const PRICE_RANGE_MIN = 0
const PRICE_RANGE_MAX = 3000

function getEstimatedProgramFee(opp: Opportunity, durationKey: string): number {
  const provider = opp.provider
  if (!provider) return opp.program_fee_2wk ?? 0

  switch (durationKey) {
    case '1-2':
      return opp.program_fee_2wk ?? 0
    case '3-4':
      return provider.weekly_fee_4wk ?? (opp.program_fee_2wk ?? 0) * 2
    case '5-8': {
      const weeklyRate = (provider.weekly_fee_4wk ?? 0) / 4
      return Math.round(weeklyRate * 6)
    }
    case '9-12': {
      const weeklyRate = (provider.weekly_fee_4wk ?? 0) / 4
      return Math.round(weeklyRate * 10)
    }
    default:
      return opp.program_fee_2wk ?? 0
  }
}

function getAdjustedTotalCost(opp: Opportunity, durationKey: string): { min: number; max: number } {
  const baseFee = opp.program_fee_2wk ?? 0
  const durationFee = getEstimatedProgramFee(opp, durationKey)
  const diff = durationFee - baseFee

  return {
    min: (opp.total_cost_estimate_min ?? 0) + diff,
    max: (opp.total_cost_estimate_max ?? 0) + diff,
  }
}

function getDurationLabel(durationKey: string): string {
  switch (durationKey) {
    case '1-2': return '2 weeks'
    case '3-4': return '4 weeks'
    case '5-8': return '6 weeks'
    case '9-12': return '10 weeks'
    default: return '2 weeks'
  }
}

function HomeContent() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const [selectedDestination, setSelectedDestination] = useState(searchParams.get('dest') || '')
  const [priceMin, setPriceMin] = useState(Number(searchParams.get('priceMin')) || PRICE_RANGE_MIN)
  const [priceMax, setPriceMax] = useState(Number(searchParams.get('priceMax')) || PRICE_RANGE_MAX)
  const [selectedDurations, setSelectedDurations] = useState<string[]>(() => {
    const dur = searchParams.get('durations')
    return dur ? dur.split(',') : []
  })
  const [sortBy, setSortBy] = useState(searchParams.get('sort') || 'total_cost')
  const [opportunities, setOpportunities] = useState<Opportunity[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Primary duration for card display and cost calculations
  const displayDuration = selectedDurations.length > 0 ? selectedDurations[0] : 'any'

  // Duration checkbox toggle handler
  const toggleDuration = useCallback((value: string) => {
    if (value === 'any') {
      setSelectedDurations([])
    } else {
      setSelectedDurations(prev =>
        prev.includes(value)
          ? prev.filter(d => d !== value)
          : [...prev, value]
      )
    }
  }, [])

  // Clear all filters
  const clearAllFilters = useCallback(() => {
    setPriceMin(PRICE_RANGE_MIN)
    setPriceMax(PRICE_RANGE_MAX)
    setSelectedDurations([])
  }, [])

  // Whether any filters are active
  const hasActiveFilters = priceMin > PRICE_RANGE_MIN || priceMax < PRICE_RANGE_MAX || selectedDurations.length > 0

  // Sync state to URL
  const updateURL = useCallback((dest: string, pMin: number, pMax: number, durations: string[], sort: string) => {
    const params = new URLSearchParams()
    if (dest) params.set('dest', dest)
    if (pMin > PRICE_RANGE_MIN) params.set('priceMin', String(pMin))
    if (pMax < PRICE_RANGE_MAX) params.set('priceMax', String(pMax))
    if (durations.length > 0) params.set('durations', durations.join(','))
    if (sort !== 'total_cost') params.set('sort', sort)

    const qs = params.toString()
    router.replace(qs ? `?${qs}` : '/', { scroll: false })
  }, [router])

  useEffect(() => {
    if (selectedDestination) {
      fetchOpportunities(selectedDestination)
    } else {
      setOpportunities([])
    }
  }, [selectedDestination])

  async function fetchOpportunities(country: string) {
    setLoading(true)
    setError(null)

    const { data, error: fetchError } = await supabase
      .from('opportunities')
      .select(`
        *,
        provider:providers(*)
      `)
      .eq('country', country)

    if (fetchError) {
      console.error('Error fetching opportunities:', fetchError)
      setError('Failed to load programs. Please try again.')
      setOpportunities([])
    } else {
      setOpportunities(data || [])
    }
    setLoading(false)
  }

  // Filter and sort
  const filteredOpportunities = useMemo(() => {
    let filtered = opportunities.filter(opp => {
      // Price range filter using adjusted total cost for the display duration
      const { min: costMin, max: costMax } = getAdjustedTotalCost(opp, displayDuration)
      // Program passes if its cost range overlaps with the selected price range
      if (costMax < priceMin || costMin > priceMax) return false
      return true
    })

    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'total_cost':
          return getAdjustedTotalCost(a, displayDuration).min - getAdjustedTotalCost(b, displayDuration).min
        case 'advertised_cost':
          return getEstimatedProgramFee(a, displayDuration) - getEstimatedProgramFee(b, displayDuration)
        case 'name':
          return (a.provider?.name ?? '').localeCompare(b.provider?.name ?? '')
        case 'duration_value': {
          const aRate = (a.provider?.weekly_fee_4wk ?? 0) / 4
          const bRate = (b.provider?.weekly_fee_4wk ?? 0) / 4
          return aRate - bRate
        }
        default:
          return 0
      }
    })

    return filtered
  }, [opportunities, priceMin, priceMax, displayDuration, sortBy])

  // Update URL when filters change (debounced for slider)
  useEffect(() => {
    const timeout = setTimeout(() => {
      updateURL(selectedDestination, priceMin, priceMax, selectedDurations, sortBy)
    }, 300)
    return () => clearTimeout(timeout)
  }, [selectedDestination, priceMin, priceMax, selectedDurations, sortBy, updateURL])

  // Compute slider fill position
  const sliderFillLeft = (priceMin / PRICE_RANGE_MAX) * 100
  const sliderFillWidth = ((priceMax - priceMin) / PRICE_RANGE_MAX) * 100

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-16 sm:py-20">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Compare True Costs of ESL Volunteer Programs
            </h2>
            <p className="text-lg text-gray-600 mb-10">
              Free, independent research to help you make informed decisions about
              fee-based ESL volunteer programs. We reveal the hidden costs that
              providers don&apos;t advertise upfront.
            </p>

            {/* Filter Controls */}
            <div className="bg-gray-50 rounded-xl p-6 sm:p-8 border border-gray-200 mb-6 transition-all duration-300">
              <div className="flex flex-col md:flex-row gap-6 md:gap-8">
                {/* Price Range Slider */}
                <div className="flex-1 text-left">
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Price Range
                  </label>
                  <p className="text-sm font-medium text-blue-600 mb-3">
                    ${priceMin.toLocaleString()} &ndash; ${priceMax.toLocaleString()}
                  </p>
                  <div className="relative h-2 mt-4 mb-2">
                    {/* Track background */}
                    <div className="absolute inset-0 bg-gray-200 rounded-full" />
                    {/* Active range fill */}
                    <div
                      className="absolute h-full bg-blue-600 rounded-full transition-all duration-150"
                      style={{ left: `${sliderFillLeft}%`, width: `${sliderFillWidth}%` }}
                    />
                    {/* Min thumb */}
                    <input
                      type="range"
                      min={PRICE_RANGE_MIN}
                      max={PRICE_RANGE_MAX}
                      step={50}
                      value={priceMin}
                      onChange={(e) => {
                        const val = Number(e.target.value)
                        if (val <= priceMax - 50) setPriceMin(val)
                      }}
                      className="dual-range-thumb"
                      aria-label="Minimum price"
                    />
                    {/* Max thumb */}
                    <input
                      type="range"
                      min={PRICE_RANGE_MIN}
                      max={PRICE_RANGE_MAX}
                      step={50}
                      value={priceMax}
                      onChange={(e) => {
                        const val = Number(e.target.value)
                        if (val >= priceMin + 50) setPriceMax(val)
                      }}
                      className="dual-range-thumb"
                      aria-label="Maximum price"
                    />
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>$0</span>
                    <span>$3,000</span>
                  </div>
                </div>

                {/* Duration Checkboxes */}
                <div className="flex-1 text-left">
                  <label className="block text-sm font-semibold text-gray-900 mb-3">
                    Program Duration
                  </label>
                  <div className="space-y-2">
                    {DURATION_OPTIONS.map((opt) => (
                      <label
                        key={opt.value}
                        className="flex items-center gap-2.5 cursor-pointer group"
                      >
                        <input
                          type="checkbox"
                          checked={
                            opt.value === 'any'
                              ? selectedDurations.length === 0
                              : selectedDurations.includes(opt.value)
                          }
                          onChange={() => toggleDuration(opt.value)}
                          className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600 transition-colors"
                        />
                        <span
                          className={`text-sm transition-colors duration-200 ${
                            (opt.value === 'any' && selectedDurations.length === 0) ||
                            selectedDurations.includes(opt.value)
                              ? 'text-blue-600 font-medium'
                              : 'text-gray-700 group-hover:text-gray-900'
                          }`}
                        >
                          {opt.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* Active Filter Pills */}
              {hasActiveFilters && (
                <div className="mt-4 pt-4 border-t border-gray-200 flex items-center gap-2 flex-wrap transition-all duration-300">
                  <span className="text-xs text-gray-500">Active filters:</span>
                  {(priceMin > PRICE_RANGE_MIN || priceMax < PRICE_RANGE_MAX) && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium transition-all duration-200">
                      ${priceMin.toLocaleString()} &ndash; ${priceMax.toLocaleString()}
                      <button
                        onClick={() => {
                          setPriceMin(PRICE_RANGE_MIN)
                          setPriceMax(PRICE_RANGE_MAX)
                        }}
                        className="ml-0.5 hover:text-blue-900 transition-colors"
                        aria-label="Remove price filter"
                      >
                        &times;
                      </button>
                    </span>
                  )}
                  {selectedDurations.map((d) => (
                    <span
                      key={d}
                      className="inline-flex items-center gap-1 px-2.5 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium transition-all duration-200"
                    >
                      {DURATION_OPTIONS.find((opt) => opt.value === d)?.label}
                      <button
                        onClick={() => toggleDuration(d)}
                        className="ml-0.5 hover:text-blue-900 transition-colors"
                        aria-label={`Remove ${DURATION_OPTIONS.find((opt) => opt.value === d)?.label} filter`}
                      >
                        &times;
                      </button>
                    </span>
                  ))}
                  <button
                    onClick={clearAllFilters}
                    className="text-xs text-gray-500 hover:text-gray-700 underline ml-2 transition-colors"
                  >
                    Clear all filters
                  </button>
                </div>
              )}
            </div>

            {/* Destination Selector */}
            <div className="bg-gray-50 rounded-xl p-6 sm:p-8 border border-gray-200">
              <label
                htmlFor="destination-select"
                className="block text-lg font-semibold text-gray-900 mb-4"
              >
                Where do you want to volunteer?
              </label>
              <select
                id="destination-select"
                value={selectedDestination}
                onChange={(e) => {
                  setSelectedDestination(e.target.value)
                }}
                className="w-full sm:w-96 px-4 py-3 text-base border border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-colors cursor-pointer"
              >
                <option value="">Select a destination</option>
                {DESTINATIONS.map((dest) => (
                  <option key={dest.value} value={dest.value}>
                    {dest.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        {loading ? (
          <LoadingState />
        ) : error ? (
          <ErrorState message={error} />
        ) : selectedDestination && opportunities.length > 0 ? (
          <div>
            {/* Sort Bar */}
            <div className="bg-white rounded-xl border border-gray-200 p-5 sm:p-6 mb-8">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <p className="text-gray-600">
                  {filteredOpportunities.length} of {opportunities.length} program{opportunities.length !== 1 ? 's' : ''}
                  {filteredOpportunities.length !== opportunities.length && ' matching filters'}
                </p>
                <div className="flex items-center gap-3">
                  <label htmlFor="sort-select" className="text-sm font-medium text-gray-700 whitespace-nowrap">
                    Sort by
                  </label>
                  <select
                    id="sort-select"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-3 py-2 text-sm border border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-colors cursor-pointer"
                  >
                    {SORT_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Results Grid */}
            {filteredOpportunities.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredOpportunities.map((opportunity) => (
                  <ProviderCard
                    key={opportunity.id}
                    opportunity={opportunity}
                    duration={displayDuration}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="bg-white border border-gray-200 rounded-lg p-8 max-w-md mx-auto">
                  <p className="text-gray-600 mb-2">
                    No programs match your current filters.
                  </p>
                  <button
                    onClick={clearAllFilters}
                    className="text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors"
                  >
                    Clear filters to see all programs
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : selectedDestination ? (
          <EmptyState destination={selectedDestination} />
        ) : (
          <WelcomeState />
        )}
      </section>
    </div>
  )
}

export default function HomePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50">
        <section className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 py-16 sm:py-20">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Compare True Costs of ESL Volunteer Programs
              </h2>
            </div>
          </div>
        </section>
        <LoadingState />
      </div>
    }>
      <HomeContent />
    </Suspense>
  )
}

function ProviderCard({ opportunity, duration }: { opportunity: Opportunity; duration: string }) {
  const provider = opportunity.provider

  if (!provider) return null

  const programFee = getEstimatedProgramFee(opportunity, duration)
  const { min: estimatedMin, max: estimatedMax } = getAdjustedTotalCost(opportunity, duration)
  const durationLabel = getDurationLabel(duration)

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 hover:border-blue-600 hover:shadow-lg transition-all duration-200">
      {/* Provider Info */}
      <div className="mb-5">
        <h4 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
          {provider.name}
        </h4>
        <p className="text-gray-600 flex items-center gap-1">
          <LocationIcon />
          {opportunity.city}, {opportunity.country}
        </p>
      </div>

      {/* Cost Information */}
      <div className="space-y-4 mb-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm text-gray-500 mb-1">Advertised ({durationLabel})</p>
            <p className="text-lg font-semibold text-gray-900">
              ${programFee.toLocaleString()}
            </p>
          </div>
          {provider.registration_fee != null && provider.registration_fee > 0 && (
            <div className="text-right">
              <p className="text-sm text-gray-500 mb-1">+ Registration</p>
              <p className="text-base text-gray-700">
                ${provider.registration_fee.toLocaleString()}
              </p>
            </div>
          )}
        </div>

        <div className="pt-4 border-t border-gray-100">
          <p className="text-sm text-gray-500 mb-1">Estimated Total Cost</p>
          <p className="text-2xl font-bold text-blue-600">
            ${estimatedMin.toLocaleString()} - ${estimatedMax.toLocaleString()}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Includes flights, visa, insurance & hidden fees
          </p>
        </div>
      </div>

      {/* Action Button */}
      <Link
        href={`/provider/${provider.slug}`}
        className="block w-full text-center bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 active:bg-blue-800 transition-colors"
      >
        View Details
      </Link>
    </div>
  )
}

function LocationIcon() {
  return (
    <svg
      className="w-4 h-4 text-gray-400"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
  )
}

function LoadingState() {
  return (
    <div className="text-center py-16">
      <div className="inline-flex items-center gap-3 text-gray-600">
        <svg
          className="animate-spin h-5 w-5 text-blue-600"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
        <span>Loading programs...</span>
      </div>
    </div>
  )
}

function ErrorState({ message }: { message: string }) {
  return (
    <div className="text-center py-16">
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
        <p className="text-red-700">{message}</p>
      </div>
    </div>
  )
}

function EmptyState({ destination }: { destination: string }) {
  return (
    <div className="text-center py-16">
      <div className="bg-white border border-gray-200 rounded-lg p-8 max-w-md mx-auto">
        <p className="text-gray-600 mb-2">
          No programs found for {destination}.
        </p>
        <p className="text-sm text-gray-500">
          We&apos;re actively adding more programs. Check back soon!
        </p>
      </div>
    </div>
  )
}

function WelcomeState() {
  return (
    <div className="text-center py-12">
      <div className="max-w-2xl mx-auto">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">
          How It Works
        </h3>
        <div className="grid gap-6 sm:grid-cols-3 text-left">
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold mb-4">
              1
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">
              Select Destination
            </h4>
            <p className="text-sm text-gray-600">
              Choose from popular ESL volunteer destinations worldwide.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold mb-4">
              2
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">
              Compare Programs
            </h4>
            <p className="text-sm text-gray-600">
              See advertised costs vs. true estimated costs side by side.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold mb-4">
              3
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">
              Make Informed Choices
            </h4>
            <p className="text-sm text-gray-600">
              Read details about hidden costs and what providers don&apos;t tell you.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
