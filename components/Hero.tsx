'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import dynamic from 'next/dynamic';

const ThreeScene = dynamic(() => import('./ThreeScene'), {
  ssr: false,
  loading: () => <div className="absolute inset-0 -z-10 h-full w-full bg-indigo-50/30 dark:bg-gray-900/30" />,
});

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const yText = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacityText = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Disable parallax if reduced motion is preferred
  const y = prefersReducedMotion ? 0 : yText;
  const opacity = prefersReducedMotion ? 1 : opacityText;

  return (
    <section
      ref={containerRef}
      className="relative flex min-h-[90vh] items-center justify-center overflow-hidden bg-linear-to-br from-indigo-50 via-white to-cyan-100 dark:from-gray-900 dark:via-gray-950 dark:to-indigo-950"
    >
      <ThreeScene />
      
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          style={{ y, opacity }}
          className="mx-auto max-w-4xl text-center"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-7xl"
          >
            Modern SEO for <br />
            <span className="bg-linear-to-r from-indigo-600 to-cyan-500 bg-clip-text text-transparent">
              Next.js Applications
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600 dark:text-gray-300"
          >
            A high-performance starter template built with Next.js App Router,
            TypeScript, and Tailwind CSS. Optimized for search engines, speed, and
            user experience.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
            className="mt-10 flex items-center justify-center gap-x-6"
          >
            <Link
              href="#blog"
              className="rounded-full bg-indigo-600 px-8 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-all hover:scale-105"
            >
              Get Started
            </Link>
            <Link
              href="https://github.com"
              className="text-sm font-semibold leading-6 text-gray-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              View on GitHub <span aria-hidden="true">→</span>
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-[30%] -left-[10%] h-[70%] w-[70%] rounded-full bg-purple-200/30 blur-3xl dark:bg-purple-900/20" />
        <div className="absolute top-[20%] -right-[10%] h-[60%] w-[60%] rounded-full bg-cyan-200/30 blur-3xl dark:bg-cyan-900/20" />
      </div>
    </section>
  );
}
