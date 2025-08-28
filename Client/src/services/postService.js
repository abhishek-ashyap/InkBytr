import api from './api';

const getAllPosts = async () => {
  const response = await api.get('/posts');
  return response.data;
};

const getPostById = async (id) => {
  const response = await api.get(`/posts/${id}`);
  return response.data;
};

const createPost = async (postData) => {
  const response = await api.post('/posts', postData);
  return response.data;
};

const updatePost = async (id, postData) => {
  const response = await api.put(`/posts/${id}`, postData);
  return response.data;
};

const deletePost = async (id) => {
  const response = await api.delete(`/posts/${id}`);
  return response.data;
};

const likePost = async (id) => {
  const response = await api.post(`/posts/${id}/like`);
  return response.data;
};

const unlikePost = async (id) => {
  const response = await api.post(`/posts/${id}/unlike`);
  return response.data;
};

const addComment = async (postId, commentData) => {
    const response = await api.post(`/posts/${postId}/comments`, commentData);
    return response.data;
};

const deleteComment = async (postId, commentId) => {
    const response = await api.delete(`/posts/${postId}/comments/${commentId}`);
    return response.data;
};

const getUserPosts = async () => {
  const response = await api.get('/posts/myposts');
  return response.data;
};

const postService = {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  likePost,
  unlikePost,
  addComment,
  deleteComment,
  getUserPosts, // ✅ Add the new function to the export
};

export default postService;