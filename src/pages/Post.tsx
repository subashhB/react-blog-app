import { Models } from "appwrite";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAppSelector } from "../hooks/reduxHooks";
import service from "../services/configuration";
import { Button, Container } from "../components";
import parse from "html-react-parser";

const Post = () => {
  const [post, setPost] = useState<Models.Document>();
  const { slug } = useParams();
  const navigate = useNavigate();

  const userData = useAppSelector((state) => state.auth.userData);

  const isAuthor = userData && post ? post.userId === userData.$id : null;

  useEffect(() => {
    if (slug) {
      service.getPost(slug).then((blogPost) => {
        if (blogPost) setPost(blogPost);
        else navigate("/");
      });
    } else {
      navigate("/");
    }
  }, []);

  const deletePost = () => {
    if (post) {
      service.deletePost(post.$id).then((status) => {
        if (status) {
          service.deleteFile(post.featuredImage);
          navigate("/");
        }
      });
    }
  };

  return post ? (
    <div className="py-8">
      <Container>
        <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
          <img
            src={service.getPreviewFile(post.featuredImage)?.toString()}
            alt={post.title}
            className="rounded-xl"
          />
          {isAuthor && (
            <div className="absolute right-6 top-6">
              <Link to={`/edit-post/${post.$id}`}>
                <Button bgColor="bg-green-500" className="mr-3">
                  Edit
                </Button>
              </Link>
              <Button bgColor="bg-red-500" onClick={deletePost}>
                Delete
              </Button>
            </div>
          )}
        </div>
        <div className="w-full mb-6">
          <h1 className="text-2xl font-bold">{post.title}</h1>
        </div>
        <div className="browser-css">{parse(post.content)}</div>
      </Container>
    </div>
  ) : null;
};

export default Post;
