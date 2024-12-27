import React from "react";
import bucketServise from "../appwrite/bucetServ";
import { Link } from "react-router";

function BlogCard({ $id, title, image }) {
  return (
    <Link to={`/blog/${$id}`}>
      <div className="w-full bg-gray-100 rounded-xl p-4">
        <div className="w-full justify-center mb-4">
          <img src={bucketServise.getImagePreview(image)} alt="" />
        </div>
        <h2>{title}</h2>
      </div>
    </Link>
  );
}

export default BlogCard;
