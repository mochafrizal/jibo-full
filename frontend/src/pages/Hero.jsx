import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// Image assets
import Img1 from '../assets/hero-carousel/img1.jpg';
import Img2 from '../assets/hero-carousel/img2.jpg';
import Img3 from '../assets/hero-carousel/img3.jpg';
import Img4 from '../assets/hero-carousel/img4.jpg';

const Hero = () => {
    return (
        <div className="text-black p-0 xl:h-full">
            <div className="flex flex-col lg:flex-row xl:h-full">
                {/* Left Section */}
                <div className="relative flex flex-col justify-between overflow-hidden lg:w-[30%]">
                    {/* Decorative Borders */}
                    <div className="w-1/2 h-full border-x absolute top-0 transform translate-x-1/2 opacity-5 -z-10"></div>
                    <div className="w-full h-full border-l absolute top-0 transform translate-x-1/2 opacity-5 -z-10"></div>

                    {/* Content Section */}
                    <div className="h-[calc(100%-100px)] flex flex-col gap-8 items-center justify-center py-12 xl:py-28 xl:gap-16 xl:max-w-xs xl:mx-auto">
                        <h1 className="text-center text-3xl font-bold xl:text-5xl">
                            Designing <br />
                            & building
                        </h1>
                        <h4 className="text-center xl:self-end text-lg">
                            Energy-efficient <br />
                            modern residences <br />
                            from 130 sq. m.
                        </h4>
                        <button className="btn btn__outline xl:self-start border border-white py-2 px-4 rounded-lg hover:bg-white hover:text-black transition">
                            Contact Us
                        </button>
                    </div>

                    {/* Carousel Controls */}
                    <div className="flex items-center justify-center gap-3 bg-gray-900 w-full h-[100px]">
                        <div
                            id="prev"
                            className="carousel__button__prev text-lg h-12 w-12 border-2 border-gray-500 rounded-full grid place-items-center cursor-pointer hover:text-gray-400 transition"
                        >
                            <i className="ri-arrow-left-line"></i>
                        </div>
                        <div
                            id="next"
                            className="carousel__button__next text-lg h-12 w-12 border-2 border-gray-500 rounded-full grid place-items-center cursor-pointer hover:text-gray-400 transition"
                        >
                            <i className="ri-arrow-right-line"></i>
                        </div>
                    </div>
                </div>

                {/* Right Section - Carousel */}
                <div className="lg:w-[70%]">
                    <Swiper
                        slidesPerView={1}
                        spaceBetween={10}
                        pagination={{
                            clickable: true,
                        }}
                        autoplay={{
                            delay: 2500,
                            disableOnInteraction: false,
                        }}
                        modules={[Pagination, Autoplay]}
                        className="h-full"
                    >
                        <SwiperSlide>
                            <img
                                src={Img1}
                                alt="Slide 1"
                                className="carousel__img h-[calc(100%-100px)] object-cover"
                            />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img
                                src={Img2}
                                alt="Slide 2"
                                className="carousel__img h-[calc(100%-100px)] object-cover"
                            />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img
                                src={Img3}
                                alt="Slide 3"
                                className="carousel__img h-[calc(100%-100px)] object-cover"
                            />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img
                                src={Img4}
                                alt="Slide 4"
                                className="carousel__img h-[calc(100%-100px)] object-cover"
                            />
                        </SwiperSlide>
                    </Swiper>
                </div>
            </div>
        </div>
    );
};

export default Hero;
