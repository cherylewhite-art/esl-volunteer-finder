import { supabase } from '@/lib/supabase';
import { Provider, Opportunity } from '@/types/database.types';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default async function ProviderPage({ params }: { params: { slug: string } }) {
  const { data: provider, error: providerError } = await supabase
    .from('providers')
    .select('*')
    .eq('slug', params.slug)
    .single();

  if (providerError || !provider) {
    notFound();
  }

  const { data: opportunities } = await supabase
    .from('opportunities')
    .select('*')
    .eq('provider_id', provider.id);

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <Link href="/" className="text-accent hover:underline mb-8 inline-block">
        ← Back to search
      </Link>

      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">{provider.name}</h1>
        
          href={provider.website_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent hover:underline"
        >
          Visit {provider.name} Website →
        </a>
        <p className="text-gray-600 mt-2">Established {provider.year_established}</p>
      </div>

      <section className="bg-white rounded-lg border border-gray-200 p-8 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Cost Breakdown</h2>
        
        <div className="space-y-4 mb-6">
          <div className="flex justify-between py-3 border-b">
            <span className="font-semibold">Registration Fee</span>
            <span className="text-xl font-bold">${provider.registration_fee?.toLocaleString()}</span>
          </div>
          <div className="flex justify-between py-3 border-b">
            <span className="font-semibold">1 Week Program</span>
            <span className="text-xl font-bold">${provider.weekly_fee_1wk?.toLocaleString()}</span>
          </div>
          <div className="flex justify-between py-3 border-b">
            <span className="font-semibold">2 Week Program</span>
            <span className="text-xl font-bold">${provider.weekly_fee_2wk?.toLocaleString()}</span>
          </div>
          <div className="flex justify-between py-3">
            <span className="font-semibold">4 Week Program</span>
            <span className="text-xl font-bold">${provider.weekly_fee_4wk?.toLocaleString()}</span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mt-8">
          <div>
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
              <span className="text-green-600 mr-2">✓</span>
              What's Included
            </h3>
            <ul className="space-y-2 text-gray-700">
              {provider.what_included?.map((item, i) => (
                <li key={i} className="pl-6">• {item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
              <span className="text-red-600 mr-2">✗</span>
              What's NOT Included
            </h3>
            <ul className="space-y-2 text-gray-700">
              {provider.what_not_included?.map((item, i) => (
                <li key={i} className="pl-6">• {item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-white rounded-lg border border-gray-200 p-8 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Hidden Costs Estimate</h2>
        
        <div className="bg-gray-50 rounded-lg p-6">
          <div className="space-y-3 mb-6">
            <div className="flex justify-between">
              <span className="text-gray-700">Visa fees</span>
              <span className="font-semibold">$50 - $200</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-700">Vaccinations</span>
              <span className="font-semibold">$200 - $500</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-700">Travel insurance</span>
              <span className="font-semibold">$150 - $300</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-700">Background check</span>
              <span className="font-semibold">$50 - $80</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-700">Daily expenses & activities</span>
              <span className="font-semibold">$150 - $400</span>
            </div>
          </div>
          <div className="pt-4 border-t border-gray-300">
            <div className="flex justify-between items-center">
              <span className="text-lg font-bold text-gray-900">Estimated Total Hidden Costs:</span>
              <span className="text-2xl font-bold text-accent">
                ${provider.hidden_costs_min?.toLocaleString()} - ${provider.hidden_costs_max?.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        <p className="text-sm text-gray-600 mt-4">
          Note: Actual costs vary by destination and individual circumstances. Always verify with the provider.
        </p>
      </section>

      <section className="bg-yellow-50 rounded-lg border-2 border-yellow-200 p-8 mb-8">
        <div className="flex items-start mb-4">
          <span className="text-2xl mr-3">⚠️</span>
          <h2 className="text-2xl font-bold text-gray-900">What They Don't Tell You</h2>
        </div>
        <p className="text-sm text-gray-600 mb-4">
          Based on reviews and reported volunteer experiences
        </p>
        <ul className="space-y-3">
          {provider.what_they_dont_tell_you?.map((item, i) => (
            <li key={i} className="flex items-start">
              <span className="text-yellow-600 mr-3 mt-1 font-bold">•</span>
              <span className="text-gray-800">{item}</span>
            </li>
          ))}
        </ul>
      </section>

      {opportunities && opportunities.length > 0 && (
        <section className="bg-white rounded-lg border border-gray-200 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Programs Available</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Country</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">City</th>
                  <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">1 Week</th>
                  <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">2 Weeks</th>
                  <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">Est. Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {opportunities.map(opp => (
                  <tr key={opp.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-gray-900">{opp.country}</td>
                    <td className="px-6 py-4 text-gray-700">{opp.city}</td>
                    <td className="px-6 py-4 text-right font-semibold">${opp.program_fee_1wk?.toLocaleString()}</td>
                    <td className="px-6 py-4 text-right font-semibold">${opp.program_fee_2wk?.toLocaleString()}</td>
                    <td className="px-6 py-4 text-right font-bold text-accent">
                      ${opp.total_cost_estimate_min?.toLocaleString()} - ${opp.total_cost_estimate_max?.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      <div className="mt-8 flex gap-4 justify-center">
        
          href={provider.website_url}
          target="_blank"
          rel="noopener noreferrer"
          className="px-8 py-3 bg-accent text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          Visit {provider.name} Website
        </a>
        
          href="https://forms.gle/your-google-form-link"
          target="_blank"
          rel="noopener noreferrer"
          className="px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:border-accent hover:text-accent transition-colors"
        >
          Share Your Experience
        </a>
      </div>
    </div>
  );
}
