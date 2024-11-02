import React, { useState, useEffect } from "react";

// Product List Component
const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    shortDescription: "",
    longDescription: "",
    available: true,
  });
  const [image, setImage] = useState(null); // State to handle image file
  const [editProduct, setEditProduct] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch products from the backend
  const fetchProducts = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/products`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await res.json();
      if (res.ok) {
        setProducts(data);
      } else {
        throw new Error(data.message || "Failed to fetch products");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to fetch products");
    }
  };

  // Handle product creation
  const createProduct = async () => {
    if (!newProduct.name || !newProduct.price || !image) {
      setError("Name, price, and image are required");
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("name", newProduct.name);
      formData.append("price", newProduct.price);
      formData.append("shortDescription", newProduct.shortDescription);
      formData.append("longDescription", newProduct.longDescription);
      formData.append("available", newProduct.available);
      formData.append("image", image); // Append image file to FormData

      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/products`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData, // Send FormData
      });

      const response = await res.json();

      if (res.ok) {
        fetchProducts();
        setNewProduct({
          name: "",
          price: "",
          shortDescription: "",
          longDescription: "",
          available: true,
        });
        setImage(null); // Reset image
        setError("");
      } else {
        throw new Error(response.message || "Failed to create product");
      }
    } catch (err) {
      console.error(err);
      setError("Error creating product: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle product updates
  const updateProduct = async (id) => {
    if (!editProduct.name || !editProduct.price) {
      setError("Name and price are required for update");
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("name", editProduct.name);
      formData.append("price", editProduct.price);
      formData.append("shortDescription", editProduct.shortDescription);
      formData.append("longDescription", editProduct.longDescription);
      formData.append("available", editProduct.available);
      if (image) formData.append("image", image); // Append image if updating

      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/products/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      });

      const response = await res.json();

      if (res.ok) {
        fetchProducts();
        setIsEditing(false);
        setEditProduct(null);
        setImage(null); // Reset image
        setError("");
      } else {
        throw new Error(response.message || "Failed to update product");
      }
    } catch (err) {
      console.error(err);
      setError("Error updating product: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle product deletion
  const deleteProduct = async (id) => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/products/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.ok) {
        fetchProducts();
      } else {
        throw new Error("Failed to delete product");
      }
    } catch (err) {
      console.error(err);
      setError("Error deleting product: " + err.message);
    }
  };

  // Set the product to edit mode
  const handleEdit = (product) => {
    setIsEditing(true);
    setEditProduct(product);
  };

  // Initial product load
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6 text-center">Product Management</h2>

      {error && <div className="text-red-500 mb-4">{error}</div>}

      {/* Create or Edit Form */}
      <div className="bg-gray-100 p-6 rounded-lg shadow-lg mb-8">
        <h3 className="text-xl font-semibold mb-4">
          {isEditing ? "Edit Product" : "Create New Product"}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Product Name"
            className="p-3 border border-gray-300 rounded-lg w-full"
            value={isEditing ? editProduct?.name : newProduct.name}
            onChange={(e) =>
              isEditing
                ? setEditProduct({ ...editProduct, name: e.target.value })
                : setNewProduct({ ...newProduct, name: e.target.value })
            }
          />
          <input
            type="number"
            placeholder="Price"
            className="p-3 border border-gray-300 rounded-lg w-full"
            value={isEditing ? editProduct?.price : newProduct.price}
            onChange={(e) =>
              isEditing
                ? setEditProduct({ ...editProduct, price: e.target.value })
                : setNewProduct({ ...newProduct, price: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Short Description"
            className="p-3 border border-gray-300 rounded-lg w-full"
            value={isEditing ? editProduct?.shortDescription : newProduct.shortDescription}
            onChange={(e) =>
              isEditing
                ? setEditProduct({ ...editProduct, shortDescription: e.target.value })
                : setNewProduct({ ...newProduct, shortDescription: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Long Description"
            className="p-3 border border-gray-300 rounded-lg w-full"
            value={isEditing ? editProduct?.longDescription : newProduct.longDescription}
            onChange={(e) =>
              isEditing
                ? setEditProduct({ ...editProduct, longDescription: e.target.value })
                : setNewProduct({ ...newProduct, longDescription: e.target.value })
            }
          />
          {/* File input for Image Upload */}
          <input
            type="file"
            className="p-3 border border-gray-300 rounded-lg w-full"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])} // Update image state
          />
          <select
            value={isEditing ? editProduct?.available : newProduct.available}
            onChange={(e) =>
              isEditing
                ? setEditProduct({ ...editProduct, available: e.target.value === "true" })
                : setNewProduct({ ...newProduct, available: e.target.value === "true" })
            }
            className="p-3 border border-gray-300 rounded-lg w-full"
          >
            <option value="true">Available</option>
            <option value="false">Not Available</option>
          </select>
        </div>
        <button
          onClick={isEditing ? () => updateProduct(editProduct._id) : createProduct}
          className={`mt-6 w-full sm:w-auto bg-blue-600 text-white px-6 py-3 rounded-lg 
            transition-all duration-300 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
          disabled={loading}
        >
          {loading ? "Processing..." : isEditing ? "Update Product" : "Create Product"}
        </button>
      </div>

      {/* Product List - Display in Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product._id} className="bg-white shadow-lg rounded-lg p-6 flex flex-col">
            <img
              src={product.image || "https://via.placeholder.com/150"}
              alt={product.name}
              className="rounded-lg mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
            <p className="text-gray-700 mb-2">${product.price}</p>
            <p className="text-gray-600 mb-4">{product.shortDescription}</p>
            <div className="flex justify-between mt-auto">
              <button
                onClick={() => handleEdit(product)}
                className="bg-yellow-400 text-white px-4 py-2 rounded-lg"
              >
                Edit
              </button>
              <button
                onClick={() => deleteProduct(product._id)}
                className="bg-red-500 text-white px-4 py-2 rounded-lg"
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

export default ProductList;
