import { Link } from "react-router-dom";
import service from "../services/configuration";
import { Models } from "appwrite";

const PostCard = ({ $id: postId, title, featuredImage }: Models.Document) => {
  return (
    <Link to={`/post/${postId}`}>
      <div className="w-full bg-secondaryBg rounded-xl p-4">
        <div className="w-full justify-center mb-4">
          <img
            src={service.getPreviewFile(featuredImage)?.toString()}
            alt={title}
            className="rounded-xl"
          />
        </div>
        <h2 className="text-xl font-bold">{title}</h2>
      </div>
    </Link>
  );
};

export default PostCard;
