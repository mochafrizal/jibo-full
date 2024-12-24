import React from 'react';
import { useFetchGetAllProductsQuery } from '../../redux/features/product/productApi';
import { Link } from 'react-router-dom';
import { BsArrowRight } from "react-icons/bs";
import { motion, AnimatePresence } from 'framer-motion';

const Product = () => {
    const { data, error, isLoading } = useFetchGetAllProductsQuery();
    const products = data?.products || [];

    const getImageUrl = (image) => {
        return `http://localhost:3000/uploads/${image}`;
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const productVariants = {
        hidden: {
            opacity: 0,
            y: 50,
            scale: 0.95
        },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                type: "spring",
                damping: 20,
                stiffness: 100
            }
        },
        hover: {
            scale: 1.02,
            transition: {
                type: "spring",
                damping: 15
            }
        }
    };

    const LoadingSkeleton = () => (
        <div className="space-y-8">
            {[1, 2, 3].map((item) => (
                <motion.div
                    key={item}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="relative flex w-full max-w-[72rem] mx-auto h-[400px] rounded-xl bg-gray-700 animate-pulse"
                />
            ))}
        </div>
    );

    return (
        <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            id="product"
            className="bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden py-28 px-6"
        >
            <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.2 }}
                className="border-x border-gray-400 w-4/5 h-full absolute left-1/2 transform -translate-x-1/2 opacity-20 lg:w-1/2 xl:w-1/3 pointer-events-none"
            />
            <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.2 }}
                className="border-l border-gray-400 w-full h-full absolute top-0 transform translate-x-1/2 opacity-20 pointer-events-none"
            />

            <div className="container mx-auto">
                <motion.div
                    initial={{ y: -30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, type: "spring" }}
                    className="product__top flex flex-col items-center text-center gap-3 xl:gap-5"
                >
                    <h2 className="text-4xl font-extrabold text-white">
                        Temukan Produk Kami
                    </h2>
                    <h4 className="text-xl text-gray-300">Produk Terbaru</h4>
                </motion.div>

                <AnimatePresence mode="wait">
                    {isLoading ? (
                        <LoadingSkeleton />
                    ) : error ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="text-red-500 text-center mt-16"
                        >
                            {error?.data?.message || 'Terjadi kesalahan. Silakan coba lagi nanti.'}
                        </motion.div>
                    ) : (
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            className="grid grid-cols-1 gap-10 mt-16"
                        >
                            {products.map((product) => (
                                <motion.div
                                    key={product._id}
                                    variants={productVariants}
                                    whileHover="hover"
                                    className="relative flex w-full max-w-[72rem] mx-auto flex-col md:flex-row rounded-xl bg-gray-400 bg-clip-border text-gray-900 shadow-md"
                                >
                                    <motion.div
                                        className="relative m-0 h-96 md:h-[400px] w-full md:w-3/4 shrink-0 overflow-hidden rounded-xl md:rounded-r-none bg-white bg-clip-border"
                                        whileHover={{ scale: 1.05 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <img
                                            src={product?.image ? getImageUrl(product.image) : 'https://via.placeholder.com/800x600?text=Tidak+Ada+Gambar'}
                                            alt={product?.name || 'Gambar Produk'}
                                            onError={(e) => {
                                                e.target.src = 'https://via.placeholder.com/800x600?text=Tidak+Ada+Gambar';
                                            }}
                                            className="h-full w-full object-cover object-center"
                                        />
                                    </motion.div>

                                    <motion.div
                                        className="p-6 w-full md:w-1/4 flex flex-col justify-between"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.2 }}
                                    >
                                        <div>
                                            <motion.h4
                                                whileHover={{ x: 5 }}
                                                className="mb-2 block font-sans text-2xl font-semibold leading-snug tracking-normal text-black"
                                            >
                                                {product.name || 'Produk Tanpa Nama'}
                                            </motion.h4>
                                            <motion.h6
                                                whileHover={{ scale: 1.05 }}
                                                className="mb-4 block font-sans text-lg font-semibold leading-relaxed tracking-normal text-gray-700"
                                            >
                                                Rp. {product.price.toLocaleString('id-ID')}
                                            </motion.h6>
                                            <motion.p className="mb-4 block font-sans text-base font-normal leading-relaxed text-black">
                                                {product.stock > 0 ? (
                                                    <span className="text-black">Stok: {product.stock}</span>
                                                ) : (
                                                    <span className="text-red-500">Stok Habis</span>
                                                )}
                                            </motion.p>
                                        </div>

                                        <Link to={`/product/${product._id}`} className="inline-block mt-auto">
                                            <motion.button
                                                whileHover={{ scale: 1.05, backgroundColor: "#374151" }}
                                                whileTap={{ scale: 0.95 }}
                                                className="flex select-none items-center gap-2 rounded-lg py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-gray-300 transition-all hover:text-white active:bg-gray-900 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                                type="button"
                                            >
                                                Lihat Detail
                                                <motion.span
                                                    whileHover={{ x: 5 }}
                                                    transition={{ type: "spring", stiffness: 400 }}
                                                >
                                                    <BsArrowRight className="h-4 w-4" />
                                                </motion.span>
                                            </motion.button>
                                        </Link>
                                    </motion.div>
                                </motion.div>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.section>
    );
};

export default Product;