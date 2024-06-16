// app/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { fetchPosts } from './axiosInstance';
import { useAuth } from './authContext';
import './posts.css';
import Image from 'next/image';

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
        <div className="posts-container">
            <div className="header">
                <h1 className="header-title">Posts</h1>
                <div className="profile-container">
                <Image src="/profile.png" alt="Profile" className="profile-button" width={40} height={40} />
                    <div className="profile-menu">
                        <div className="profile-menu-item">
                            <div className="profile-name">{user?.firstName} {user?.lastName}</div>
                            <div className="text-sm text-gray-500">{user?.email}</div>
                        </div>
                        <div className="profile-menu-item">
                            <button onClick={logout} className="logout-button">Logout</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="welcome-message">
                <p>Welcome, {user?.firstName} {user?.lastName}</p>
            </div>
            <ul className="post-list">
                {posts.map((post) => (
                    <li key={post.id} className="post-item">
                        <Link href={`/posts/${post.id}`} legacyBehavior>
                            <a className="post-title">{post.title}</a>
                        </Link>
                        <p className="post-body">{post.body.slice(0, 150)}...</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default HomePage;