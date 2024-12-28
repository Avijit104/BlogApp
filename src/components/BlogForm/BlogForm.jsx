import React, { useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, Select, Rte } from "../index";
import databaseServices from "../../appwrite/databaseServ";
import bucketService from "../../appwrite/bucetServ";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";

function BlogForm({ post }) {
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.slug || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });

  const submit = async (data) => {
    if (post) {
      const file = data.image[0]
        ? bucketService.uploadImage(data.image[0])
        : null;
      if (file) {
        bucketService.deleteImage(post.image);
      }
      const dbPost = await databaseServices.updateBlog(post.$id, {
        ...data,
        image: file ? await file.$id : undefined,
      });
      if (dbPost) {
        navigate(`/blog/${post.$id}`);
      }
    } else {
      const file = await bucketService.uploadImage(data.image[0]);
      if (file) {
        const fileId = file.$id;
        data.image = fileId;
        const dbPost = await databaseServices.createBlog({
          ...data,
          userid: userData.$id,
        });
        if (dbPost) {
          navigate(`/blog.${dbPost.$id}`);
        }
      }
    }
  };
  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string") {
      return value
        .trim()
        .toLowerCase()
        .replace(/^[a-zA-Z\d]+/g, "-");
    } else {
      return "";
    }
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title, { shoudValidate: true }));
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [watch, slugTransform, setValue]);
  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
      <div className="w-2/3 px-2">
        <Input
          labelText ="Title :"
          placeholder="Title"
          className="mb-4"
          {...register("title", { required: true })}
        />
        <Input
          labelText ="Slug :"
          placeholder="Slug"
          className="mb-4"
          {...register("slug", { required: true })}
          onInput={(e) => {
            setValue("slug", slugTransform(e.currentTarget.value), {
              shouldValidate: true,
            });
          }}
        />
        <Rte
          labelText ="Content :"
          name="content"
          control={control}
          defaultValue={getValues("content")}
        />
      </div>
      <div className="w-1/3 px-2">
        <Input
          labelText ="Featured Image :"
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", { required: !post })}
        />
        {post && (
          <div className="w-full mb-4">
            <img
              src={appwriteService.getFilePreview(post.featuredImage)}
              alt={post.title}
              className="rounded-lg"
            />
          </div>
        )}
        <Select
          options={["active", "inactive"]}
          labelText ="Status"
          className="mb-4"
          {...register("status", { required: true })}
        />
        <Button
          type="submit"
          bgColor={post ? "bg-green-500" : undefined}
          className="w-full"
        >
          {post ? "Update" : "Submit"}
        </Button>
      </div>
    </form>
  );
}

export default BlogForm;
