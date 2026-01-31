import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn more about NextSEO and our mission to provide high-performance Next.js templates.',
};

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col font-sans dark:bg-black">
      <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md dark:bg-black/80 dark:border-white/10">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white" aria-label="NextSEO Home">
            NextSEO
          </Link>
          <nav role="navigation" aria-label="Main Navigation">
            <ul className="flex gap-6">
              <li>
                <Link href="/" className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors dark:text-gray-300 dark:hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm font-medium text-gray-900 dark:text-white" aria-current="page">
                  About
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors dark:text-gray-300 dark:hover:text-white">
                  Blog
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="flex-1 py-24 sm:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:max-w-4xl">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">About NextSEO</h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
              We are dedicated to building the fastest, most accessible, and SEO-optimized web experiences using Next.js.
            </p>
            
            <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:gap-16">
              <div>
                <h2 className="text-xl font-semibold leading-7 text-gray-900 dark:text-white">Our Mission</h2>
                <p className="mt-4 text-base leading-7 text-gray-600 dark:text-gray-300">
                  To empower developers with high-quality starter templates that follow best practices for performance, accessibility, and search engine optimization.
                </p>
              </div>
              <div>
                <h2 className="text-xl font-semibold leading-7 text-gray-900 dark:text-white">Our Stack</h2>
                <p className="mt-4 text-base leading-7 text-gray-600 dark:text-gray-300">
                  We leverage the power of Next.js App Router, React Server Components, Tailwind CSS, and TypeScript to deliver modern web applications.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-white border-t border-gray-200 dark:bg-black dark:border-white/10">
        <div className="container mx-auto px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
          <div className="mt-8 md:order-1 md:mt-0">
            <p className="text-center text-xs leading-5 text-gray-500 dark:text-gray-400">
              &copy; {new Date().getFullYear()} NextSEO, Inc. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
