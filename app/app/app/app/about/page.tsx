export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">About ESL Volunteer Finder</h1>

      <div className="prose prose-lg max-w-none space-y-8">
        <section className="bg-white rounded-lg border border-gray-200 p-8">
          <p className="text-lg text-gray-700 leading-relaxed">
            This is an independent, free resource to help you make informed decisions about fee-based ESL volunteer programs.
          </p>
        </section>

        <section className="bg-white rounded-lg border border-gray-200 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">What We Do</h2>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start">
              <span className="text-accent mr-3 font-bold">•</span>
              <span>Compare true total costs (not just program fees)</span>
            </li>
            <li className="flex items-start">
              <span className="text-accent mr-3 font-bold">•</span>
              <span>Reveal hidden costs providers don't prominently advertise</span>
            </li>
            <li className="flex items-start">
              <span className="text-accent mr-3 font-bold">•</span>
              <span>Provide honest information based on reviews and research</span>
            </li>
          </ul>
        </section>

        <section className="bg-white rounded-lg border border-gray-200 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">What We Don't Do</h2>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start">
              <span className="text-red-600 mr-3 font-bold">✗</span>
              <span>We are NOT affiliated with any volunteer organization</span>
            </li>
            <li className="flex items-start">
              <span className="text-red-600 mr-3 font-bold">✗</span>
              <span>We do NOT receive commissions or affiliate payments</span>
            </li>
            <li className="flex items-start">
              <span className="text-red-600 mr-3 font-bold">✗</span>
              <span>We do NOT accept payment from providers for listings</span>
            </li>
          </ul>
        </section>

        <section className="bg-white rounded-lg border border-gray-200 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Sources</h2>
          <ul className="space-y-2 text-gray-700">
            <li>• Provider websites (January 2026)</li>
            <li>• Go Overseas reviews</li>
            <li>• Go Abroad reviews</li>
            <li>• Volunteer Forever research</li>
            <li>• Industry cost reports</li>
          </ul>
          <p className="text-sm text-gray-600 mt-4">
            <strong>Last Updated:</strong> January 2026
          </p>
        </section>

        <section className="bg-white rounded-lg border border-gray-200 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact</h2>
          <p className="text-gray-700">
            For corrections, feedback, or questions:
          </p>
          <p className="mt-2">
            <a href="mailto:feedback@eslvolunteerfinder.org" className="text-accent hover:underline font-semibold">
              feedback@eslvolunteerfinder.org
            </a>
          </p>
        </section>

        <section className="bg-gray-50 rounded-lg border border-gray-200 p-8">
          <p className="text-sm text-gray-600 italic">
            This site is maintained by independent researchers committed to transparency in the volunteer travel industry. We believe people deserve honest, complete information before investing time and money in volunteer programs abroad.
          </p>
        </section>
      </div>
    </div>
  );
}
