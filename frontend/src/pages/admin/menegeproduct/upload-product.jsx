import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { useCreateProductMutation } from "../../../redux/features/product/productApi";

const UploadProduct = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState('');
    const [message, setMessage] = useState('');

    const [createProduct, { isLoading }] = useCreateProductMutation();
    const { admin } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (!admin) {
            navigate('/login');
        }
    }, [admin, navigate]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('price', price);
            formData.append('stock', stock);

            if (image) {
                formData.append('image', image);
            }

            const response = await createProduct(formData).unwrap();
            console.log('Response:', response);
            alert('Product successfully created');
            navigate('/dashboard');
        } catch (error) {
            console.error('Error:', error);
            setMessage(error.data?.error || 'Failed to create product, please try again');
        }
    };

    return (
        <div className="bg-white md:p-8 p-2">
            <h2 className="text-2xl font-semibold">Create New Product</h2>
            <form onSubmit={handleSubmit} className="space-y-5 pt-8">
                <div className="space-y-4">
                    <label className="font-semibold text-xl">Product Name:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-gray-100 focus:outline-none px-5 py-3"
                        placeholder="Enter product name..."
                        required
                    />
                </div>

                <div className="space-y-4">
                    <label className="font-semibold text-xl">Price:</label>
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="w-full bg-gray-100 focus:outline-none px-5 py-3"
                        placeholder="Enter price..."
                        required
                    />
                </div>

                <div className="space-y-4">
                    <label className="font-semibold text-xl">Stock:</label>
                    <input
                        type="number"
                        value={stock}
                        onChange={(e) => setStock(e.target.value)}
                        className="w-full bg-gray-100 focus:outline-none px-5 py-3"
                        placeholder="Enter stock quantity..."
                        required
                    />
                </div>

                <div className="space-y-4">
                    <label className="font-semibold text-xl">Product Image:</label>
                    <input
                        type="file"
                        onChange={handleImageChange}
                        accept="image/*"
                        className="w-full"
                        required
                    />
                    {imagePreview && (
                        <img
                            src={imagePreview}
                            alt="Preview"
                            className="mt-2 max-w-full h-auto max-h-64"
                        />
                    )}
                </div>

                {message && <p className="text-red-500">{message}</p>}

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full mt-5 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg"
                >
                    {isLoading ? 'Creating Product...' : 'Create Product'}
                </button>
            </form>
        </div>
    );
};

export default UploadProduct;