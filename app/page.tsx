// app/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { fetchPosts } from './axiosInstance';

interface Post {
  id: number;
  title: string;
  body: string;
}

const HomePage = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getPosts = async () => {
      const postsData = await fetchPosts();
      setPosts(postsData);
      setLoading(false);
    };

    getPosts();
  }, []);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="container">
      <h1>Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <Link href={`/posts/${post.id}`} legacyBehavior>
              <a className="text-2xl font-semibold text-blue-600 hover:underline">{post.title}</a>
            </Link>
            <p className="mt-4 text-gray-700">{post.body.slice(0, 150)}...</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
