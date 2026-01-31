'use client';

import { useState, useMemo } from 'react';
import { BlogPost } from '@/lib/api';
import BlogCard from './BlogCard';
import ArticleModal from './ArticleModal';
import { motion, AnimatePresence } from 'framer-motion';

interface BlogFilterProps {
  posts: BlogPost[];
}

// Helper to get category consistently (matching BlogCard logic)
const getCategory = (id: number) => {
  const categories = ['Technology', 'Development', 'Design', 'Marketing', 'Business'];
  return categories[id % categories.length];
};

export default function BlogFilter({ posts }: BlogFilterProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  // Enhance posts with categories for filtering
  const enrichedPosts = useMemo(() => {
    return posts.map((post) => ({
      ...post,
      category: getCategory(post.id),
    }));
  }, [posts]);

  // Extract unique categories for the filter buttons
  const categories = useMemo(() => {
    const uniqueCategories = Array.from(new Set(enrichedPosts.map((post) => post.category)));
    return ['All', ...uniqueCategories];
  }, [enrichedPosts]);

  // Filter logic
  const filteredPosts = useMemo(() => {
    return enrichedPosts.filter((post) => {
      const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch =
        post.title.toLowerCase().includes(searchLower) ||
        post.body.toLowerCase().includes(searchLower);

      return matchesCategory && matchesSearch;
    });
  }, [enrichedPosts, selectedCategory, searchQuery]);

  return (
    <div className="space-y-8">
      {/* Search and Filter Controls */}
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        {/* Category Buttons */}
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2 ${
              selectedCategory === category
                ? 'bg-black text-white shadow-md dark:bg-white dark:text-black'
                : 'bg-white text-gray-600 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
            }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <svg
              className="h-5 w-5 text-gray-400"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 1.891l3.3 3.299a1 1 0 11-1.414 1.415l-3.299-3.3A7 7 0 012 9z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <input
            type="text"
            aria-label="Search blog posts"
            className="block w-full rounded-full border-0 py-2.5 pl-10 pr-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:bg-gray-800 dark:text-white dark:ring-gray-700 dark:focus:ring-indigo-500 sm:text-sm sm:leading-6"
            placeholder="Search posts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between border-b border-gray-200 pb-4 dark:border-gray-800">
        <h3 className="text-base font-semibold leading-6 text-gray-900 dark:text-white">
          {filteredPosts.length} {filteredPosts.length === 1 ? 'Result' : 'Results'}
        </h3>
        {(selectedCategory !== 'All' || searchQuery) && (
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
            }}
            className="text-sm text-indigo-600 hover:text-indigo-500 dark:text-indigo-400"
          >
            Clear filters
          </button>
        )}
      </div>

      {/* Grid or No Results */}
      {filteredPosts.length > 0 ? (
        <motion.div
          layout
          className="grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 pt-6 sm:pt-10 lg:mx-0 lg:max-w-none lg:grid-cols-3"
        >
          <AnimatePresence>
            {filteredPosts.map((post, index) => (
              <motion.div
                key={post.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
              >
                <BlogCard
                  post={post}
                  index={index}
                  onClick={() => setSelectedPost(post)}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="rounded-full bg-gray-100 p-6 dark:bg-gray-800">
            <svg
              className="h-10 w-10 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <h3 className="mt-4 text-sm font-semibold text-gray-900 dark:text-white">No results found</h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            No posts match your search query or selected category.
          </p>
        </div>
      )}

      {/* Article Modal */}
      <ArticleModal
        isOpen={!!selectedPost}
        onClose={() => setSelectedPost(null)}
        post={selectedPost}
      />
    </div>
  );
}
