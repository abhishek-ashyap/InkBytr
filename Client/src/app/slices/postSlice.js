import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import postService from '../../services/postService';

const initialState = {
  posts: [],
  userPosts: [], // ✅ ADDED: A new spot in the state to hold only the user's posts
  post: null,
  isLoading: false,
  error: null,
};

// Async Thunks
export const getAllPosts = createAsyncThunk('posts/getAll', async (_, { rejectWithValue }) => {
  try {
    const posts = await postService.getAllPosts();
    return posts;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const getPostById = createAsyncThunk('posts/getById', async (id, { rejectWithValue }) => {
  try {
    const post = await postService.getPostById(id);
    return post;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const createPost = createAsyncThunk('posts/create', async (postData, { rejectWithValue }) => {
  try {
    const { post } = await postService.createPost(postData);
    return post;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const updatePost = createAsyncThunk('posts/update', async ({ id, postData }, { rejectWithValue }) => {
  try {
    const { post } = await postService.updatePost(id, postData);
    return post;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const deletePost = createAsyncThunk('posts/delete', async (id, { rejectWithValue }) => {
  try {
    await postService.deletePost(id);
    return id;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const likePost = createAsyncThunk('posts/like', async (id, { rejectWithValue, getState }) => {
    try {
        await postService.likePost(id);
        const { auth } = getState();
        return { postId: id, userId: auth.user.id };
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const unlikePost = createAsyncThunk('posts/unlike', async (id, { rejectWithValue, getState }) => {
    try {
        await postService.unlikePost(id);
        const { auth } = getState();
        return { postId: id, userId: auth.user.id };
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const addComment = createAsyncThunk('posts/addComment', async ({ postId, commentData }, { rejectWithValue }) => {
    try {
        const { comments } = await postService.addComment(postId, commentData);
        return { postId, comments };
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const deleteComment = createAsyncThunk('posts/deleteComment', async ({ postId, commentId }, { rejectWithValue }) => {
    try {
        await postService.deleteComment(postId, commentId);
        return { postId, commentId };
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const fetchUserPosts = createAsyncThunk('posts/fetchUserPosts', async (_, { rejectWithValue }) => {
  try {
    const posts = await postService.getUserPosts();
    return posts;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Keep all your existing .addCase blocks here...
      .addCase(getAllPosts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.posts = action.payload;
      })
      .addCase(getAllPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.error || 'Failed to fetch posts';
      })
      .addCase(getPostById.pending, (state) => {
        state.isLoading = true;
        state.post = null;
        state.error = null;
      })
      .addCase(getPostById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.post = action.payload;
      })
      .addCase(getPostById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.error || 'Failed to fetch post';
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.posts.unshift(action.payload);
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        const updatedPost = action.payload;
        state.post = updatedPost;
        const index = state.posts.findIndex(p => p._id === updatedPost._id);
        if (index !== -1) {
            state.posts[index] = updatedPost;
        }
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.posts = state.posts.filter((post) => post._id !== action.payload);
      })
      .addCase(likePost.fulfilled, (state, action) => {
        const { postId, userId } = action.payload;
        const post = state.post._id === postId ? state.post : state.posts.find(p => p._id === postId);
        if (post) {
            post.likes.push(userId);
        }
      })
      .addCase(unlikePost.fulfilled, (state, action) => {
        const { postId, userId } = action.payload;
        const post = state.post._id === postId ? state.post : state.posts.find(p => p._id === postId);
        if (post) {
            post.likes = post.likes.filter(id => id !== userId);
        }
      })
      .addCase(addComment.fulfilled, (state, action) => {
          if (state.post && state.post._id === action.payload.postId) {
              state.post.comments = action.payload.comments;
          }
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
          if (state.post && state.post._id === action.payload.postId) {
              state.post.comments = state.post.comments.filter(c => c._id !== action.payload.commentId);
          }
      })
      // ✅ ADDED: Logic for handling the fetchUserPosts action
      .addCase(fetchUserPosts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUserPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userPosts = action.payload;
      })
      .addCase(fetchUserPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.error || 'Failed to fetch your posts';
      });
  },
});

export default postSlice.reducer;
