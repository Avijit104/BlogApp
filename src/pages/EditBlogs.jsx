import React from "react";
import databaseServices from "../appwrite/databaseServ";
import { BlogForm, Container } from "../components";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
function EditBlogs() {
  const [blogs, setBlogs] = useState([]);
  const { slug } = useParams();
  console.log(slug)
  const navigate = useNavigate();

  useEffect(() => {
    if (slug) {
      databaseServices.getBlog(slug).then((blog) => {
        if (blog) {
          setBlogs(blog);
        }
      });
    } else {
      navigate("/");
    }
  }, [slug, navigate]);

  return blogs ? (
    <div className="py-8">
      <Container>
        <BlogForm post={blogs} />
      </Container>
    </div>
  ) : null;
}

export default EditBlogs;
