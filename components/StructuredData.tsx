import Script from 'next/script';
import { BlogPost } from '@/lib/api';

interface StructuredDataProps {
  posts: BlogPost[];
}

export default function StructuredData({ posts }: StructuredDataProps) {
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'NextSEO',
    url: 'http://localhost:3000',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'http://localhost:3000/?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <>
      <Script
        id="website-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      {posts.map((post) => {
        const articleSchema = {
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: post.title,
          image: [
            `https://placehold.co/1200x630/png?text=${encodeURIComponent(post.title.substring(0, 20))}`,
          ],
          datePublished: new Date().toISOString(), // In a real app, this would come from the API
          dateModified: new Date().toISOString(),
          author: [
            {
              '@type': 'Person',
              name: `User ${post.userId}`,
              url: `http://localhost:3000/author/${post.userId}`,
            },
          ],
          publisher: {
            '@type': 'Organization',
            name: 'NextSEO',
            logo: {
              '@type': 'ImageObject',
              url: 'http://localhost:3000/logo.png',
            },
          },
          description: post.body.substring(0, 160),
        };

        return (
          <Script
            key={post.id}
            id={`article-schema-${post.id}`}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
          />
        );
      })}
    </>
  );
}
