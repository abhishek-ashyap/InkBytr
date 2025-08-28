import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, MessageCircle } from 'lucide-react';

const PostCard = ({ post }) => {
  const contentSnippet = post.content.substring(0, 100) + '...';

  return (
    <Link to={`/posts/${post._id}`}>
        <Card className="hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
            <CardHeader>
                <CardTitle className="text-xl">{post.title}</CardTitle>
                <CardDescription>By {post.author.email}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
                <p>{contentSnippet}</p>
            </CardContent>
            <CardFooter className="flex justify-between text-sm text-gray-500">
                 <div className="flex items-center gap-1">
                    <Heart className="h-4 w-4" />
                    <span>{post.likes.length}</span>
                </div>
                <div className="flex items-center gap-1">
                    <MessageCircle className="h-4 w-4" />
                    <span>{post.comments.length}</span>
                </div>
                <span>{new Date(post.createdAt).toLocaleDateString()}</span>
            </CardFooter>
        </Card>
    </Link>
  );
};

export default PostCard;