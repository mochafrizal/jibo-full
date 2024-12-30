import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Import images
import slide1 from '../assets/slide-1.jpg';
import slide2 from '../assets/slide-2.jpg';
import slide3 from '../assets/slide-3.jpg';
import slide4 from '../assets/slide-4.jpg';

const properties = [
    {
        id: 1,
        image: slide1,
        location: "Hewes Ave",
        size: "290 sq. m.",
        price: "$ 390 000"
    },
    {
        id: 2,
        image: slide2,
        location: "Barton St",
        size: "350 sq. m.",
        price: "$ 420 000"
    },
    {
        id: 3,
        image: slide3,
        location: "Eldon Dr",
        size: "250 sq. m.",
        price: "$ 370 000"
    },
    {
        id: 4,
        image: slide4,
        location: "Carlisle Rd",
        size: "350 sq. m.",
        price: "$ 480 000"
    }
];

const Hero = () => {
    const [activeSlide, setActiveSlide] = useState(0);
    const [isSliding, setIsSliding] = useState(false);
    const [animating, setAnimating] = useState(false);
    const [displayedProperty, setDisplayedProperty] = useState(properties[0]);
    const [textVisible, setTextVisible] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            handleNextSlide();
        }, 4000);

        return () => clearInterval(interval);
    }, [activeSlide]);

    const handleSlideChange = (nextIndex) => {
        if (isSliding) return;

        setAnimating(true);
        setIsSliding(true);
        setTextVisible(false);

        // After text fades out, update the text content
        setTimeout(() => {
            setDisplayedProperty(properties[nextIndex]);
            setTextVisible(true);
        }, 500);

        // After all animations complete, reset states
        setTimeout(() => {
            setActiveSlide(nextIndex);
            setAnimating(false);
            setIsSliding(false);
        }, 1000);
    };

    const handleNextSlide = () => {
        const nextIndex = (activeSlide + 1) % properties.length;
        handleSlideChange(nextIndex);
    };

    const handlePrevSlide = () => {
        const nextIndex = (activeSlide - 1 + properties.length) % properties.length;
        handleSlideChange(nextIndex);
    };

    return (
        <div className=" relative min-h-screen bg-[#120d0d] text-white">
            <div className="flex flex-col lg:flex-row xl:h-full">
                {/* Left Section */}
                <div className="relative flex flex-col justify-between lg:w-[30%]">
                    {/* Border elements */}
                    <div className="home__title h-[calc(100%-100px)] flex flex-col gap-8 items-center justify-center py-12 xl:py-28 xl:gap-16 xl:max-w-xs xl:mx-auto">
                        <h1 className=" text-3xl xl:text-5xl font-bold uppercase opacity-0 animate-[fadeIn_0.5s_ease-in-out_forwards]">
                            Designing <br />
                            & building
                        </h1>

                        <h4 className="text-[#E31E24] font-bold uppercase xl:self-end opacity-0 animate-[fadeIn_0.5s_ease-in-out_0.2s_forwards]">
                            Energy-efficient <br />
                            modern residences <br />
                            from 130 sq. m.
                        </h4>

                        <button className="border border-[#E31E24] px-5 py-2 uppercase hover:bg-[#E31E24] transition-colors duration-300 xl:self-start opacity-0 animate-[fadeIn_0.5s_ease-in-out_0.4s_forwards]">
                            contact us
                        </button>
                    </div>

                    <div className="button__control flex items-center justify-center gap-3 bg-[#151313] w-full h-[100px] opacity-0 animate-[fadeIn_0.5s_ease-in-out_0.6s_forwards]">
                        <button
                            onClick={handlePrevSlide}
                            className="carousel__button__prev h-12 w-12 border-2 border-[#808080] rounded-full grid place-items-center hover:text-[#808080] transition-colors duration-300"
                            disabled={isSliding}
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </button>
                        <button
                            onClick={handleNextSlide}
                            className="carousel__button__next h-12 w-12 border-2 border-[#808080] rounded-full grid place-items-center hover:text-[#808080] transition-colors duration-300"
                            disabled={isSliding}
                        >
                            <ChevronRight className="w-6 h-6" />
                        </button>
                    </div>
                </div>

                {/* Right Section - Carousel */}
                <div className="lg:w-[70%]">
                    <div className="carousel carousel__fade relative h-full overflow-hidden">
                        <div className="carousel__inner h-[calc(100vh-220px)] relative">
                            {properties.map((property, index) => (
                                <div
                                    key={property.id}
                                    className={`carousel__item absolute w-full h-full transition-all duration-500 ${index === activeSlide
                                        ? "carousel__item__active opacity-100 translate-x-0 animate-[slideIn_1s_ease-in-out]"
                                        : "opacity-0 translate-x-full animate-[fadeOut_1s_ease-in-out]"
                                        }`}
                                >
                                    <img
                                        src={property.image}
                                        alt={property.location}
                                        className="carousel__img w-full h-full object-cover"
                                    />
                                </div>
                            ))}
                        </div>

                        <div className="h-[100px] bg-[#120d0d] px-8 flex items-center justify-between border-t border-[#2A2A2A]">
                            <div className="text-[#454545] text-5xl font-bold tracking-wider uppercase">
                                63+ works
                            </div>

                            <div className="flex items-center gap-8">
                                <h4 className={`text-white text-xl font-bold tracking-wider uppercase transition-all duration-500 ${textVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                                    }`}>
                                    {displayedProperty.location}
                                </h4>
                                <h4 className={`text-[#E31E24] text-xl font-bold tracking-wider transition-all duration-500 delay-[100ms] ${textVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                                    }`}>
                                    {displayedProperty.size}
                                </h4>
                                <h4 className={`text-[#E31E24] text-xl font-bold tracking-wider transition-all duration-500 delay-[200ms] ${textVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                                    }`}>
                                    {displayedProperty.price}
                                </h4>
                                <h4 className={`hidden xl:block border-b w-32 border-graycolor transition-all duration-500 delay-[300ms] ${textVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                                    }`}></h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                    }
                    to {
                        opacity: 1;
                    }
                }

                @keyframes slideIn {
                    from {
                        opacity: 0;
                        transform: translatex(100px);
                    }
                    to {
                        opacity: 1;
                        transform: translatex(0);
                    }
                }

                @keyframes fadeOut {
                    from {
                        opacity: 1;
                    }
                    to {
                        opacity: 0;
                    }
                }
            `}</style>
        </div>
    );
}

export default Hero

