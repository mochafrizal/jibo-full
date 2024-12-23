import React from 'react';
import { useFetchGetAllProductsQuery } from '../../redux/features/product/productApi';
import { Link } from 'react-router-dom';
import { BsArrowRight } from "react-icons/bs";

const Product = () => {
    const { data, error, isLoading } = useFetchGetAllProductsQuery();
    const products = data?.products || [];

    const getImageUrl = (image) => {
        return `http://localhost:3000/uploads/${image}`;
    };

    return (
        <section
            id="product"
            className="bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden py-28 px-6"
        >
            {/* Decorative Borders */}
            <div className="border-x border-gray-400 w-4/5 h-full absolute left-1/2 transform -translate-x-1/2 opacity-20 lg:w-1/2 xl:w-1/3 pointer-events-none"></div>
            <div className="border-l border-gray-400 w-full h-full absolute top-0 transform translate-x-1/2 opacity-20 pointer-events-none"></div>

            <div className="container mx-auto">
                {/* Product Section Header */}
                <div className="product__top flex flex-col items-center text-center gap-3 xl:gap-5">
                    <h2 className="text-4xl font-extrabold text-white">
                        Discover Our Products
                    </h2>
                    <h4 className="text-xl text-gray-300">Latest Products</h4>
                </div>

                {/* Product Grid */}
                <div className="grid grid-cols-1 gap-10 mt-16">
                    {isLoading && <h2 className="text-2xl font-bold text-center text-black">Loading...</h2>}
                    {error && (
                        <div className="text-red-500 text-center col-span-full">
                            {error?.data?.message || 'Something went wrong. Please try again later.'}
                        </div>
                    )}
                    {!isLoading && products.length === 0 && (
                        <div className="col-span-full text-center text-gray-500">No products found.</div>
                    )}

                    {/* Product Items */}
                    {products.map((product) => (
                        <div
                            key={product._id}
                            className="relative flex w-full max-w-[72rem] mx-auto flex-col md:flex-row rounded-xl bg-gray-400 bg-clip-border text-gray-900 shadow-md"
                        >
                            {/* Image Section - Increased width */}
                            <div className="relative m-0 h-96 md:h-[400px] w-full md:w-3/4 shrink-0 overflow-hidden rounded-xl md:rounded-r-none bg-white bg-clip-border">
                                <img
                                    src={
                                        product?.image
                                            ? getImageUrl(product.image)
                                            : 'https://via.placeholder.com/800x600?text=No+Image'
                                    }
                                    alt={product?.name || 'Product Image'}
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = 'https://via.placeholder.com/800x600?text=No+Image';
                                    }}
                                    className="h-full w-full object-cover object-center"
                                />
                            </div>

                            {/* Content Section - Decreased width */}
                            <div className="p-6 w-full md:w-1/4 flex flex-col justify-between">
                                <div>
                                    <h4 className="mb-2 block font-sans text-2xl font-semibold leading-snug tracking-normal text-black">
                                        {product.name || 'Untitled Product'}
                                    </h4>
                                    <h6 className="mb-4 block font-sans text-lg font-semibold leading-relaxed tracking-normal text-gray-700">
                                        Rp.{' '}{product.price.toFixed(2)}
                                    </h6>
                                    <p className="mb-4 block font-sans text-base font-normal leading-relaxed text-black">
                                        {product.stock > 0 ? (
                                            <span className="text-black">In Stock: {product.stock}</span>
                                        ) : (
                                            <span className="text-red-500">Out of stock</span>
                                        )}
                                    </p>
                                </div>

                                <Link
                                    to={`/product/${product._id}`}
                                    className="inline-block mt-auto"
                                >
                                    <button
                                        className="flex select-none items-center gap-2 rounded-lg py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-gray-300 transition-all hover:bg-gray-700 hover:text-white active:bg-gray-900 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                        type="button"
                                    >
                                        Learn More
                                        <BsArrowRight className="h-4 w-4" />
                                    </button>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Product;
