import React, { useState, useEffect, useRef } from "react";
import JoditEditor from "jodit-react";
import axios from "axios";

const BlogManager = () => {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [shortDescription, setShortDescription] = useState(""); // Short description state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [blogs, setBlogs] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editBlogId, setEditBlogId] = useState(null);
  const [srcImage, setSrcImage] = useState(null);
  const editor = useRef(null);

  const config = {
    readonly: false,
    uploader: {
      insertImageAsBase64URI: true,
    },
  };

  const fetchBlogs = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/blogs", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setBlogs(response.data);
    } catch (err) {
      console.error("Error fetching blogs:", err);
      setError("Failed to fetch blogs");
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleCreateOrUpdate = async () => {
    if (!title || !shortDescription || !content) { // Include shortDescription in validation
      setError("Title, short description, and content are required");
      return;
    }

    setLoading(true);
    setError("");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("shortDescription", shortDescription); // Append short description
    formData.append("content", content);

    if (srcImage) {
      formData.append("images", srcImage);
    }

    try {
      const url = isEditing
        ? `http://localhost:5000/api/blogs/${editBlogId}`
        : "http://localhost:5000/api/blogs/create";

      const response = await axios({
        method: isEditing ? "put" : "post",
        url,
        data: formData,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200 || response.status === 201) {
        fetchBlogs();
        resetForm();
        alert(isEditing ? "Blog updated successfully!" : "Blog created successfully!"); // Alert message
      } else {
        throw new Error("Failed to create/update blog");
      }
    } catch (err) {
      console.error("Error creating or updating blog:", err);
      setError("Error submitting blog");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (blog) => {
    setTitle(blog.title);
    setShortDescription(blog.shortDescription); // Set short description when editing
    setContent(blog.content);
    setEditBlogId(blog._id);
    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll to top when editing
  };

  const handleDelete = async (blogId) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/blogs/${blogId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.status === 200) {
        setBlogs(blogs.filter((blog) => blog._id !== blogId));
      } else {
        throw new Error("Failed to delete blog");
      }
    } catch (err) {
      console.error("Error deleting blog:", err);
      setError("Error deleting blog");
    }
  };

  const resetForm = () => {
    setTitle("");
    setShortDescription(""); // Reset short description
    setContent("");
    setIsEditing(false);
    setEditBlogId(null);
    setSrcImage(null);
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-center text-2xl font-bold mb-4">Write a Blog</h2>
      {error && <div className="text-red-500 mb-4">{error}</div>}

      <input
        type="text"
        placeholder="Blog Title"
        className="w-full p-2 mb-4 border rounded"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      
      <input
        type="text"
        placeholder="Short Description" // Short description input
        className="w-full p-2 mb-4 border rounded"
        value={shortDescription}
        onChange={(e) => setShortDescription(e.target.value)}
      />

      <JoditEditor
        ref={editor}
        value={content}
        config={config}
        tabIndex={1}
        onBlur={(newContent) => setContent(newContent)}
        onChange={() => {}}
        className="w-full mb-4"
      />

      {/* Separate button and file input from editor */}
      <div className="flex items-center space-x-4 mt-4">
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setSrcImage(e.target.files[0])}
          className="mr-2"
        />
        <button
          className="bg-blue-500 text-white py-2 px-6 rounded hover:bg-blue-600 transition duration-150"
          onClick={handleCreateOrUpdate}
          disabled={loading}
        >
          {loading ? "Loading..." : isEditing ? "Update Blog" : "Create Blog"}
        </button>
      </div>

      <h2 className="text-2xl font-bold mt-8 mb-4">Blogs List</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {blogs.map((blog) => (
          <div key={blog._id} className="border border-gray-300 p-4 rounded-lg">
            <h3 className="text-xl font-semibold">{blog.title}</h3>
            <p className="text-gray-600">{blog.shortDescription}</p> {/* Display short description */}
            <div
              className="mt-2 mb-4"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />
            <div className="flex justify-between">
              <button
                onClick={() => handleEdit(blog)}
                className="text-blue-600 hover:underline"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(blog._id)}
                className="text-red-600 hover:underline"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogManager;
