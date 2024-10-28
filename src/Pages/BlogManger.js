import React, { useState, useEffect, useRef } from "react";
import JoditEditor from "jodit-react";
import axios from "axios";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

const BlogManager = () => {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [blogs, setBlogs] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editBlogId, setEditBlogId] = useState(null);

  const [srcImage, setSrcImage] = useState(null);
  const [crop, setCrop] = useState({ aspect: 16 / 9 });
  const [croppedImageUrl, setCroppedImageUrl] = useState(null);
  const [completedCrop, setCompletedCrop] = useState(null);

  const editor = useRef(null);
  const imageRef = useRef(null);

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
      console.error(err);
      setError("Failed to fetch blogs");
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const uploadImageToCloudinary = async (imageBase64) => {
    const formData = new FormData();
    formData.append("file", imageBase64);
    formData.append("upload_preset", "your_cloudinary_upload_preset");

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/your_cloudinary_cloud_name/image/upload",
        formData
      );
      return response.data.secure_url;
    } catch (error) {
      console.error("Error uploading image to Cloudinary:", error);
      return null;
    }
  };

  const handleCreate = async () => {
    if (!title || !content) {
      setError("Title and content are required");
      return;
    }

    setLoading(true);
    setError("");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);

    if (croppedImageUrl) {
      formData.append("images", croppedImageUrl);
    }

    try {
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
        fetchBlogs();
        resetForm();
      } else {
        throw new Error("Failed to create blog");
      }
    } catch (err) {
      console.error(err);
      setError("Error submitting blog");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    if (!title || !content) {
      setError("Title and content are required");
      return;
    }

    setLoading(true);
    setError("");

    const existingImages = extractImageUrlsFromContent(content);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    console.log(title);
    console.log(content);
    

    if (croppedImageUrl) {
      formData.append("images", croppedImageUrl);
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/blogs/${editBlogId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
          body: formData,
        }
      );
      const respons = await response.json();

      if (response.ok) {
        fetchBlogs();
        setIsEditing(false);
        setEditBlogId(null);
        
        setError("");
      } else {
        throw new Error(respons.message || "Failed to update product");
      }
    } catch (err) {
      console.error(err);
      setError("Error updating product: " + err.message);
    } finally {
      setLoading(false);
    }
  };


  const resetForm = () => {
    setTitle("");
    setContent("");
    setIsEditing(false);
    setEditBlogId(null);
    setSrcImage(null);
    setCroppedImageUrl(null);
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

  const handleEdit = (blog) => {
    setTitle(blog.title);
    setContent(blog.content);
    setEditBlogId(blog._id);
    setIsEditing(true);
  };

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setSrcImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleCropComplete = async (crop) => {
    setCompletedCrop(crop);
    if (imageRef.current && crop.width && crop.height) {
      const canvas = document.createElement("canvas");
      const scaleX = imageRef.current.naturalWidth / imageRef.current.width;
      const scaleY = imageRef.current.naturalHeight / imageRef.current.height;
      canvas.width = crop.width;
      canvas.height = crop.height;
      const ctx = canvas.getContext("2d");

      ctx.drawImage(
        imageRef.current,
        crop.x * scaleX,
        crop.y * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        0,
        0,
        crop.width,
        crop.height
      );

      const croppedUrl = canvas.toDataURL("image/jpeg");
      setCroppedImageUrl(croppedUrl);

      const uploadedImageUrl = await uploadImageToCloudinary(croppedUrl);
      if (uploadedImageUrl) {
        setContent(content + `<img src="${uploadedImageUrl}" alt="Blog Image" />`);
      }
    }
  };

  const extractImageUrlsFromContent = (htmlContent) => {
    const imgRegex = /<img[^>]+src="([^">]+)"/g;
    let matches;
    const imageUrls = [];
    while ((matches = imgRegex.exec(htmlContent)) !== null) {
      imageUrls.push(matches[1]);
    }
    return imageUrls;
  };

  const deleteImagesFromCloudinary = async (imageUrls) => {
    for (const url of imageUrls) {
      const publicId = extractPublicIdFromUrl(url);
      await axios.delete(
        `https://api.cloudinary.com/v1_1/your_cloudinary_cloud_name/image/destroy`,
        {
          params: { public_id: publicId },
        }
      );
    }
  };

  const extractPublicIdFromUrl = (url) => {
    const parts = url.split("/");
    const publicIdWithExtension = parts[parts.length - 1];
    return publicIdWithExtension.split(".")[0];
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6 text-center">
        {isEditing ? "Update Blog" : "Write a Blog"}
      </h2>
      {error && <div className="text-red-500 mb-4">{error}</div>}

      <input
        type="text"
        placeholder="Blog Title"
        className="p-3 border border-gray-300 rounded-lg w-full mb-4"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <JoditEditor
        ref={editor}
        value={content}
        config={config}
        tabIndex={1}
        onBlur={(newContent) => setContent(newContent)}
        onChange={() => {}}
      />

      <input
        type="file"
        accept="image/*"
        onChange={handleImageSelect}
        className="mt-4"
      />
      {srcImage && (
        <ReactCrop
          src={srcImage}
          crop={crop}
          onChange={(newCrop) => setCrop(newCrop)}
          onComplete={handleCropComplete}
          ref={imageRef}

        />
      )}
      <button
        className="bg-blue-500 text-white py-2 px-4 rounded mt-4"
        onClick={isEditing ? handleUpdate : handleCreate}
        disabled={loading}
      >
        {loading ? "Loading..." : isEditing ? "Update Blog" : "Create Blog"}
      </button>

      <h2 className="text-2xl font-bold mt-8 mb-4">Blogs</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {blogs.map((blog) => (
          <div key={blog._id} className="border border-gray-300 p-4 rounded-lg">
            <h3 className="text-xl font-semibold">{blog.title}</h3>
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