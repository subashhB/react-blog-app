import { useForm } from "react-hook-form";
import service, { Status } from "../../services/configuration";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../hooks/reduxHooks";
import { useCallback, useEffect } from "react";
import { Button, Input, RTE, Select } from "..";

interface PostFormProps {
  post: {
    $id: string;
    title: string;
    slug: string;
    content: string;
    status?: Status;
    featuredImage: string;
  };
}

interface FormValues {
  title: string;
  slug: string;
  content: string;
  status: Status;
  image: FileList;
}
const PostForm = ({ post }: PostFormProps) => {
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm<FormValues>({
      defaultValues: {
        title: post?.title || "",
        slug: post?.$id || "",
        content: post?.content || "",
        status: post?.status || Status.active,
      },
    });
  const navigate = useNavigate();
  const userData = useAppSelector((state) => state.auth.userData);

  const submit = async (data: FormValues) => {
    if (post) {
      // update logic
      const file = data.image[0]
        ? await service.uploadFile(data.image[0])
        : null;

      if (file) {
        //If there's already an image during update, delete that image so that we can replace it with the new image.
        await service.deleteFile(post.featuredImage);
      }

      const dbPost = await service.updatePost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : undefined,
      });

      if (dbPost) {
        navigate(`/post/${dbPost.$id}`);
      }
    } else {
      // Create Logic
      const file = await service.uploadFile(data.image[0]);

      if (file && userData) {
        const fileId = file.$id;
        const dbPost = await service.createPost({
          ...data,
          featuredImage: fileId,
          userId: userData.$id,
        });
        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
        }
      }
    }
  };

  const slugTransform = useCallback((value?: string): string => {
    if (value)
      return value
        .trim()
        .toLowerCase()
        .replace(/^[a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");
    return "";
  }, []);

  useEffect(() => {
    const subcription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });
    return () => subcription.unsubscribe();
  }, [slugTransform, watch, setValue]);

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
      <div className="w-2/3 px-2">
        <Input
          label="Title: "
          placeholder="Post Title"
          className="mb-4"
          {...register("title", { required: true })}
        />
        <Input
          label="Slug: "
          className="mb-4"
          {...register("slug", { required: true })}
        />
        <RTE
          label="Content: "
          name="content"
          control={control}
          defaultValue={getValues("content")}
        />
      </div>
      <div className="w-1/3 px-2">
        <Input
          label="Featured Image: "
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", { required: !post })}
        />
        {post && (
          <div className="w-full mb-4">
            <img
              src={service.getPreviewFile(post.featuredImage)?.toString()}
              alt={post.title}
              className="rounded-lg"
            />
          </div>
        )}
        <Select
          options={
            Object.values(Status).filter(
              (value) => typeof value === "string"
            ) as string[]
          }
          className="mb-4"
          label="Status: "
          {...register("status", { required: true })}
        />
        <Button
          type="submit"
          bgColor={post ? "bg-green-500" : undefined}
          className="w-full"
        >
          {post ? "Update" : "Create"}
        </Button>
      </div>
    </form>
  );
};

export default PostForm;
