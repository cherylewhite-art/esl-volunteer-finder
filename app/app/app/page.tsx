'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Opportunity } from '@/types/database.types';
import Link from 'next/link';

export default function Home() {
  const [selectedCountry, setSelectedCountry] = useState<string>('');
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [filteredOpportunities, setFilteredOpportunities] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState(true);

  const countries = ['Costa Rica', 'Thailand', 'Peru', 'Nepal', 'Ghana'];

  useEffect(() => {
    fetchOpportunities();
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      const filtered = opportunities.filter(opp => opp.country === selectedCountry);
      setFilteredOpportunities(filtered);
    } else {
      setFilteredOpportunities([]);
    }
  }, [selectedCountry, opportunities]);

  async function fetchOpportunities() {
    const { data, error } = await supabase
      .from('opportunities')
      .select(`
        *,
        provider:providers(*)
      `);

    if (error) {
      console.error('Error fetching opportunities:', error);
    } else if (data) {
      setOpportunities(data);
    }
    setLoading(false);
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Compare True Costs of ESL Volunteer Programs
        </h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
          This is a free, independent resource to help you make informed decisions about fee-based ESL volunteer programs. We are not affiliated with any volunteer organization.
        </p>
      </div>

      {/* Search Section */}
      <div className="bg-white rounded-lg border border-gray-200 p-8 mb-12">
        <label htmlFor="country-select" className="block text-lg font-semibold text-gray-900 mb-4">
          Where do you want to volunteer?
        </label>
        <select
          id="country-select"
          value={selectedCountry}
          onChange={(e) => setSelectedCountry(e.target.value)}
          className="w-full md:w-96 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent text-gray-900"
        >
          <option value="">Select destination</option>
          {countries.map(country => (
            <option key={country} value={country}>{country}</option>
          ))}
        </select>
      </div>

      {/* Results Section */}
      {loading ? (
        <div className="text-center py-12">
          <p className="text-gray-600">Loading opportunities...</p>
        </div>
      ) : filteredOpportunities.length > 0 ? (
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-6">
            Programs in {selectedCountry} ({filteredOpportunities.length})
          </h3>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredOpportunities.map(opp => (
              <OpportunityCard key={opp.id} opportunity={opp} />
            ))}
          </div>
        </div>
      ) : selectedCountry ? (
        <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
          <p className="text-gray-600">No programs found for {selectedCountry}.</p>
          <p className="text-sm text-gray-500 mt-2">Data is being populated. Check back soon!</p>
        </div>
      ) : null}
    </div>
  );
}

function OpportunityCard({ opportunity }: { opportunity: Opportunity }) {
  const provider = opportunity.provider;
  
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 hover:border-accent transition-colors">
      <div className="mb-4">
        <h4 className="text-xl font-semibold text-gray-900 mb-2">
          {provider?.name}
        </h4>
        <p className="text-gray-600">
          {opportunity.country} • {opportunity.city}
        </p>
      </div>

      <div className="space-y-2 mb-6">
        <div>
          <p className="text-sm text-gray-600">Advertised (2 weeks):</p>
          <p className="text-lg font-semibold text-gray-900">
            ${opportunity.program_fee_2wk?.toLocaleString()}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Estimated Total:</p>
          <p className="text-xl font-bold text-accent">
            ${opportunity.total_cost_estimate_min?.toLocaleString()} - ${opportunity.total_cost_estimate_max?.toLocaleString()}
          </p>
        </div>
      </div>

      <Link
        href={`/provider/${provider?.slug}`}
        className="block w-full text-center bg-accent text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
      >
        View Details →
      </Link>
    </div>
  );
}
