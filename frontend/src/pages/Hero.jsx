import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { RiArrowLeftLine, RiArrowRightLine } from 'react-icons/ri';
import { FiPhone } from 'react-icons/fi';

// Import Swiper styles
import 'swiper/css';

// Image assets
import Img1 from '../assets/hero-carousel/img1.jpg';
import Img2 from '../assets/hero-carousel/img2.jpg';
import Img3 from '../assets/hero-carousel/img3.jpg';
import Img4 from '../assets/hero-carousel/img4.jpg';

const Hero = () => {
    const swiperRef = useRef(null); // Reference untuk Swiper

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.8,
                staggerChildren: 0.2,
                delayChildren: 0.3
            }
        },
    };

    const leftItemVariants = {
        hidden: { x: '-100vw', opacity: 0 },
        visible: {
            x: 0,
            opacity: 1,
            transition: {
                type: 'spring',
                stiffness: 80,
                damping: 20
            }
        },
    };

    const rightItemVariants = {
        hidden: { x: '100vw', opacity: 0 },
        visible: {
            x: 0,
            opacity: 1,
            scale: [0.8, 1],
            transition: {
                type: 'spring',
                stiffness: 80,
                damping: 20,
                duration: 0.8
            }
        },
    };

    return (
        <motion.div
            className="text-white p-0 xl:h-full bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            <div className="flex flex-col lg:flex-row xl:h-[720px]">

                {/* Left Section */}
                <motion.div
                    className="flex flex-col justify-between lg:w-[30%] bg-gradient-to-br from-gray-900 to-gray-800"
                    variants={leftItemVariants}
                >
                    <div className="h-full flex flex-col gap-8 items-center justify-center py-12 xl:py-28 xl:gap-16 xl:max-w-xs xl:mx-auto">
                        <motion.h1
                            className="text-center text-4xl font-extrabold xl:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600"
                        >
                            Designing <br /> & Building
                        </motion.h1>
                        <motion.h4
                            className="text-center xl:self-end text-lg text-gray-200"
                        >
                            Energy-efficient <br /> Modern Residences <br /> From 130 sq. m.
                        </motion.h4>
                        <motion.button
                            className="flex items-center justify-center gap-2 border border-blue-500 py-3 px-6 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg hover:scale-105 hover:shadow-2xl transition-all"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <FiPhone size={20} />
                            Contact Us
                        </motion.button>
                    </div>

                    <motion.div
                        className="flex items-center justify-center gap-4 bg-gray-800/90 backdrop-blur-md w-full h-[100px] shadow-lg"
                    >
                        {/* Tombol Navigasi */}
                        <motion.div
                            id="prev"
                            className="text-lg h-12 w-12 border-2 border-blue-500 rounded-full grid place-items-center cursor-pointer hover:bg-blue-500 hover:text-white transition-all"
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => swiperRef.current?.slidePrev()} // Pindah ke slide sebelumnya
                        >
                            <RiArrowLeftLine size={24} />
                        </motion.div>
                        <motion.div
                            id="next"
                            className="text-lg h-12 w-12 border-2 border-blue-500 rounded-full grid place-items-center cursor-pointer hover:bg-blue-500 hover:text-white transition-all"
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => swiperRef.current?.slideNext()} // Pindah ke slide berikutnya
                        >
                            <RiArrowRightLine size={24} />
                        </motion.div>
                    </motion.div>
                </motion.div>

                {/* Right Section */}
                <motion.div
                    className="lg:w-[70%] overflow-hidden"
                    variants={rightItemVariants}
                >
                    <Swiper
                        slidesPerView={1}
                        spaceBetween={10}
                        autoplay={{ delay: 2500, disableOnInteraction: false }}
                        modules={[Autoplay]}
                        className="h-full"
                        onSwiper={(swiper) => (swiperRef.current = swiper)} // Simpan instance swiper di ref
                    >
                        <SwiperSlide>
                            <img
                                src={Img1}
                                alt="Slide 1"
                                className="block w-full h-full object-cover rounded-xl"
                            />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img
                                src={Img2}
                                alt="Slide 2"
                                className="block w-full h-full object-cover rounded-xl"
                            />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img
                                src={Img3}
                                alt="Slide 3"
                                className="block w-full h-full object-cover rounded-xl"
                            />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img
                                src={Img4}
                                alt="Slide 4"
                                className="block w-full h-full object-cover rounded-xl"
                            />
                        </SwiperSlide>
                    </Swiper>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default Hero;
