import React from 'react';
import imag from "../../assets/index-7.jpg"

const About = () => {
    return (
        <div className="relative bg-whitecolor overflow-hidden">
            {/* Background Image */}
            <div className="hidden xl:block absolute bottom-0 left-1/2 transform -translate-x-1/2 opacity-20">
                <img src={imag} alt="bg_image" className="max-w-3xl background-image-about" />
            </div>

            <div className="container flex flex-col items-center gap-14 xl:flex-row xl:justify-between">
                {/* Icon Boxes */}
                <div className="flex flex-col items-center gap-10 xl:flex-col xl:max-w-56 z-10">
                    {/* Item 1 */}
                    <div className="about__item space-y-2 text-center xl:text-start">
                        <div className="flex flex-col items-center gap-3 xl:flex-row">
                            <div className="inline-block relative">
                                <div className="h-6 w-6 bg-firstcolor rounded-full opacity-50 absolute -right-1 top-3"></div>
                                <i className="ri-hotel-line text-5xl"></i>
                            </div>
                            <h4 className="text-blackcolor hover:-translate-y-1 duration-300 cursor-pointer">Architecture</h4>
                        </div>
                        <p>High-quality architecture services are our specialty.</p>
                    </div>

                    {/* Item 2 */}
                    <div className="about__item space-y-2 text-center xl:text-start">
                        <div className="flex flex-col items-center gap-3 xl:flex-row">
                            <div className="inline-block relative">
                                <div className="h-6 w-6 bg-firstcolor rounded-full opacity-50 absolute -right-1 top-3"></div>
                                <i className="ri-pen-nib-line text-5xl"></i>
                            </div>
                            <h4 className="text-blackcolor hover:-translate-y-1 duration-300 cursor-pointer">Interior design</h4>
                        </div>
                        <p>We provide distinctive and stylish architectural solutions.</p>
                    </div>

                    {/* Item 3 */}
                    <div className="about__item space-y-2 text-center xl:text-start">
                        <div className="flex flex-col items-center gap-3 xl:flex-row">
                            <div className="inline-block relative">
                                <div className="h-6 w-6 bg-firstcolor rounded-full opacity-50 absolute -right-1 top-3"></div>
                                <i className="ri-lightbulb-line text-5xl"></i>
                            </div>
                            <h4 className="text-blackcolor hover:-translate-y-1 duration-300 cursor-pointer">Lighting design</h4>
                        </div>
                        <p>Trust our team to design one-of-a-kind lighting for your home.</p>
                    </div>
                </div>

                {/* Contact Form */}
                <div className="about__form flex flex-col items-center gap-3 xl:text-start xl:items-start xl:max-w-lg z-10 xl:gap-5">
                    <h2>Find out the price <br /> of your home</h2>
                    <h4>We will contact you within 24 hours</h4>

                    <form className="bg-secondcolor p-5 mt-5 text-whitecolor space-y-5 rounded-md shadow-2xl text-start lg:p-10">
                        <input
                            type="text"
                            placeholder="Name"
                            className="w-full bg-transparent border-b border-graycolor py-2 outline-none"
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            className="w-full bg-transparent border-b border-graycolor py-2 outline-none"
                        />
                        <input
                            type="text"
                            placeholder="Phone"
                            className="w-full bg-transparent border-b border-graycolor py-2 outline-none"
                        />
                        <button type="submit" className="btn">
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default About;
