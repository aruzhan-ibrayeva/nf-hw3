// app/page.tsx
'use client';

import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { fetchPosts } from './axiosInstance';
import { useAuth } from './authContext';
import './posts.css'; // Import the posts.css file

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

const HomePage = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const { user, logout } = useAuth();
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const getPosts = async () => {
            const postsData = await fetchPosts();
            setPosts(postsData);
            setLoading(false);
        };

        getPosts();
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    return (
        <div className="posts-container">
            <div className="header">
                <h1 className="header-title">Explore fresh posts</h1>
                <div className="profile-container" ref={menuRef}>
                    <img
                        src="/profile.png"
                        alt="Profile"
                        className="profile-button"
                        onClick={() => setMenuOpen(!menuOpen)}
                    />
                    {menuOpen && (
                        <div className="profile-menu">
                            <div className="profile-menu-item">
                                <div className="profile-name">{user?.firstName} {user?.lastName}</div>
                                <div className="profile-email">{user?.email}</div>
                                <button onClick={logout} className="logout-button">Logout</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div className="welcome-message mb-4">
                <p>Welcome, {user?.firstName} {user?.lastName}</p>
            </div>
            <ul className="post-list">
                {posts.map((post) => (
                    <li key={post.id} className="post-item">
                        <div className="post-content">
                            <Link href={`/posts/${post.id}`} legacyBehavior>
                                <a className="post-title">{post.title}</a>
                            </Link>
                            <p className="post-body">{post.body.slice(0, 150)}...</p>
                            <div className="post-meta">
                                <span className="text-gray-500 text-sm">Author: User {post.userId}</span>
                                <span className="text-gray-500 mx-2">·</span>
                                <span className="text-gray-500 text-sm">Published 2 days ago</span>
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
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default HomePage;
