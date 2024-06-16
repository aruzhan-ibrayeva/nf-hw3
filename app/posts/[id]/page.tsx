// app/posts/[id]/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { fetchPostById } from '../../axiosInstance';
import './postDetail.css';

interface Post {
    id: number;
    title: string;
    body: string;
    userId: number;
    tags: string[];
    reactions: {
        likes: number;
        dislikes: number;
    };
    views: number;
}

const PostDetailPage = () => {
    const { id } = useParams();
    const [post, setPost] = useState<Post | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getPost = async () => {
            if (id) {
                const postData = await fetchPostById(id as string);
                setPost(postData);
                setLoading(false);
            }
        };

        getPost();
    }, [id]);

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    if (!post) {
        return <div className="loading">Post not found</div>;
    }

    return (
        <div className="post-detail-container">
            <h1 className="post-title">{post.title}</h1>
            <p className="post-body">{post.body}</p>
            <div className="post-meta">
                <span className="text-gray-500 text-sm">Author: User {post.userId}</span>
                <span className="text-gray-500 mx-2">·</span>
                <span className="text-gray-500 text-sm">Views: {post.views}</span>
            </div>
            <div className="post-reactions mt-2">
                <span className="text-green-500 mr-2">Likes: {post.reactions.likes}</span>
                <span className="text-red-500">Dislikes: {post.reactions.dislikes}</span>
            </div>
            <div className="post-tags mt-2">
                {post.tags.map((tag) => (
                    <span key={tag} className="tag">
                        #{tag}
                    </span>
                ))}
            </div>
        </div>
    );
};

export default PostDetailPage;
