import { Models } from "appwrite";
import { useEffect, useState } from "react";
import service from "../services/configuration";
import { Container, PostCard } from "../components";

const Home = () => {
  const [posts, setPosts] = useState<Models.Document[]>();
  useEffect(() => {
    service.getPosts([]).then((blogPosts) => {
      if (blogPosts) setPosts(blogPosts.documents);
    });
  }, []);

  if (posts?.length === 0) {
    return (
      <div className="w-full py-8 mt-4 text-center">
        <Container>
          <div className="flex flex-wrap">
            <div className="p-2 w-full">
              <h1 className="text-2xl font-bold hover:text-gray-500">
                Login to read the blogs
              </h1>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {posts?.map((post) => <PostCard {...post} />)}
        </div>
      </Container>
    </div>
  );
};

export default Home;
