import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-8 font-medium"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Home
        </Link>

        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8">
          About ESL Volunteer Finder
        </h1>

        <div className="space-y-6">
          <section className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8">
            <p className="text-lg text-gray-700 leading-relaxed">
              This is an independent, free resource to help you make informed decisions
              about fee-based ESL volunteer programs. We research and compare true total
              costs so you know what you're really paying.
            </p>
          </section>

          <section className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
              What We Do
            </h2>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold flex-shrink-0">•</span>
                <span>Compare true total costs (not just advertised program fees)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold flex-shrink-0">•</span>
                <span>Reveal hidden costs providers don't prominently advertise</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold flex-shrink-0">•</span>
                <span>Provide honest information based on reviews and research</span>
              </li>
            </ul>
          </section>

          <section className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
              What We Don't Do
            </h2>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-3">
                <span className="text-red-600 font-bold flex-shrink-0">✗</span>
                <span>We are NOT affiliated with any volunteer organization</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-600 font-bold flex-shrink-0">✗</span>
                <span>We do NOT receive commissions or affiliate payments</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-600 font-bold flex-shrink-0">✗</span>
                <span>We do NOT accept payment from providers for listings</span>
              </li>
            </ul>
          </section>

          <section className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
              Data Sources
            </h2>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-3">
                <span className="text-gray-400">•</span>
                <span>Provider websites (January 2026)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-gray-400">•</span>
                <span>Go Overseas reviews</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-gray-400">•</span>
                <span>Go Abroad reviews</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-gray-400">•</span>
                <span>Volunteer Forever research</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-gray-400">•</span>
                <span>Industry cost reports</span>
              </li>
            </ul>
            <p className="text-sm text-gray-500 mt-4 pt-4 border-t border-gray-100">
              <strong>Last Updated:</strong> January 2026
            </p>
          </section>

          <section className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
              Contact
            </h2>
            <p className="text-gray-700 mb-4">
              For corrections, feedback, or questions:
            </p>
            <a
              href="mailto:feedback@eslvolunteerfinder.org"
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              feedback@eslvolunteerfinder.org
            </a>
          </section>

          <section className="bg-gray-100 rounded-xl border border-gray-200 p-6 sm:p-8">
            <p className="text-sm text-gray-600 italic leading-relaxed">
              This site is maintained by independent researchers committed to transparency
              in the volunteer travel industry. We believe people deserve honest, complete
              information before investing time and money in volunteer programs abroad.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
