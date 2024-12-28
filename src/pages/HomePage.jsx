import React from "react";
import { useState, useEffect } from "react";
import databaseServices from "../appwrite/databaseServ";
import { Container } from "postcss";

function HomePage() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    databaseServices.listBlog().then((blog) => {
      if (blog) {
        setBlogs(blog.documents);
      }
    });
  }, []);

  if (blogs.length === 0) {
    return (
      <div className="w-full py-8 mt-4 text-center">
        <Container>
          <div className="flex flex-wrap">
            <div className="p-2 w-full">
              <h1 className="text-2xl font-bold hover:text-gray-500">
                Login to read posts
              </h1>
            </div>
          </div>
        </Container>
      </div>
    );
  }
  return (
    <div className="w-full py-8" >
        <Container>
            <div className="flex flex-wrap">
                {blogs.map((blog) => (
                    <div className="p-2 w-1/4" key={blog.$id}>
                        <BlogCard blog={blog} />
                    </div>
                ))}
            </div>
        </Container>
    </div>
  )
}

export default HomePage;
