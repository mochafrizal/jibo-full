import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectCoverflow, Navigation, Pagination } from 'swiper/modules';
import { RiArrowLeftLine, RiArrowRightLine } from 'react-icons/ri';
import { FiPhone } from 'react-icons/fi';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// Import gambar
import Img1 from '../assets/hero-carousel/img1.jpg';
import Img2 from '../assets/hero-carousel/img2.jpg';
import Img3 from '../assets/hero-carousel/img3.jpg';
import Img4 from '../assets/hero-carousel/img4.jpg';

const Hero = () => {
    const swiperRef = useRef(null);
    const carouselImages = [Img1, Img2, Img3, Img4];

    return (
        <motion.div className="text-red-100 p-0 xl:h-full bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950">
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

                    {/* Navigation Buttons */}
                    <motion.div
                        className="flex items-center justify-center gap-4 w-full h-[100px] bg-gray-950/90 backdrop-blur-md"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.1, duration: 0.8 }}
                    >
                        <motion.div
                            className="flex gap-4"
                        >
                            <motion.div
                                className="text-lg h-12 w-12 border-2 border-red-600 rounded-full grid place-items-center cursor-pointer hover:bg-red-600 hover:text-white transition-all"
                                whileHover={{ scale: 1.2 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => swiperRef.current?.slidePrev()}
                            >
                                <RiArrowLeftLine size={24} />
                            </motion.div>
                            <motion.div
                                className="text-lg h-12 w-12 border-2 border-red-600 rounded-full grid place-items-center cursor-pointer hover:bg-red-600 hover:text-white transition-all"
                                whileHover={{ scale: 1.2 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => swiperRef.current?.slideNext()}
                            >
                                <RiArrowRightLine size={24} />
                            </motion.div>
                        </motion.div>
                    </motion.div>
                </motion.div>

                {/* Right Section */}
                <motion.div
                    className="lg:w-[70%] overflow-hidden p-4"
                    initial={{ opacity: 0, x: 300 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1 }}
                >
                    <Swiper
                        effect={'coverflow'}
                        grabCursor={true}
                        centeredSlides={true}
                        slidesPerView={'auto'}
                        coverflowEffect={{
                            rotate: 50,
                            stretch: 0,
                            depth: 100,
                            modifier: 1,
                            slideShadows: true,
                        }}
                        autoplay={{
                            delay: 3000,
                            disableOnInteraction: false,
                            pauseOnMouseEnter: true,
                        }}
                        pagination={{
                            dynamicBullets: true,
                            clickable: true,
                        }}
                        modules={[Autoplay, EffectCoverflow, Navigation, Pagination]}
                        className="mySwiper h-full w-full"
                        onSwiper={(swiper) => (swiperRef.current = swiper)}
                    >
                        {carouselImages.map((image, index) => (
                            <SwiperSlide key={index} className="w-4/5">
                                <motion.div
                                    className="relative group overflow-hidden rounded-xl"
                                    whileHover={{ scale: 1.02 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <img
                                        src={image}
                                        alt={`Slide ${index + 1}`}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                            <h3 className="text-xl font-bold">Project {index + 1}</h3>
                                            <p className="text-sm">Modern Design & Architecture</p>
                                        </div>
                                    </div>
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