import React, { useState, useEffect, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import Quill's CSS
import axios from "axios";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import "quill/dist/quill.snow.css";
import "./css/customFonts.css"; // Custom CSS file for fonts

const BlogManager = () => {
  const [content, setContent] = useState(""); // Blog content
  const [title, setTitle] = useState(""); // Blog title
  const [images, setImages] = useState([]); // Blog images
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [blogs, setBlogs] = useState([]); // Blog list
  const [isEditing, setIsEditing] = useState(false); // Track if updating
  const [editBlogId, setEditBlogId] = useState(null); // Store current blog ID for editing
  const [crop, setCrop] = useState({ aspect: 16 / 9 }); // Crop aspect ratio
  const [croppedImage, setCroppedImage] = useState(null); // Store cropped image
  const [srcImage, setSrcImage] = useState(null); // Original image
  const [completedCrop, setCompletedCrop] = useState(null); // Crop object

  const quillRef = useRef(null); // Quill reference

  const customFonts = ["Arial", "Georgia", "Courier", "Roboto", "Lobster"];
  const Font = ReactQuill.Quill.import("formats/font");
  Font.whitelist = customFonts;
  ReactQuill.Quill.register(Font, true);

  const modules = {
    toolbar: [
      [{ font: customFonts }],
      ["bold", "italic", "underline", "strike"],
      [{ header: 1 }, { header: 2 }],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ align: [] }],
      [{ color: [] }, { background: [] }],
      ["link", "image"],
      ["clean"],
    ],
  };

  // Fetch blogs
  const fetchBlogs = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/blogs", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setBlogs(response.data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch blogs");
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // Handle blog submission or update
  const handleSubmit = async () => {
    if (!title || !content) {
      setError("Title and content are required");
      return;
    }

    setLoading(true);
    setError("");
    
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);

    images.forEach((image) => {
      formData.append("images", image);
    });

    try {
      if (isEditing) {
        // Update blog
        const response = await axios.put(
          `http://localhost:5000/api/blogs/${editBlogId}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        if (response.status === 200) {
          alert("Blog updated successfully!");
        } else {
          throw new Error("Failed to update blog");
        }
      } else {
        // Create blog
        const response = await axios.post(
          "http://localhost:5000/api/blogs/create",
          formData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        if (response.status === 201) {
          alert("Blog created successfully!");
        } else {
          throw new Error("Failed to create blog");
        }
      }
      fetchBlogs();
      resetForm();
    } catch (err) {
      console.error(err);
      setError("Error submitting blog");
    } finally {
      setLoading(false);
    }
  };

  // Reset form after submission or cancel
  const resetForm = () => {
    setTitle("");
    setContent("");
    setImages([]);
    setIsEditing(false);
    setEditBlogId(null);
  };

  // Handle blog deletion
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
        alert("Blog deleted successfully!");
        fetchBlogs();
      } else {
        throw new Error("Failed to delete blog");
      }
    } catch (err) {
      console.error(err);
      setError("Error deleting blog");
    }
  };

  // Load blog data for editing
  const handleEdit = (blog) => {
    setTitle(blog.title);
    setContent(blog.content);
    setEditBlogId(blog._id);
    setIsEditing(true);
  };

  // Handle image upload (Cloudinary logic)
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "your_cloudinary_preset"); // Use your actual preset

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/your_cloud_name/image/upload", // Cloudinary URL
        formData
      );
      const imageUrl = response.data.secure_url;
      setImages((prev) => [...prev, imageUrl]);
    } catch (err) {
      console.error("Image upload failed:", err);
    }
  };

  // Handle inserting the cropped image into Quill
  const handleImageInsert = async () => {
    if (completedCrop && srcImage) {
      const imageElement = new Image();
      imageElement.src = srcImage;

      imageElement.onload = async () => {
        const croppedUrl = await getCroppedImage(imageElement, completedCrop);
        const quill = quillRef.current.getEditor();
        const range = quill.getSelection();

        quill.insertEmbed(range.index, "image", croppedUrl); // Insert cropped image into Quill
      };
    }
  };

  // Get cropped image from canvas
  const getCroppedImage = (image, crop) => {
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (!blob) {
          reject(new Error("Canvas is empty"));
          return;
        }
        const fileUrl = URL.createObjectURL(blob);
        resolve(fileUrl);
      }, "image/jpeg");
    });
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6 text-center">
        {isEditing ? "Update Blog" : "Write a Blog"}
      </h2>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      
      {/* Blog Editor */}
      <input
        type="text"
        placeholder="Blog Title"
        className="p-3 border border-gray-300 rounded-lg w-full mb-4"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <ReactQuill
        ref={quillRef}
        value={content}
        onChange={setContent}
        modules={modules}
        className="bg-white border-separate border-blue-800 border-spacing-3"
        placeholder="Write your blog content here..."
      />
      
      <input
        type="file"
        accept="image/*"
        className="mt-4"
        onChange={handleImageUpload}
      />
      
      {srcImage && (
        <div>
          <ReactCrop
            src={srcImage}
            crop={crop}
            onChange={(newCrop) => setCrop(newCrop)}
            onComplete={(c) => setCompletedCrop(c)}
          />
          <button
            onClick={handleImageInsert}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
          >
            Insert Cropped Image
          </button>
        </div>
      )}
      
      <button
        onClick={handleSubmit}
        className={`mt-6 w-full sm:w-auto bg-blue-600 text-white px-6 py-3 rounded-lg transition-all duration-300 ${
          loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={loading}
      >
        {loading ? "Submitting..." : isEditing ? "Update Blog" : "Submit Blog"}
      </button>
      
      {isEditing && (
        <button
          onClick={resetForm}
          className="mt-4 bg-gray-600 text-white px-6 py-3 rounded-lg"
        >
          Cancel
        </button>
      )}
      
      {/* Blog List */}
      <div className="mt-10">
        <h2 className="text-3xl font-bold mb-6 text-center">All Blogs</h2>
        {blogs.length === 0 ? (
          <p>No blogs available</p>
        ) : (
          blogs.map((blog) => (
            <div key={blog._id} className="bg-white shadow-lg rounded-lg p-6 mb-4">
              <h3 className="text-2xl font-semibold mb-2">{blog.title}</h3>
              {blog.imageUrl && (
                <img
                  src={blog.imageUrl}
                  alt={blog.title}
                  className="w-full h-auto mb-4 rounded"
                />
              )}
              <div
                dangerouslySetInnerHTML={{ __html: blog.content }}
                className="text-gray-700"
              />
              <button
                onClick={() => handleEdit(blog)}
                className="bg-yellow-500 text-white px-4 py-2 rounded mr-4"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(blog._id)}
                className="bg-red-600 text-white px-4 py-2 rounded"
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default BlogManager;
