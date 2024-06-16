// app/posts/[id]/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { fetchPostById } from '../../axiosInstance';

interface Post {
  id: number;
  title: string;
  body: string;
}

const PostPage = () => {
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchPost = async () => {
      if (typeof id === 'string') {
        console.log(`Fetching post with id: ${id}`);
        try {
          const post = await fetchPostById(id);
          console.log('API response:', post);
          setPost(post);
        } catch (error) {
          console.error('Error fetching the post:', error);
          setPost(null);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchPost();
  }, [id]);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!post) {
    return <div className="loading">No post found</div>;
  }

  return (
    <div className="container">
      <h1>{post.title}</h1>
      <p>{post.body}</p>
    </div>
  );
};

export default PostPage;
