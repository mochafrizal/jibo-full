import React from 'react';
import { useFetchGetAllProductsQuery } from '../../redux/features/product/productApi';
import { Link } from 'react-router-dom';
import { BsArrowRight } from "react-icons/bs";
import { motion } from "framer-motion";

const Product = () => {
    const { data, error, isLoading } = useFetchGetAllProductsQuery();
    const products = data?.products?.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) || [];

    const getImageUrl = (image) => {
        return `https://jibo-full-backend.vercel.app/${image}`;
    };

    const LoadingSkeleton = () => (
        <div className="space-y-8">
            {[1, 2, 3].map((item) => (
                <div
                    key={item}
                    className="relative flex w-full max-w-[72rem] mx-auto h-[400px] rounded-xl bg-gray-700 animate-pulse"
                />
            ))}
        </div>
    );

    return (
        <section
            id="product"
            className="bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden py-28 px-6"
        >
            <div className="border-x border-gray-400 w-4/5 h-full absolute left-1/2 transform -translate-x-1/2 opacity-20 lg:w-1/2 xl:w-1/3 pointer-events-none" />
            <div className="border-l border-gray-400 w-full h-full absolute top-0 transform translate-x-1/2 opacity-20 pointer-events-none" />

            <div className="container mx-auto">
                <div className="product__top flex flex-col items-center text-center gap-3 xl:gap-5">
                    <h2 className="text-4xl font-extrabold text-white">
                        Temukan Produk Kami
                    </h2>
                    <h4 className="text-xl text-gray-300">Produk Terbaru</h4>
                </div>

                {isLoading ? (
                    <LoadingSkeleton />
                ) : error ? (
                    <div className="text-red-500 text-center mt-16">
                        {error?.data?.message || 'Terjadi kesalahan. Silakan coba lagi nanti.'}
                    </div>
                ) : (
                    <div
                        className="grid grid-cols-1 gap-10 mt-16">
                        {products.map((product) => (
                            <motion.div
                                key={product._id}
                                className="relative flex w-full max-w-[72rem] mx-auto flex-col md:flex-row rounded-xl bg-gray-400 bg-clip-border text-gray-900 shadow-md hover:shadow-lg transition-shadow"
                                initial={{ opacity: 0, y: 100 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1 }}
                            >
                                <div className="relative m-0 h-96 md:h-[400px] w-full md:w-3/4 shrink-0 overflow-hidden rounded-xl md:rounded-r-none bg-white bg-clip-border">
                                    <img
                                        src={product?.image ? getImageUrl(product.image) : 'https://via.placeholder.com/800x600?text=Tidak+Ada+Gambar'}
                                        alt={product?.name || 'Gambar Produk'}
                                        onError={(e) => {
                                            e.target.src = 'https://via.placeholder.com/800x600?text=Tidak+Ada+Gambar';
                                        }}
                                        className="h-full w-full object-cover object-center transition-transform hover:scale-105"
                                    />
                                </div>

                                <div className="p-6 w-full md:w-1/4 flex flex-col justify-between ml-3">
                                    <div>
                                        <h4 className="mb-2 block font-sans text-2xl text-center font-semibold leading-snug tracking-normal text-black">
                                            {product.name || 'Produk Tanpa Nama'}
                                        </h4>
                                        <hr className='mb-14 bg-red-700' />
                                        <h6 className="mb-4 block font-sans text-lg font-bold leading-relaxed tracking-normal text-black">
                                            Rp. {product.price.toLocaleString('id-ID')}
                                        </h6>
                                        <p className="mb-4 block font-sans text-lg font-bold leading-relaxed text-black">
                                            {product.stock > 0 ? (
                                                <span className="text-black">Stok: {product.stock}</span>
                                            ) : (
                                                <span className="text-red-500">Stok Habis</span>
                                            )}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default Product;