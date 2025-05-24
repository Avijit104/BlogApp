import React, { useState } from "react";
import bucketServise from "../appwrite/bucetServ";
import { Link } from "react-router";

function BlogCard({ $id, title, image }) {
  const [url, setUrl] = useState(null);
  const href = bucketServise.getImagePreview(image);
  href.then((imageUrl) => {
    setUrl(imageUrl);
  });
  return (
    <Link to={`/blog/${$id}`}>
      <div className="w-full bg-gray-100 rounded-xl text-black p-4 h-fit">
        <div className="w-full justify-center mb-4 h-fit">
          <img src={url} alt={$id} width={400} height={2000} />
        </div>
        <h2>{title}</h2>
      </div>
    </Link>
  );
}

export default BlogCard;
