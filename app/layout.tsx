import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ESL Volunteer Finder | Compare True Costs",
  description: "Compare true costs of ESL volunteer programs worldwide. Free, independent research revealing hidden fees providers don't advertise.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50`}>
        <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 py-4 sm:py-5">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <Link href="/" className="group">
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                  ESL Volunteer Finder
                </h1>
                <p className="text-xs sm:text-sm text-gray-600">
                  Independent Guide to Fee-Based Volunteer Programs
                </p>
              </Link>
              <nav className="flex items-center gap-4 sm:gap-6">
                <Link
                  href="/about"
                  className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors"
                >
                  About
                </Link>
              </nav>
            </div>
          </div>
        </header>

        <main>
          {children}
        </main>

        <footer className="bg-white border-t border-gray-200 mt-auto">
          <div className="max-w-7xl mx-auto px-4 py-8 sm:py-10">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-600">
              <p className="text-center sm:text-left">
                Independent resource. Not affiliated with any volunteer organization.
              </p>
              <div className="flex items-center gap-6">
                <Link href="/about" className="hover:text-blue-600 transition-colors">
                  About
                </Link>
                <a
                  href="mailto:feedback@eslvolunteerfinder.org"
                  className="hover:text-blue-600 transition-colors"
                >
                  Contact
                </a>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-6 text-center">
              Last Updated: January 2026
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
