import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getPostById, deletePost, likePost, unlikePost, addComment, deleteComment } from '../app/slices/postSlice';
import { useAuth } from '../hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Heart, MessageCircle, Trash2, Edit } from 'lucide-react';

const PostDetailsPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { toast } = useToast();
    const { post, isLoading, error } = useSelector((state) => state.posts);
    const { user } = useAuth();

    const [commentText, setCommentText] = useState('');

    useEffect(() => {
        dispatch(getPostById(id));
    }, [dispatch, id]);

    const isAuthor = post && user && post.author?._id === user.id;
    const hasLiked = post && user && post.likes.includes(user.id);
    const canDeletePost = isAuthor || (user && user.role === 'admin');
    const canEditPost = isAuthor;

    const handleDelete = async () => {
        const result = await dispatch(deletePost(id));
        if (deletePost.fulfilled.match(result)) {
            toast({ title: 'Success', description: 'Post deleted successfully.' });
            navigate('/');
        } else {
            toast({ variant: 'destructive', title: 'Error', description: 'Failed to delete post.' });
        }
    };

    const handleLikeToggle = () => {
        dispatch(hasLiked ? unlikePost(id) : likePost(id));
    };

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        if (!commentText.trim()) return;
        dispatch(addComment({ postId: id, commentData: { text: commentText } }))
            .then(() => setCommentText(''));
    };
    
    const handleCommentDelete = (commentId) => {
        dispatch(deleteComment({ postId: id, commentId }));
    };

    if (isLoading || !post) {
        return (
            <div className="container mx-auto px-4 py-8 max-w-3xl">
                <Skeleton className="h-10 w-3/4 mb-4" />
                <Skeleton className="h-6 w-1/2 mb-8" />
                <Skeleton className="h-64 w-full" />
            </div>
        );
    }

    if (error) return <p className="text-red-500 text-center mt-10">Error: {error}</p>;

    return (
        <div className="container mx-auto px-4 py-8 max-w-3xl">
            <Card>
                <CardHeader>
                    <CardTitle className="text-4xl font-bold">{post.title}</CardTitle>
                    <p className="text-muted-foreground">by {post.author?.email || 'Unknown Author'} on {new Date(post.createdAt).toLocaleDateString()}</p>
                    {(canEditPost || canDeletePost) && (
                        <div className="flex gap-2 mt-2">
                            {canEditPost && (
                                <Link to={`/edit-post/${post._id}`}>
                                    <Button variant="outline" size="sm">
                                        <Edit className="mr-2 h-4 w-4"/> Edit
                                    </Button>
                                </Link>
                            )}
                            {canDeletePost && (
                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <Button variant="destructive" size="sm"><Trash2 className="mr-2 h-4 w-4"/> Delete</Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                            <AlertDialogDescription>
                                                This action cannot be undone. This will permanently delete this post and remove its data from our servers.
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                            <AlertDialogAction onClick={handleDelete}>Continue</AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            )}
                        </div>
                    )}
                </CardHeader>
                <CardContent>
                    <p className="whitespace-pre-wrap text-lg leading-relaxed">{post.content}</p>
                </CardContent>
                <CardFooter className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="sm" onClick={handleLikeToggle}>
                            <Heart className={`mr-2 h-5 w-5 ${hasLiked ? 'text-red-500 fill-current' : ''}`} />
                            {post.likes.length} Likes
                        </Button>
                         <div className="flex items-center gap-2 text-muted-foreground">
                            <MessageCircle className="h-5 w-5" />
                            {post.comments.length} Comments
                        </div>
                    </div>
                </CardFooter>
            </Card>

            <div className="mt-8">
                <h3 className="text-2xl font-bold mb-4">Comments</h3>
                <form onSubmit={handleCommentSubmit} className="mb-6">
                    <Textarea
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        placeholder="Write a comment..."
                        className="mb-2"
                    />
                    <Button type="submit">Post Comment</Button>
                </form>
                
                <div className="space-y-4">
                    {post.comments.map(comment => {
                        const canDeleteComment = user && (user.id === comment.user?._id || user.role === 'admin');
                        return (
                            <Card key={comment._id}>
                                <CardContent className="p-4">
                                    <p className="mb-2">{comment.text}</p>
                                    <div className="flex justify-between items-center">
                                        <p className="text-sm text-muted-foreground">
                                            by {comment.user?.email || 'User'} on {new Date(comment.createdAt).toLocaleDateString()}
                                        </p>
                                        {canDeleteComment && (
                                            <Button variant="ghost" size="icon" onClick={() => handleCommentDelete(comment._id)}>
                                                <Trash2 className="h-4 w-4 text-red-500" />
                                            </Button>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default PostDetailsPage;
