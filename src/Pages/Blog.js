import React, { useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick";
import { Link } from "react-router-dom";

const Blog = () => {
  const [blogs, setBlogs] = useState({
    recentBlogs: [],
    allBlogs: [],
  });

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/blogs");

        const recentBlogs = response.data
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 5);

        setBlogs({
          recentBlogs,
          allBlogs: response.data,
        });
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  const getFirstImage = (html) => {
    const div = document.createElement("div");
    div.innerHTML = html;
    const img = div.querySelector("img"); // Get the first <img> element
    return img ? img.src : null;
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen p-8">
      <h1 className="text-5xl font-bold text-center mb-6">THE BLOG</h1>
      <hr className="border-gray-700 mb-8" />
      <h2 className="text-2xl font-semibold mb-6">Recent Blog Posts</h2>

      {/* Recent Blogs Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {blogs.recentBlogs?.map((blog) => (
          <Link to={`/blog/${blog._id}`} key={blog._id}>
            <div className="bg-white text-gray-900 rounded-lg shadow-lg overflow-hidden">
              {/* Display first image if available */}
              {getFirstImage(blog.content) ? (
                <img
                  src={getFirstImage(blog.content)}
                  alt="Blog Content"
                  className="w-full h-48 object-cover"
                />
              ) : (
                <div className="w-full h-48 bg-gray-200"></div> // Placeholder if no image
              )}
              <div className="p-4">
                <p className="text-sm text-gray-500">
                  {new Date(blog.createdAt).toLocaleDateString()}
                </p>
                <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
                {/* Display short description from MongoDB */}
                <p className="text-gray-700">{blog.shortDescription}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* All Blogs Slider */}
      <h2 className="text-2xl font-semibold mb-6">All Blog Posts</h2>
      <Slider {...sliderSettings}>
        {blogs.allBlogs?.map((blog) => (
          <div className="px-2" key={blog._id}>
            <Link to={`/blog/${blog._id}`}>
              <div className="bg-white text-gray-900 rounded-lg shadow-lg overflow-hidden">
                {getFirstImage(blog.content) ? (
                  <img
                    src={getFirstImage(blog.content)}
                    alt="Blog Content"
                    className="w-full h-48 object-cover"
                  />
                ) : (
                  <div className="w-full h-48 bg-gray-200"></div>
                )}
                <div className="p-4">
                  <p className="text-sm text-gray-500">
                    {new Date(blog.createdAt).toLocaleDateString()}
                  </p>
                  <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
                  {/* Display short description from MongoDB */}
                  <p className="text-gray-700">{blog.shortDescription}</p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Blog;
