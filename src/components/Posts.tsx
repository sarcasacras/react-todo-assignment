import React, { useState, useEffect, ChangeEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { fetchPosts, updatePost, deletePost } from '../features/posts/postSlice';
import { Post } from '../features/posts/types';

const Posts = () => {
    const dispatch = useAppDispatch();
    const posts = useAppSelector(state => state.posts.posts);
    const postStatus = useAppSelector(state => state.posts.status);
    const error = useAppSelector(state => state.posts.error);

    const [editPostId, setEditPostId] = useState<number | null>(null);
    const [editFormData, setEditFormData] = useState({ title: '', body: '' });

    useEffect(() => {
        if (postStatus === 'idle') {
            dispatch(fetchPosts());
        }
    }, [postStatus, dispatch]);

    const handleEditClick = (post: Post) => {
        setEditPostId(post.id);
        setEditFormData({ title: post.title, body: post.body });
    };

    const handleCancelClick = () => {
        setEditPostId(null);
    };

    const handleSaveClick = () => {
        if (editPostId !== null) {  
            dispatch(updatePost({ ...editFormData, id: editPostId }));
            setEditPostId(null);
        }
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setEditFormData({ ...editFormData, [name]: value });
    };

    let content;

    if (postStatus === 'loading') {
        content = <div>Loading...</div>;
    } else if (postStatus === 'succeeded') {
        content = (
            <table className="min-w-full leading-normal">
                <thead>
                    <tr>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            ID
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Title
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Body
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {posts.map(post => (
                        <tr key={post.id}>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                                {post.id}
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                {editPostId === post.id ? (
                                    <input type="text" value={editFormData.title} name="title" onChange={handleChange}
                                    className="w-full px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                ) : (
                                    post.title
                                )}
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                {editPostId === post.id ? (
                                    <textarea value={editFormData.body} name="body" onChange={handleChange}
                                    className="w-full px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                ) : (
                                    post.body
                                )}
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                                {editPostId === post.id ? (
                                    <>
                                        <button onClick={handleSaveClick} className="text-green-500 hover:text-green-700 px-3 py-1 rounded">
                                            Save
                                        </button>
                                        <button onClick={handleCancelClick} className="text-red-500 hover:text-red-700 px-3 py-1 rounded">
                                            Cancel
                                        </button>
                                    </>
                                ) : (
                                    <button onClick={() => handleEditClick(post)} className="text-blue-500 hover:text-blue-700 px-3 py-1 rounded">
                                        Edit
                                    </button>
                                )}
                                <button
                                    onClick={() => dispatch(deletePost(post.id))}
                                    className="text-red-500 hover:text-red-700 px-3 py-1 rounded ml-2"
                                >
                                    Delete
                                </button>
                            </td>

                        </tr>
                    ))}
                </tbody>
            </table>
        );
    } else if (postStatus === 'failed') {
        content = <div>{error}</div>;
    }

    return (
        <section className="p-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Posts</h2>
            {content}
        </section>
    );
};

export default Posts;
