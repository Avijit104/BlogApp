import React from "react";
import bucketServise from "../appwrite/bucetServ";
import { Link } from "react-router";

function BlogCard({ $id, title, image }) {

  const imagepre = bucketServise.getImagePreview(image)
  console.log(imagepre)
  return (
    <Link to={`/blog/${$id}`}>
      <div className="w-full bg-gray-100 rounded-xl text-black p-4">
        <div className="w-full justify-center mb-4">
          <img src={imagepre} alt={$id} />
        </div>
        <h2>{title}</h2>
      </div>
    </Link>
  );
}

export default BlogCard;
