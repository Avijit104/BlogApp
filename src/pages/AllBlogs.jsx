import React, { useEffect } from "react";
import databaseServices from "../appwrite/databaseServ";
import bucketService from "../appwrite/bucetServ";
import { BlogCard, Container } from "../components";
import { useState } from "react";
function AllBlogs() {
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {}, []);
  databaseServices.listBlog().then((blogs) => {
    if (blogs) {
      setBlogs(blogs.documents);
    }
  });
  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex felx-wrap">
          {blogs.map((blog) => (
            <div className="p-2 w-1/4" key={blog.$id}>
              <BlogCard blog={blog} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default AllBlogs;
