import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { Post } from './types';

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
  return response.data as Post[];
});

const postSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: [] as Post[],
    status: 'idle',
    error: null as string | null
  },
  reducers: {
    // Adding a post
    addPost: (state, action: PayloadAction<Post>) => {
      state.posts.push(action.payload);
    },
    // Updating a post
    updatePost: (state, action: PayloadAction<Post>) => {
      const index = state.posts.findIndex(post => post.id === action.payload.id);
      if (index !== -1) {
        state.posts[index] = action.payload;
      }
    },
    // Deleting a post
    deletePost: (state, action: PayloadAction<number>) => { 
      state.posts = state.posts.filter(post => post.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'An unknown error occurred';
      });
  }
});

export const { addPost, updatePost, deletePost } = postSlice.actions;

export default postSlice.reducer;