// app/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { fetchPosts } from './axiosInstance';
import { useAuth } from './authContext';

interface Post {
  id: number;
  title: string;
  body: string;
}

const HomePage = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const { user, logout } = useAuth();

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
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Posts</h1>
        <button onClick={logout} className="bg-red-500 text-white p-2 rounded">
          Logout
        </button>
      </div>
      <div className="mb-4">
        <p className="text-lg">Welcome, {user?.firstName} {user?.lastName}</p>
      </div>
      <ul className="space-y-4">
        {posts.map((post) => (
          <li key={post.id} className="bg-white p-4 rounded shadow">
            <Link href={`/posts/${post.id}`} legacyBehavior>
              <a className="text-2xl font-semibold text-blue-600 hover:underline">{post.title}</a>
            </Link>
            <p className="mt-2 text-gray-700">{post.body.slice(0, 150)}...</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
