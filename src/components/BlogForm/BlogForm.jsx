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

    console.log(post.title)

  const submit = async (data) => {
    console.log(userData)
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
        console.log(dbPost)
        if (dbPost) {
          navigate(`/blog/${dbPost.$id}`);
        }
      }
    }
  };
  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string") {
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");
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
    <div className="`mx-auto w-full  bg-gray-100 rounded-xl p-10 border border-black/10" >
      <h1 className="text-center text-3xl py-2 font-bold leading-tight text-black">Create Blog</h1>
      <div className="h-px w-full bg-gray-800 mb-8" ></div>
      <form
        onSubmit={handleSubmit(submit)}
        className="flex flex-wrap "
      >
        <div className="w-2/3 px-2 ">
          <Input
            labelText="Title :"
            placeholder="Title"
            className="mb-4"
            {...register("title", { required: true })}
          />
          <Input
            labelText="Slug :"
            placeholder="Slug"
            className="mb-4"
            disabled={true}
            {...register("slug", { required: true })}
            onInput={(e) => {
              setValue("slug", slugTransform(e.currentTarget.value), {
                shouldValidate: true,
              });
            }}
          />
          <Rte
            labelText="Content :"
            name="content"
            control={control}
            defaultValue={getValues("content")}
          />
        </div>
        <div className="w-1/3 px-2">
          <Input
            labelText="Featured Image :"
            type="file"
            className="mb-4"
            accept="image/png, image/jpg, image/jpeg, image/gif"
            {...register("image", { required: !post })}
          />
          {post && (
            <div className="w-full mb-4 text-black">
              <img
                src={bucketService.getImagePreview(post.image)}
                alt={post.title}
                className="rounded-lg"
              />
            </div>
          )}
          <Select
            options={["active", "inactive"]}
            labelText="Status"
            className="mb-4"
            {...register("status", { required: true })}
          />
          <Button
            type="submit"
            bgColor={post ? "bg-green-500" : undefined}
            className="w-full mt-8"
          >
            {post ? "Update" : "Submit"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default BlogForm;
