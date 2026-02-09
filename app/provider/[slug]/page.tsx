'use client'

import { useState, useEffect, Suspense } from 'react'
import { useParams, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { Provider, Opportunity } from '@/types/database.types'

export default function ProviderDetailPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 py-16 text-center">
          <div className="inline-flex items-center gap-3 text-gray-600">
            <svg className="animate-spin h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            <span>Loading provider details...</span>
          </div>
        </div>
      </div>
    }>
      <ProviderDetailContent />
    </Suspense>
  )
}

function ProviderDetailContent() {
  const params = useParams()
  const searchParams = useSearchParams()
  const slug = params.slug as string
  const selectedCountry = searchParams.get('country')

  const [provider, setProvider] = useState<Provider | null>(null)
  const [opportunities, setOpportunities] = useState<Opportunity[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (slug) fetchProvider(slug)
  }, [slug])

  async function fetchProvider(providerSlug: string) {
    setLoading(true)
    setError(null)

    const { data: providerData, error: providerError } = await supabase
      .from('providers')
      .select('*')
      .eq('slug', providerSlug)
      .single()

    if (providerError || !providerData) {
      setError('Provider not found.')
      setLoading(false)
      return
    }

    setProvider(providerData)

    const { data: oppData, error: oppError } = await supabase
      .from('opportunities')
      .select('*')
      .eq('provider_id', providerData.id)
      .order('total_cost_estimate_min', { ascending: true })

    if (oppError) {
      setError('Failed to load programs.')
    } else {
      setOpportunities(oppData || [])
    }

    setLoading(false)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 py-16 text-center">
          <div className="inline-flex items-center gap-3 text-gray-600">
            <svg className="animate-spin h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            <span>Loading provider details...</span>
          </div>
        </div>
      </div>
    )
  }

  if (error || !provider) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 py-16">
          <Link href="/" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium mb-8 transition-colors">
            <ArrowLeftIcon /> Back to Search
          </Link>
          <div className="bg-red-50 border border-red-200 rounded-lg p-8 text-center">
            <p className="text-red-700 text-lg">{error || 'Provider not found.'}</p>
            <Link href="/" className="inline-block mt-4 text-blue-600 hover:text-blue-700 font-medium">
              Return to homepage
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const costBreakdown = getCostBreakdown(provider)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <Link href="/" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors">
            <ArrowLeftIcon /> Back to Search
          </Link>
        </div>
      </div>

      {/* Provider Overview */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 py-10 sm:py-14">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6">
            <div className="flex-1">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
                {provider.name}
              </h2>
              {selectedCountry && (
                <p className="text-lg text-blue-600 font-medium mb-3 flex items-center gap-2">
                  <LocationIcon />
                  {selectedCountry}
                </p>
              )}
              <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-6">
                {provider.year_established && (
                  <span className="flex items-center gap-1.5">
                    <CalendarIcon />
                    Est. {provider.year_established}
                  </span>
                )}
                <span className="flex items-center gap-1.5">
                  <GlobeIcon />
                  {opportunities.length} destination{opportunities.length !== 1 ? 's' : ''}
                </span>
              </div>
              <a
                href={provider.website_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors"
              >
                Visit Website <ExternalLinkIcon />
              </a>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4 sm:gap-6">
              <div className="bg-gray-50 rounded-lg p-4 text-center border border-gray-200">
                <p className="text-sm text-gray-500 mb-1">Registration</p>
                <p className="text-xl font-bold text-gray-900">
                  ${provider.registration_fee?.toLocaleString() ?? 'N/A'}
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 text-center border border-gray-200">
                <p className="text-sm text-gray-500 mb-1">2-Week Fee</p>
                <p className="text-xl font-bold text-gray-900">
                  ${provider.weekly_fee_2wk?.toLocaleString() ?? 'N/A'}
                </p>
              </div>
              <div className="bg-blue-50 rounded-lg p-4 text-center border border-blue-200 col-span-2">
                <p className="text-sm text-blue-600 mb-1">Hidden Costs Estimate</p>
                <p className="text-xl font-bold text-blue-700">
                  ${provider.hidden_costs_min?.toLocaleString() ?? '?'} - ${provider.hidden_costs_max?.toLocaleString() ?? '?'}
                </p>
              </div>
            </div>
          </div>

          {/* Included / Not Included */}
          <div className="grid sm:grid-cols-2 gap-6 mt-10">
            <div className="bg-green-50 rounded-lg p-6 border border-green-200">
              <h3 className="font-semibold text-green-800 mb-4 flex items-center gap-2">
                <CheckIcon /> What's Included
              </h3>
              <ul className="space-y-2">
                {provider.what_included?.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-green-900">
                    <span className="text-green-600 mt-0.5 shrink-0">+</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-red-50 rounded-lg p-6 border border-red-200">
              <h3 className="font-semibold text-red-800 mb-4 flex items-center gap-2">
                <XIcon /> Not Included
              </h3>
              <ul className="space-y-2">
                {provider.what_not_included?.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-red-900">
                    <span className="text-red-600 mt-0.5 shrink-0">-</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Programs Table */}
      <section className="max-w-5xl mx-auto px-4 py-10">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">
          Programs & Costs by Destination
        </h3>
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left px-6 py-4 font-semibold text-gray-900">Destination</th>
                  <th className="text-right px-6 py-4 font-semibold text-gray-900">1 Week</th>
                  <th className="text-right px-6 py-4 font-semibold text-gray-900">2 Weeks</th>
                  <th className="text-right px-6 py-4 font-semibold text-gray-900">Est. Total (2 wk)</th>
                  <th className="text-right px-6 py-4 font-semibold text-gray-900"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {opportunities.map((opp) => (
                  <tr key={opp.id} className={`hover:bg-gray-50 transition-colors ${selectedCountry === opp.country ? 'bg-blue-50 ring-1 ring-inset ring-blue-200' : ''}`}>
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">{opp.country}</div>
                      {opp.city && <div className="text-gray-500 text-xs">{opp.city}</div>}
                    </td>
                    <td className="px-6 py-4 text-right text-gray-700">
                      ${opp.program_fee_1wk?.toLocaleString() ?? 'N/A'}
                    </td>
                    <td className="px-6 py-4 text-right text-gray-700">
                      ${opp.program_fee_2wk?.toLocaleString() ?? 'N/A'}
                    </td>
                    <td className="px-6 py-4 text-right font-semibold text-blue-600">
                      ${opp.total_cost_estimate_min?.toLocaleString() ?? '?'} - ${opp.total_cost_estimate_max?.toLocaleString() ?? '?'}
                    </td>
                    <td className="px-6 py-4 text-right">
                      {opp.provider_url && (
                        <a
                          href={opp.provider_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-700 font-medium text-xs transition-colors"
                        >
                          Provider Page
                        </a>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="bg-gray-50 border-t border-gray-200 px-6 py-3">
            <p className="text-xs text-gray-500">
              Estimated totals include registration fee (${provider.registration_fee?.toLocaleString()}), program fee, flights, visa, insurance, and hidden costs.
            </p>
          </div>
        </div>
      </section>

      {/* Cost Breakdown Chart */}
      <section className="max-w-5xl mx-auto px-4 pb-10">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">
          Cost Breakdown (2-Week Program)
        </h3>
        <div className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8">
          <div className="space-y-4">
            {costBreakdown.map((item) => (
              <div key={item.label}>
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-sm font-medium text-gray-700">{item.label}</span>
                  <span className="text-sm font-semibold text-gray-900">{item.display}</span>
                </div>
                <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${item.color}`}
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 pt-6 border-t border-gray-200 flex justify-between items-center">
            <span className="text-base font-semibold text-gray-900">Estimated Total</span>
            <span className="text-2xl font-bold text-blue-600">
              ${costBreakdown.reduce((sum, item) => sum + item.value, 0).toLocaleString()}
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-3">
            Cost breakdown uses midpoint estimates. Actual costs vary by destination, travel dates, and personal spending.
          </p>
        </div>
      </section>

      {/* What They Don't Tell You */}
      {provider.what_they_dont_tell_you && provider.what_they_dont_tell_you.length > 0 && (
        <section className="max-w-5xl mx-auto px-4 pb-14">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">
            What They Don't Tell You
          </h3>
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 sm:p-8">
            <p className="text-sm text-amber-800 mb-6">
              Based on volunteer reviews and independent research. These are common experiences that providers rarely mention upfront.
            </p>
            <ul className="space-y-4">
              {provider.what_they_dont_tell_you.map((insight, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-amber-200 text-amber-800 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <p className="text-sm text-amber-900 leading-relaxed">{insight}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </div>
  )
}

function getCostBreakdown(provider: Provider) {
  const registration = provider.registration_fee ?? 0
  const programFee = provider.weekly_fee_2wk ?? 0
  const hiddenMin = provider.hidden_costs_min ?? 0
  const hiddenMax = provider.hidden_costs_max ?? 0
  const hiddenMid = Math.round((hiddenMin + hiddenMax) / 2)

  // Estimate flight/visa/insurance components from hidden costs
  const flights = Math.round(hiddenMid * 0.55)
  const visaInsurance = Math.round(hiddenMid * 0.25)
  const otherCosts = hiddenMid - flights - visaInsurance

  const items = [
    { label: 'Registration Fee', value: registration, color: 'bg-blue-600', display: `$${registration.toLocaleString()}` },
    { label: 'Program Fee (2 weeks)', value: programFee, color: 'bg-blue-400', display: `$${programFee.toLocaleString()}` },
    { label: 'Est. Flights', value: flights, color: 'bg-orange-400', display: `~$${flights.toLocaleString()}` },
    { label: 'Est. Visa & Insurance', value: visaInsurance, color: 'bg-amber-400', display: `~$${visaInsurance.toLocaleString()}` },
    { label: 'Est. Other Hidden Costs', value: otherCosts, color: 'bg-red-400', display: `~$${otherCosts.toLocaleString()}` },
  ]

  const max = Math.max(...items.map((i) => i.value))

  return items.map((item) => ({
    ...item,
    percentage: max > 0 ? Math.round((item.value / max) * 100) : 0,
  }))
}

function ArrowLeftIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
    </svg>
  )
}

function LocationIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  )
}

function CalendarIcon() {
  return (
    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  )
}

function GlobeIcon() {
  return (
    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
    </svg>
  )
}

function ExternalLinkIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  )
}

function XIcon() {
  return (
    <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  )
}
