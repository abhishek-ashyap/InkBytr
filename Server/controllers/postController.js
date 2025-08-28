import Post from '../models/Post.js';

// @desc Create new post
export const createPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    if (!title || !content)
      return res.status(400).json({ error: 'Title and content are required' });

    const newPost = new Post({
      title,
      content,
      author: req.user.id,
    });

    await newPost.save();
    res.status(201).json({ message: 'Post created', post: newPost });
  } catch (err) {
    console.error('❌ Error creating post:', err);
    res.status(500).json({ error: 'Failed to create post' });
  }
};

// @desc Get all posts
export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate('author', 'email')
      .sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (err) {
    console.error('❌ Error fetching posts:', err);
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
};

// @desc Get post by ID
export const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate('author', 'email')
      .populate('comments.user', 'email');

    if (!post) return res.status(404).json({ error: 'Post not found' });
    res.status(200).json(post);
  } catch (err) {
    console.error('❌ Detailed error fetching post by ID:', err);
    res.status(500).json({ error: 'Error fetching post' });
  }
};

// @desc Update post
export const updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post not found' });
    if (post.author.toString() !== req.user.id)
      return res.status(403).json({ error: 'Unauthorized' });

    post.title = req.body.title || post.title;
    post.content = req.body.content || post.content;

    await post.save();
    res.status(200).json({ message: 'Post updated', post });
  } catch (err) {
    console.error('❌ Error updating post:', err);
    res.status(500).json({ error: 'Failed to update post' });
  }
};

// @desc Delete post
export const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post not found' });

    if (post.author.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    await post.deleteOne();

    res.status(200).json({ message: 'Post deleted' });
  } catch (err) {
    console.error('❌ Error deleting post:', err);
    res.status(500).json({ error: 'Failed to delete post' });
  }
};


// @desc Like a post
export const likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post not found' });

    if (post.likes.includes(req.user.id))
      return res.status(400).json({ error: 'Already liked' });

    post.likes.push(req.user.id);
    await post.save();

    res.status(200).json({ message: 'Post liked' });
  } catch (err) {
    console.error('❌ Error liking post:', err);
    res.status(500).json({ error: 'Failed to like post' });
  }
};

// @desc Unlike a post
export const unlikePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post not found' });

    if (!post.likes.includes(req.user.id))
      return res.status(400).json({ error: 'You have not liked this post' });

    post.likes = post.likes.filter((id) => id.toString() !== req.user.id);
    await post.save();

    res.status(200).json({ message: 'Post unliked' });
  } catch (err) {
    console.error('❌ Error unliking post:', err);
    res.status(500).json({ error: 'Failed to unlike post' });
  }
};

// @desc Create a comment
export const createComment = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post not found' });

    const comment = {
      user: req.user.id,
      text: req.body.text,
    };

    post.comments.push(comment);
    await post.save();

    const updatedPost = await Post.findById(post._id).populate('comments.user', 'email');

    res.status(201).json({ message: 'Comment added', comments: updatedPost.comments });
  } catch (err) {
    console.error('❌ Error adding comment:', err);
    res.status(500).json({ error: 'Failed to add comment' });
  }
};

// @desc Delete a comment
export const deleteComment = async (req, res) => {
  try {
    const { id: postId, commentId } = req.params;
    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ error: 'Post not found' });

    const comment = post.comments.id(commentId);
    if (!comment) return res.status(404).json({ error: 'Comment not found' });

    if (comment.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Unauthorized to delete this comment' });
    }

    // ✅ FINAL FIX: Use the modern .pull() method to reliably remove the subdocument.
    post.comments.pull({ _id: commentId });
    await post.save();

    res.status(200).json({ message: 'Comment deleted' });
  } catch (err) {
    console.error('❌ Error deleting comment:', err);
    res.status(500).json({ error: 'Failed to delete comment' });
  }
};

// @desc Get all posts by the logged-in user
export const getUserPosts = async (req, res) => {
  try {
    const posts = await Post.find({ author: req.user.id })
      .populate('author', 'email')
      .sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (err) {
    console.error('❌ Error fetching user posts:', err);
    res.status(500).json({ error: 'Failed to fetch user posts' });
  }
};
