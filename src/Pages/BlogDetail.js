import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

// Helper function to get the first image
const getFirstImage = (html) => {
  const div = document.createElement("div");
  div.innerHTML = html;
  const img = div.querySelector("img"); // Extract the first <img> element
  return img ? img.src : null;
};

// Blog Card Component
const BlogCard = ({ blog }) => (
  <Link to={`/blog/${blog._id}`} key={blog._id}>
    <div className="bg-white text-gray-900 rounded-lg shadow-lg overflow-hidden mb-4">
      {getFirstImage(blog.content) ? (
        <img
          src={getFirstImage(blog.content)}
          alt="Blog Content"
          className="w-full h-36 object-cover"
        />
      ) : (
        <div className="w-full h-36 bg-gray-200 animate-pulse"></div> // Placeholder if no image
      )}
      <div className="p-4">
        <p className="text-sm text-gray-500">
          {new Date(blog.createdAt).toLocaleDateString()}
        </p>
        <h2 className="text-lg font-semibold">{blog.title}</h2>
      </div>
    </div>
  </Link>
);

// Blog Details Component
const BlogDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [recommendedBlogs, setRecommendedBlogs] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchBlogDetails = async () => {
      try {
        setLoading(true); // Start loading
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/blogs/${id}`);
        setBlog(response.data);
      } catch (error) {
        console.error("Error fetching blog details:", error);
      }
    };

    const fetchRecommendedBlogs = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/blogs`);
        const filteredBlogs = response.data.filter((b) => b._id !== id).slice(0, 3);
        setRecommendedBlogs(filteredBlogs);
      } catch (error) {
        console.error("Error fetching recommended blogs:", error);
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchBlogDetails();
    fetchRecommendedBlogs();
  }, [id]);

  return (
    <div className="bg-gray-900 min-h-screen p-8 flex justify-center">
      <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Blog Content */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-lg p-8">
          {loading ? (
            // Loading Skeleton for Main Blog Content
            <div className="animate-pulse">
              <div className="h-10 bg-gray-200 rounded mb-4"></div>
              <div className="h-5 bg-gray-200 rounded mb-8 w-1/3"></div>
              <div className="space-y-4">
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              </div>
            </div>
          ) : (
            // Actual Blog Content
            blog && (
              <>
                <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>
                <p className="text-gray-500 text-sm mb-8">
                  {new Date(blog.createdAt).toLocaleDateString()}
                </p>
                <div
                  className="text-lg leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: blog.content }}
                ></div>
              </>
            )
          )}
        </div>

        {/* Recommended Blogs Sidebar */}
        <div className="lg:col-span-1">
          <h2 className="text-2xl font-semibold mb-4">Recommended Blogs</h2>
          <div className="flex flex-col space-y-4">
            {loading ? (
              // Loading Skeleton for Recommended Blogs
              Array(3)
                .fill(0)
                .map((_, index) => (
                  <div key={index} className="animate-pulse bg-white p-4 rounded-lg shadow-lg">
                    <div className="w-full h-36 bg-gray-200 rounded mb-4"></div>
                    <div className="h-5 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2 mt-2"></div>
                  </div>
                ))
            ) : (
              // Actual Recommended Blogs Content
              recommendedBlogs.map((recommendedBlog) => (
                <BlogCard key={recommendedBlog._id} blog={recommendedBlog} />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
