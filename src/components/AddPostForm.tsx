import React, { useState } from 'react';
import { useAppDispatch } from '../app/hooks';
import { addPost } from '../features/posts/postSlice';

const AddPostForm = () => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const dispatch = useAppDispatch();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title || !body) return;

        const newPost = {
            id: Math.floor(Math.random() * 899) + 101,  
            title,
            body
        };
        
        dispatch(addPost(newPost));
        setTitle('');
        setBody('');
    };

    return (
        <form onSubmit={handleSubmit} className="mb-4">
            <div className="mb-4">
                <label htmlFor="title" className="block text-sm font-bold mb-2">Title:</label>
                <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    className="shadow appearance-none border rounded w-1/5 py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-10"
                />
            </div>
            <div className="mb-6">
                <label htmlFor="body" className="block text-sm font-bold mb-2">Body:</label>
                <textarea
                    id="body"
                    value={body}
                    onChange={e => setBody(e.target.value)}
                    className="shadow appearance-none border rounded w-1/5 py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-12"
                />
            </div>
            <button type="submit" className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
                Add Post
            </button>
        </form>
    );
};

export default AddPostForm;