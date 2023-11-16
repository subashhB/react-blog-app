import { useEffect, useState } from "react";
import service from "../services/configuration";
import { Container, PostCard } from "../components";
import { Models } from "appwrite";

const AllPosts = () => {
  const [posts, setPosts] = useState<Models.Document[]>();
  useEffect(() => {
    service.getPosts([]).then((blogPosts) => {
      if (blogPosts) setPosts(blogPosts.documents);
    });
  }, []);
  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {posts?.map((post) => (
            <div key={post.$id}>
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default AllPosts;
