import React, { useState, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import Quill's CSS
import axios from "axios";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css"; // Image cropping library
import "quill/dist/quill.snow.css";
import "./css/customFonts.css"; // Custom CSS file for fonts

const BlogEditor = () => {
  const [content, setContent] = useState(""); // Store blog content
  const [title, setTitle] = useState(""); // Store blog title
  const [images, setImages] = useState([]); // Store blog images
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [crop, setCrop] = useState({ aspect: 16 / 9 }); // Default crop aspect ratio
  const [croppedImage, setCroppedImage] = useState(null); // Store cropped image
  const [srcImage, setSrcImage] = useState(null); // Store original image to be cropped
  const [completedCrop, setCompletedCrop] = useState(null); // Store final crop object

  const quillRef = useRef(null); // Quill reference

  const customFonts = ["Arial", "Georgia", "Courier", "Roboto", "Lobster"];
  const Font = ReactQuill.Quill.import("formats/font");
  Font.whitelist = customFonts; // Register custom fonts
  ReactQuill.Quill.register(Font, true);

  // Quill toolbar options with additional font styles
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

  // Handle blog submission
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
        setTitle("");
        setContent("");
        setImages([]);
        alert("Blog created successfully!");
      } else {
        throw new Error(response.data.message || "Failed to create blog");
      }
    } catch (err) {
      console.error(err);
      setError("Error creating blog");
    } finally {
      setLoading(false);
    }
  };

  // Handle image upload and cropping
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setSrcImage(reader.result); // Store the image URL for cropping
    };

    reader.readAsDataURL(file);
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

  // Insert cropped image into the editor
  const handleImageInsert = async () => {
    if (completedCrop) {
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

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6 text-center">Write a Blog</h2>
      {error && <div className="text-red-500 mb-4">{error}</div>}

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
        placeholder="Write your blog content here..."
        className="bg-white border-separate border-black"
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
        {loading ? "Submitting..." : "Submit Blog"}
      </button>
    </div>
  );
};

export default BlogEditor;
