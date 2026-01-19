import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ESL Volunteer Finder",
  description: "Compare true costs of ESL volunteer programs worldwide",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <header className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <h1 className="text-2xl font-bold text-gray-900">
              ESL Volunteer Finder
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              An Independent Guide to Fee-Based ESL Volunteer Opportunities Worldwide
            </p>
          </div>
        </header>
        
        <main className="min-h-screen">
          {children}
        </main>
        
        <footer className="bg-white border-t border-gray-200 mt-16">
          <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-600">
              <p>
                Independent resource. Not affiliated with any volunteer organization.
              </p>
              <div className="flex gap-6">
                <a href="/about" className="hover:text-accent">About</a>
                <a href="mailto:feedback@eslvolunteerfinder.org" className="hover:text-accent">
                  Contact
                </a>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-4 text-center">
              Last Updated: January 2026
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
