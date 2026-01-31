import { BlogCardSkeleton } from '@/components/Skeleton';
import Skeleton from '@/components/Skeleton';

export default function Loading() {
  return (
    <div className="flex min-h-screen flex-col font-sans dark:bg-black">
      {/* Header Skeleton */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md dark:bg-black/80 dark:border-white/10">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          <Skeleton className="h-8 w-32" />
          <div className="flex gap-6">
            <Skeleton className="h-4 w-12" />
            <Skeleton className="h-4 w-12" />
            <Skeleton className="h-4 w-12" />
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Skeleton */}
        <div className="relative flex min-h-[90vh] items-center justify-center bg-linear-to-br from-indigo-50 via-white to-cyan-100 dark:from-gray-900 dark:via-gray-950 dark:to-indigo-950">
          <div className="container mx-auto px-4 text-center sm:px-6 lg:px-8">
            <Skeleton className="mx-auto mb-6 h-16 max-w-3xl" />
            <Skeleton className="mx-auto mb-10 h-6 max-w-2xl" />
            <div className="flex justify-center gap-6">
              <Skeleton className="h-12 w-32 rounded-full" />
              <Skeleton className="h-12 w-32" />
            </div>
          </div>
        </div>

        {/* Blog Grid Skeleton */}
        <section className="bg-gray-50 py-24 sm:py-32 dark:bg-black">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto mb-16 max-w-2xl text-center">
              <Skeleton className="mx-auto mb-4 h-10 w-64" />
              <Skeleton className="mx-auto h-6 w-96" />
            </div>

            {/* Filter Skeleton */}
            <div className="mb-8 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="flex gap-2">
                <Skeleton className="h-9 w-16 rounded-full" />
                <Skeleton className="h-9 w-24 rounded-full" />
                <Skeleton className="h-9 w-20 rounded-full" />
              </div>
              <Skeleton className="h-10 w-full rounded-full md:w-72" />
            </div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {[...Array(6)].map((_, i) => (
                <BlogCardSkeleton key={i} />
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
