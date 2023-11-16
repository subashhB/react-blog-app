import { Models } from "appwrite";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import service from "../services/configuration";
import { Container, PostForm } from "../components";

const EditPost = () => {
  const [post, setPost] = useState<Models.Document>();
  const { slug } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    if (slug) {
      service.getPost(slug).then((blogPost) => {
        if (blogPost) setPost(blogPost);
      });
    } else {
      navigate("/");
    }
  }, [slug, navigate]);
  return post ? (
    <div className="py-8">
      <Container>
        <PostForm post={post} />
      </Container>
    </div>
  ) : null;
};

export default EditPost;
