import React from 'react';
import { useFetchGetAllPostsQuery } from '../../redux/features/post/postApi';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Posts = () => {
    const { data, error, isLoading } = useFetchGetAllPostsQuery();
    const posts = data?.posts || [];
    console.log(posts)

    const getImageUrl = (image) => {
        return `http://localhost:3000/uploads/${image}`;
    };

    // Animasi untuk container utama
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.3
            }
        }
    };

    // Animasi untuk setiap post
    const postVariants = {
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
                stiffness: 100,
                damping: 15
            }
        },
        hover: {
            y: -10,
            scale: 1.02,
            transition: {
                type: "spring",
                stiffness: 400,
                damping: 25
            }
        }
    };

    // Animasi untuk header
    const headerVariants = {
        hidden: { opacity: 0, y: -30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 20,
                duration: 1
            }
        }
    };

    // Komponen Loading Skeleton
    const LoadingSkeleton = () => (
        <div className="grid grid-cols-1 gap-10 mt-16 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((item) => (
                <motion.div
                    key={item}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="relative overflow-hidden rounded-lg shadow-lg bg-gray-800"
                >
                    <div className="w-full h-72 bg-gray-700 animate-pulse"></div>
                    <div className="p-6 space-y-3">
                        <div className="h-4 bg-gray-700 rounded animate-pulse"></div>
                        <div className="h-6 bg-gray-700 rounded animate-pulse w-3/4"></div>
                        <div className="h-4 bg-gray-700 rounded animate-pulse w-1/2"></div>
                    </div>
                </motion.div>
            ))}
        </div>
    );

    return (
        <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden py-28 px-6"
        >
            {/* Border dekoratif */}
            <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="border-x border-[#444] w-4/5 h-full absolute top-0 left-1/2 transform -translate-x-1/2 opacity-20 lg:w-1/2 xl:w-1/3 pointer-events-none"
            />
            <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="border-l border-[#444] w-full h-full absolute top-0 transform translate-x-1/2 opacity-20 pointer-events-none"
            />

            <div className="container mx-auto">
                <motion.div
                    variants={headerVariants}
                    initial="hidden"
                    animate="visible"
                    className="post__top flex flex-col items-center text-center gap-3 xl:gap-5"
                >
                    <motion.h2
                        className="text-4xl font-extrabold text-white"
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        Temukan Cerita Baru & <br />
                        Ide Menarik di Blog Kami
                    </motion.h2>
                    <motion.h4
                        className="text-xl text-gray-400"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                    >
                        Artikel Terbaru
                    </motion.h4>
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
                            className="grid grid-cols-1 gap-10 mt-16 md:grid-cols-2 lg:grid-cols-3"
                        >
                            {posts.map((post) => (
                                <motion.div
                                    key={post._id}
                                    variants={postVariants}
                                    whileHover="hover"
                                    className="post__item relative overflow-hidden rounded-lg shadow-lg"
                                >
                                    <motion.img
                                        whileHover={{ scale: 1.1 }}
                                        transition={{ duration: 0.6 }}
                                        src={post?.image ? getImageUrl(post.image) : 'https://via.placeholder.com/300?text=Tidak+Ada+Gambar'}
                                        alt={post?.title || 'Cover Artikel'}
                                        onError={(e) => {
                                            e.target.src = 'https://via.placeholder.com/300?text=Tidak+Ada+Gambar';
                                        }}
                                        className="w-full h-72 object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>

                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        whileHover={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="absolute inset-0 p-6 flex flex-col justify-end backdrop-blur-sm bg-black/30"
                                    >
                                        <motion.h2
                                            className="text-sm text-gray-300 font-light"
                                            whileHover={{ x: 5 }}
                                        >
                                            {new Date(post.createdAt).toLocaleDateString('id-ID', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })}
                                        </motion.h2>
                                        <Link to={`/posts/${post._id}`}>
                                            <motion.h4
                                                whileHover={{ x: 5, color: "#60A5FA" }}
                                                className="mt-2 text-2xl font-semibold text-white transition-colors duration-300"
                                            >
                                                {post.title || 'Artikel Tanpa Judul'}
                                            </motion.h4>
                                        </Link>
                                        <motion.p
                                            className="mt-2 text-gray-300 text-sm line-clamp-3"
                                            whileHover={{ x: 5 }}
                                        >
                                            {post?.content?.slice(0, 100) || 'Belum ada konten untuk artikel ini.'}...
                                        </motion.p>
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

export default Posts;