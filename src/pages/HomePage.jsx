import React from "react";
import { useState, useEffect } from "react";
import databaseServices from "../appwrite/databaseServ";
import { Container, BlogCard } from "../components";
import { useSelector } from "react-redux";

function HomePage() {
  const [blogs, setBlogs] = useState([]);
  const authStatus = useSelector((state) => state.auth.isLogin);
  useEffect(() => {
    databaseServices.listBlog().then((blog) => {
      if (blog) {
        setBlogs(blog.documents);
      }
    });
  }, []);
  if (blogs.length === 0) {
    return (
      <div className="w-full h-screen mt-52 py-8  text-center">
        <Container>
          <div className="flex flex-wrap">
            <div className="p-2 w-full">
              {authStatus ? (
                <h1 className="text-4xl font-bold hover:text-gray-500">
                  Wellcome.....
                </h1>
              ) : (
                <h1 className="text-4xl font-bold hover:text-gray-500">
                  Login to see Blogs
                </h1>
              )}
            </div>
          </div>
        </Container>
      </div>
    );
  }
  return (
    <div className="w-full h-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {blogs.map((blog) => {
            return (
              <div className="p-2 w-1/4" key={blog.$id}>
                <BlogCard {...blog} />
              </div>
            );
          })}
        </div>
      </Container>
    </div>
  );
}

export default HomePage;