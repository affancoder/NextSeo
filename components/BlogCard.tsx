'use client';

import Image from 'next/image';
import { BlogPost } from '@/lib/api';
import { motion, useReducedMotion } from 'framer-motion';

interface BlogCardProps {
  post: BlogPost;
  index: number;
  onClick?: () => void;
}

export default function BlogCard({ post, index, onClick }: BlogCardProps) {
  const shouldReduceMotion = useReducedMotion();

  // Deterministic mock data based on ID
  const date = new Date(2023, 0, post.id).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
  
  const categories = ['Technology', 'Development', 'Design', 'Marketing', 'Business'];
  const category = categories[post.id % categories.length];
  
  // Using picsum for consistent placeholder images
  const imageUrl = `https://picsum.photos/seed/${post.id}/800/600`;

  const animateProps = shouldReduceMotion
    ? { opacity: 1, y: 0 }
    : { opacity: 1, y: 0 };
    
  const initialProps = shouldReduceMotion
    ? { opacity: 1, y: 0 }
    : { opacity: 0, y: 20 };

  const transitionProps = shouldReduceMotion
    ? { duration: 0 }
    : { duration: 0.5, delay: index * 0.1 };

  return (
    <motion.article
      initial={initialProps}
      whileInView={animateProps}
      viewport={{ once: true }}
      transition={transitionProps}
      className="group relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm transition-all hover:shadow-xl dark:bg-gray-800"
    >
      <div className="relative aspect-video w-full overflow-hidden bg-gray-200">
        <Image
          src={imageUrl}
          alt={post.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute top-4 left-4 z-10">
          <span className="inline-flex items-center rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-gray-800 backdrop-blur-sm dark:bg-black/80 dark:text-white">
            {category}
          </span>
        </div>
      </div>
      
      <div className="flex flex-1 flex-col justify-between p-6">
        <div className="flex-1">
          <div className="flex items-center gap-x-4 text-xs">
            <time dateTime={date} className="text-gray-500 dark:text-gray-400">
              {date}
            </time>
          </div>
          <div className="group relative">
            <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-indigo-600 dark:text-white dark:group-hover:text-indigo-400">
              <button 
                onClick={onClick} 
                className="text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2 rounded-sm"
              >
                <span className="absolute inset-0" />
                {post.title}
              </button>
            </h3>
            <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600 dark:text-gray-300">
              {post.body}
            </p>
          </div>
        </div>
        
        <div className="relative mt-8 flex items-center gap-x-4">
           <div className="relative h-10 w-10 overflow-hidden rounded-full bg-gray-100">
            <Image 
                src={`https://i.pravatar.cc/150?u=${post.userId}`}
                alt={`Avatar for user ${post.userId}`}
                fill
                className="object-cover"
            />
           </div>
          <div className="text-sm leading-6">
            <p className="font-semibold text-gray-900 dark:text-white">
              <span className="absolute inset-0" />
              Author {post.userId}
            </p>
            <p className="text-gray-600 dark:text-gray-400">Content Creator</p>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
