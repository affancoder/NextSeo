export interface BlogPost {
  userId: number;
  id: number;
  title: string;
  body: string;
  content_html?: string; // Optional field for rich content
}

export type ApiResponse<T> = {
  data: T | null;
  error: string | null;
};

const BASE_URL = 'https://jsonplaceholder.typicode.com';

/**
 * Fetches the latest 10 blog posts.
 * @returns {Promise<ApiResponse<BlogPost[]>>} A promise resolving to the API response.
 */
export async function fetchPosts(): Promise<ApiResponse<BlogPost[]>> {
  try {
    const response = await fetch(`${BASE_URL}/posts?_limit=10`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      // Cache configuration can be adjusted based on needs (e.g., 'no-store' for dynamic data)
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const rawData = (await response.json()) as BlogPost[];
    
    // Enrich data with mock HTML content since JSONPlaceholder only provides plain text
    const data = rawData.map(post => ({
      ...post,
      content_html: `
        <p class="lead">${post.body}</p>
        <h2>Introduction</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
        <blockquote>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</blockquote>
        <h2>Key Concepts</h2>
        <p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.</p>
        <ul>
          <li>Comprehensive SEO strategies</li>
          <li>Performance optimization techniques</li>
          <li>Accessibility best practices</li>
        </ul>
        <h2>Conclusion</h2>
        <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.</p>
      `
    }));

    return {
      data,
      error: null,
    };
  } catch (error) {
    console.error('Failed to fetch posts:', error);
    return {
      data: null,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}
