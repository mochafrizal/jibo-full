import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { RiArrowLeftLine, RiArrowRightLine } from 'react-icons/ri';
import { FiPhone } from 'react-icons/fi';

import 'swiper/css';
// Import gambar
import Img1 from '../assets/hero-carousel/img1.jpg';
import Img2 from '../assets/hero-carousel/img2.jpg';
import Img3 from '../assets/hero-carousel/img3.jpg';
import Img4 from '../assets/hero-carousel/img4.jpg';

const Hero = () => {
    const swiperRef = useRef(null);

    // Array gambar untuk carousel
    const carouselImages = [Img1, Img2, Img3, Img4];
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: 1.2,
                ease: "easeOut",
                staggerChildren: 0.3,
                delayChildren: 0.4
            }
        },
    };

    const leftItemVariants = {
        hidden: {
            x: '-100%',
            opacity: 0,
            rotate: -5
        },
        visible: {
            x: 0,
            opacity: 1,
            rotate: 0,
            transition: {
                type: 'spring',
                stiffness: 60,
                damping: 15,
                duration: 1
            }
        },
    };

    const rightItemVariants = {
        hidden: {
            x: '100%',
            opacity: 0,
            scale: 0.8
        },
        visible: {
            x: 0,
            opacity: 1,
            scale: 1,
            transition: {
                type: 'spring',
                stiffness: 50,
                damping: 15,
                duration: 1.2
            }
        },
    };

    const textVariants = {
        hidden: {
            y: 50,
            opacity: 0
        },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: 'spring',
                stiffness: 100,
                damping: 12,
                duration: 0.8
            }
        }
    };

    return (
        <motion.div
            className="text-red-100 p-0 xl:h-full bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            <div className="flex flex-col lg:flex-row xl:h-[720px]">
                {/* Left Section */}
                <motion.div
                    className="flex flex-col justify-between lg:w-[30%] bg-transparent relative"
                    initial={{ opacity: 0, x: -300 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1 }}
                >
                    <div className="h-full flex flex-col gap-8 items-center justify-center py-12 xl:py-28 xl:gap-16 xl:max-w-xs xl:mx-auto">
                        <motion.h1
                            className="text-center text-4xl font-extrabold xl:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-700"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                        >
                            Designing <br /> & Building
                        </motion.h1>
                        <motion.h4
                            className="text-center xl:self-end text-lg text-red-200"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7, duration: 0.8 }}
                        >
                            Energy-efficient <br /> Modern Residences <br /> From 130 sq. m.
                        </motion.h4>
                        <motion.button
                            className="flex items-center justify-center gap-2 border border-red-600 py-3 px-6 rounded-lg bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg hover:shadow-2xl transition-all"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.9, duration: 0.8 }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <FiPhone size={20} />
                            Contact Us
                        </motion.button>
                    </div>

                    <motion.div
                        className="flex items-center justify-center gap-4 bg-gray-950/90 backdrop-blur-md w-full h-[100px] shadow-lg"
                        variants={textVariants}
                    >
                        <motion.div
                            id="prev"
                            className="text-lg h-12 w-12 border-2 border-red-600 rounded-full grid place-items-center cursor-pointer hover:bg-red-600 hover:text-white transition-all duration-300"
                            whileHover={{
                                scale: 1.2,
                                boxShadow: "0 0 15px rgba(220, 38, 38, 0.4)"
                            }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => swiperRef.current?.slidePrev()}
                        >
                            <RiArrowLeftLine size={24} />
                        </motion.div>
                        <motion.div
                            id="next"
                            className="text-lg h-12 w-12 border-2 border-red-600 rounded-full grid place-items-center cursor-pointer hover:bg-red-600 hover:text-white transition-all duration-300"
                            whileHover={{
                                scale: 1.2,
                                boxShadow: "0 0 15px rgba(220, 38, 38, 0.4)"
                            }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => swiperRef.current?.slideNext()}
                        >
                            <RiArrowRightLine size={24} />
                        </motion.div>
                    </motion.div>
                </motion.div>

                <motion.div
                    className="lg:w-[70%] overflow-hidden p-4"
                    variants={rightItemVariants}
                >
                    <Swiper
                        slidesPerView={1}
                        spaceBetween={10}
                        autoplay={{
                            delay: 3000,
                            disableOnInteraction: false,
                            pauseOnMouseEnter: true
                        }}
                        modules={[Autoplay]}
                        className="h-full"
                        onSwiper={(swiper) => (swiperRef.current = swiper)}
                    >
                        {carouselImages.map((image, index) => (
                            <SwiperSlide key={index}>
                                <motion.div
                                    whileHover={{ scale: 1.02 }}
                                    transition={{ duration: 0.3 }}
                                    className="h-full"
                                >
                                    <img
                                        src={image}
                                        alt={`Slide ${index + 1}`}
                                        className="block w-full h-full object-cover rounded-xl"
                                    />
                                </motion.div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default Hero;