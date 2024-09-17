import React, { useState, useEffect } from "react";

// Product List Component
const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    shortDescription: "", // Change shortDesc to shortDescription
    longDescription: "", // Change longDesc to longDescription
    image: "", // Add image field
    available: true,
  });

  const [editProduct, setEditProduct] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch all products
  const fetchProducts = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/products", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch products");
    }
  };
  // Create a new product
  const createProduct = async () => {
    if (!newProduct.name || !newProduct.price) {
      setError("Name and price are required");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("http://localhost:5000/api/products/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(newProduct),
      });

      // Debugging: log response
      const response = await res.json();
      console.log("Create Product Response: ", response);

      if (res.ok) {
        fetchProducts(); // Refresh the product list
        setNewProduct({
          name: "",
          price: "",
          shortDesc: "",
          longDesc: "",
          available: true,
        });
        setError(""); // Clear error
      } else {
        setError("Failed to create product");
      }
    } catch (err) {
      console.error(err);
      setError("Error creating product");
    } finally {
      setLoading(false);
    }
  };

  // Update a product
  const updateProduct = async (id) => {
    try {
      setLoading(true);
      const res = await fetch(`http://localhost:5000/api/products/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(editProduct),
      });

      // Debugging: log response
      const response = await res.json();
      console.log("Update Product Response: ", response);

      if (res.ok) {
        fetchProducts();
        setIsEditing(false);
        setEditProduct(null);
        setError(""); // Clear error
      } else {
        setError("Failed to update product");
      }
    } catch (err) {
      console.error(err);
      setError("Error updating product");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Delete a product
  const deleteProduct = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/products/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.ok) {
        fetchProducts();
      } else {
        setError("Failed to delete product");
      }
    } catch (err) {
      console.error(err);
      setError("Error deleting product");
    }
  };

  // Handle edit button click
  const handleEdit = (product) => {
    setIsEditing(true);
    setEditProduct(product);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Products</h2>

      {/* Error Message */}
      {error && <div className="text-red-500 mb-4">{error}</div>}

      {/* Create or Edit Form */}
      <div className="mb-6">
        <h3 className="text-xl font-bold mb-4">
          {isEditing ? "Edit Product" : "Create New Product"}
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Product Name"
            className="p-2 border border-gray-300 rounded"
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
            className="p-2 border border-gray-300 rounded"
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
            className="p-2 border border-gray-300 rounded"
            value={
              isEditing
                ? editProduct?.shortDescription
                : newProduct.shortDescription
            }
            onChange={(e) =>
              isEditing
                ? setEditProduct({
                    ...editProduct,
                    shortDescription: e.target.value,
                  })
                : setNewProduct({
                    ...newProduct,
                    shortDescription: e.target.value,
                  })
            }
          />

          <input
            type="text"
            placeholder="Long Description"
            className="p-2 border border-gray-300 rounded"
            value={
              isEditing
                ? editProduct?.longDescription
                : newProduct.longDescription
            }
            onChange={(e) =>
              isEditing
                ? setEditProduct({
                    ...editProduct,
                    longDescription: e.target.value,
                  })
                : setNewProduct({
                    ...newProduct,
                    longDescription: e.target.value,
                  })
            }
          />

          <input
            type="text"
            placeholder="Image URL"
            className="p-2 border border-gray-300 rounded"
            value={isEditing ? editProduct?.image : newProduct.image}
            onChange={(e) =>
              isEditing
                ? setEditProduct({ ...editProduct, image: e.target.value })
                : setNewProduct({ ...newProduct, image: e.target.value })
            }
          />

          <select
            value={isEditing ? editProduct?.available : newProduct.available}
            onChange={(e) =>
              isEditing
                ? setEditProduct({
                    ...editProduct,
                    available: e.target.value === "true",
                  })
                : setNewProduct({
                    ...newProduct,
                    available: e.target.value === "true",
                  })
            }
            className="p-2 border border-gray-300 rounded"
          >
            <option value="true">Available</option>
            <option value="false">Not Available</option>
          </select>
        </div>
        <button
          onClick={
            isEditing ? () => updateProduct(editProduct._id) : createProduct
          }
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
          disabled={loading}
        >
          {isEditing ? "Update Product" : "Create Product"}
        </button>
      </div>

      {/* Product List */}
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Price</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td className="border px-4 py-2">{product.name}</td>
              <td className="border px-4 py-2">${product.price}</td>
              <td className="border px-4 py-2">
                {product.available ? "Available" : "Not Available"}
              </td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => handleEdit(product)}
                  className="bg-yellow-500 text-white px-4 py-1 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteProduct(product._id)}
                  className="bg-red-500 text-white px-4 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
