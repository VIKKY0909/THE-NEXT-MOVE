// BlogItemDetails.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './BlogItemDetails.css';

const BlogItemDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogItemById = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/blogs/${id}`); // Update with your actual endpoint
        setBlog(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogItemById();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!blog) return <div>Blog post not found</div>;

  return (
    <div className="blog-item-details">
      <img src={blog.imageUrl} alt={blog.title} className="blog-details-image" />
      <div className="blog-details-content">
        <div className="blog-details-info">
          <span className="author">{blog.author}</span>
          <span className="date">{blog.date}</span>
        </div>
        <h3 className="blog-details-title">{blog.title}</h3>
        <p className="blog-details-description">{blog.description}</p>
        <div className="blog-details-tags">
          {blog.buttons.map((button) => (
            <span key={button} className="tag">{button}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogItemDetails;
