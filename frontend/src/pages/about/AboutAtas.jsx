import React from 'react';
import { motion } from 'framer-motion';
import imag from '../../assets/index-7.jpg';
import { FaHotel, FaPencilRuler, FaLightbulb } from 'react-icons/fa'; // Import ikon dari react-icons

const AboutAtas = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 1, staggerChildren: 0.4 } },
    };

    const leftItemVariants = {
        hidden: { opacity: 0, x: -50 },
        visible: { opacity: 1, x: 0, transition: { duration: 1 } },
    };

    const rightItemVariants = {
        hidden: { opacity: 0, x: 50 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
    };

    const handleMouseMove = (e, imageRef) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;

        const moveX = (x - 0.5) * 30;
        const moveY = (y - 0.5) * 30;

        if (imageRef.current) {
            imageRef.current.style.transform = `translateX(${moveX}px) translateY(${moveY}px)`;
        }
    };

    const imageRef = React.useRef(null);

    return (
        <motion.section
            id="about"
            className="bg-white overflow-hidden py-20 md:py-32 lg:py-40 md:p-36"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariants}
            onMouseMove={(e) => handleMouseMove(e, imageRef)}
        >
            {/* Background Image */}
            <motion.div
                className="hidden xl:block absolute bottom-0 left-1/2 transform -translate-x-1/2 opacity-20"
                variants={leftItemVariants}
            >
                <img ref={imageRef} src={imag} alt="Background" className="max-w-3xl" />
            </motion.div>

            <div className="flex flex-col items-center gap-14 xl:flex-row xl:justify-between md:justify-between sm:justify-center">
                {/* Icon Boxes */}
                <motion.div
                    className="flex flex-col items-center gap-10 xl:flex-col xl:max-w-56 z-10 "
                    variants={leftItemVariants}
                >
                    {/* Item 1 */}
                    <motion.div className="about__item space-y-2 text-center xl:text-start " variants={leftItemVariants}>
                        <div className="flex flex-col items-center gap-3 xl:flex-row">
                            <div className="inline-block relative">
                                <div className="h-6 w-6 bg-firstcolor rounded-full opacity-50 absolute right-0 top-0"></div>
                                <FaHotel className="text-5xl text-gray-700" /> {/* Ganti Icon */}
                            </div>
                            <h4 className="text-blackcolor hover:-translate-y-1 duration-300 cursor-pointer font-bold text-2xl whitespace-nowrap leading-relaxed">Architecture</h4>
                        </div>
                        <p className='font-semibold'>High-quality architecture services are our specialty.</p>
                    </motion.div>

                    {/* Item 2 */}
                    <motion.div className="about__item space-y-2 text-center xl:text-start" variants={leftItemVariants}>
                        <div className="flex flex-col items-center gap-3 xl:flex-row">
                            <div className="inline-block relative">
                                <div className="h-6 w-6 bg-firstcolor rounded-full opacity-50 absolute right-0 top-0"></div>
                                <FaPencilRuler className="text-5xl text-gray-700" />
                            </div>
                            <h4 className="text-blackcolor hover:-translate-y-1 duration-300 cursor-pointer font-bold text-2xl whitespace-nowrap leading-relaxed">
                                Interior design
                            </h4>
                        </div>
                        <p className="font-semibold">
                            We provide distinctive and stylish architectural solutions.
                        </p>
                    </motion.div>


                    {/* Item 3 */}
                    <motion.div className="about__item space-y-2 text-center xl:text-start" variants={leftItemVariants}>
                        <div className="flex flex-col items-center gap-3 xl:flex-row">
                            <div className="inline-block relative">
                                <div className="h-6 w-6 bg-firstcolor rounded-full opacity-50 absolute right-0 top-0"></div>
                                <FaLightbulb className="text-5xl text-gray-700" /> {/* Ganti Icon */}
                            </div>
                            <h4 className="text-blackcolor hover:-translate-y-1 duration-300 cursor-pointer font-bold text-2xl whitespace-nowrap leading-relaxed">Lighting design</h4>
                        </div>
                        <p className='font-semibold '>Trust our team to design one-of-a-kind lighting for your home.</p>
                    </motion.div>
                </motion.div>

                {/* Contact Form */}
                <motion.div
                    className="about__form flex flex-col items-center gap-3 xl:text-start xl:items-start xl:max-w-lg z-10 xl:gap-5 p-4"
                    variants={rightItemVariants}
                >
                    <motion.h2 className=" md:text-5xl font-bold uppercase" variants={rightItemVariants}>
                        Find out the price of your home
                    </motion.h2>
                    <motion.h4 className="text-2xl text-firstcolor font-bold" variants={leftItemVariants}>
                        We will contact you within 24 hours
                    </motion.h4>

                    <motion.form
                        className="bg-secondcolor p-5 mt-5 text-white space-y-5 rounded-md shadow-2xl text-start lg:p-10"
                        variants={rightItemVariants}
                    >
                        <input
                            type="text"
                            placeholder="Name"
                            className="w-full bg-transparent border-b border-graycolor py-2 outline-none hover:text-firstcolor duration-300"
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            className="w-full bg-transparent border-b border-graycolor py-2 outline-none hover:text-firstcolor duration-300"
                        />
                        <input
                            type="text"
                            placeholder="Phone"
                            className="w-full bg-transparent border-b border-graycolor py-2 hover:text-firstcolor duration-300 outline-none"
                        />
                        <button type="submit" className="hover:text-firstcolor duration-300">
                            Submit
                        </button>
                    </motion.form>
                </motion.div>
            </div>
        </motion.section>
    );
};

export default AboutAtas;
