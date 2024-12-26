import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import {
    useFetchGetAllProductsQuery,
    useDeleteProductMutation,
    useUpdateProductMutation
} from "../../../redux/features/product/productApi";

const ProductsMenege = () => {
    const navigate = useNavigate();
    const { admin } = useSelector((state) => state.auth);
    const { data: productsData, isLoading: isLoadingProducts, refetch } = useFetchGetAllProductsQuery();
    const [deleteProduct] = useDeleteProductMutation();
    const [updateProduct] = useUpdateProductMutation();

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [editForm, setEditForm] = useState({
        name: '',
        price: '',
        stock: '',
        image: null
    });
    const [imagePreview, setImagePreview] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (!admin) {
            navigate('/login');
        }
    }, [admin, navigate]);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                await deleteProduct(id).unwrap();
                alert('Product deleted successfully');
                refetch();
            } catch (error) {
                console.error('Error deleting product:', error);
                setMessage('Failed to delete product');
            }
        }
    };

    const openEditModal = (product) => {
        setEditingProduct(product);
        setEditForm({
            name: product.name,
            price: product.price,
            stock: product.stock,
            image: null
        });
        setImagePreview('');
        setIsEditModalOpen(true);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setEditForm(prev => ({ ...prev, image: file }));
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append('name', editForm.name);
            formData.append('price', editForm.price);
            formData.append('stock', editForm.stock);
            if (editForm.image) {
                formData.append('image', editForm.image);
            }

            await updateProduct({
                id: editingProduct._id,
                formData: formData
            }).unwrap();

            alert('Product updated successfully');
            setIsEditModalOpen(false);
            refetch();
        } catch (error) {
            console.error('Error updating product:', error);
            setMessage('Failed to update product');
        }
    };

    if (isLoadingProducts) {
        return <div className="text-center p-8">Loading products...</div>;
    }

    return (
        <div className="bg-white p-4 md:p-8">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold">Manage Products</h2>
                <button
                    onClick={() => navigate('/dashboard/upload-product')}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
                >
                    Add New Product
                </button>
            </div>

            {message && <p className="text-red-500 mb-4">{message}</p>}

            {/* Products Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="px-6 py-3 border-b text-left">No</th>
                            <th className="px-6 py-3 border-b text-left">Name</th>
                            <th className="px-6 py-3 border-b text-left">Price</th>
                            <th className="px-6 py-3 border-b text-left">Stock</th>
                            <th className="px-6 py-3 border-b text-center">Created At</th>
                            <th className="px-6 py-3 border-b text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productsData?.products
                            .slice()
                            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                            .map((product, index) => (
                                <tr key={product._id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 border-b">{index + 1}</td>
                                    <td className="px-6 py-4 border-b">{product.name}</td>
                                    <td className="px-6 py-4 border-b">Rp{product.price}</td>
                                    <td className="px-6 py-4 border-b">{product.stock}</td>
                                    <td className="px-6 py-4 border-b text-center">
                                        {new Date(product.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 border-b">
                                        <button
                                            onClick={() => openEditModal(product)}
                                            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded mr-2"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(product._id)}
                                            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>

            {/* Edit Modal */}
            {isEditModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg p-6 max-w-2xl w-full">
                        <h3 className="text-xl font-semibold mb-4">Edit Product</h3>
                        <form onSubmit={handleUpdate} className="space-y-4">
                            <div>
                                <label className="block font-medium mb-1">Name:</label>
                                <input
                                    type="text"
                                    value={editForm.name}
                                    onChange={(e) => setEditForm(prev => ({ ...prev, name: e.target.value }))}
                                    className="w-full bg-gray-100 border border-gray-300 rounded px-3 py-2"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block font-medium mb-1">Price:</label>
                                <input
                                    type="number"
                                    value={editForm.price}
                                    onChange={(e) => setEditForm(prev => ({ ...prev, price: e.target.value }))}
                                    className="w-full bg-gray-100 border border-gray-300 rounded px-3 py-2"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block font-medium mb-1">Stock:</label>
                                <input
                                    type="number"
                                    value={editForm.stock}
                                    onChange={(e) => setEditForm(prev => ({ ...prev, stock: e.target.value }))}
                                    className="w-full bg-gray-100 border border-gray-300 rounded px-3 py-2"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block font-medium mb-1">Image:</label>
                                <input
                                    type="file"
                                    onChange={handleImageChange}
                                    accept="image/*"
                                    className="w-full"
                                />
                                {imagePreview ? (
                                    <img
                                        src={imagePreview}
                                        alt="Preview"
                                        className="mt-2 max-w-full h-auto max-h-40"
                                    />
                                ) : (
                                    <img
                                        src={`${import.meta.env.VITE_API_BASE_URL}/uploads/${editingProduct.image}`}
                                        alt="Current"
                                        className="mt-2 max-w-full h-auto max-h-40"
                                    />
                                )}
                            </div>
                            <div className="flex justify-end gap-4 mt-6">
                                <button
                                    type="button"
                                    onClick={() => setIsEditModalOpen(false)}
                                    className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductsMenege;