import React from "react";
import { motion } from "framer-motion";
import contactImage from "../../assets/contact-1.png";
import bgImage from "../../assets/index-8.jpg"; // Sama dengan background Company

const Contact = () => {
    const imageRef = React.useRef(null);

    const handleMouseMove = (e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;

        const moveX = (x - 0.5) * 30;
        const moveY = (y - 0.5) * 30;

        if (imageRef.current) {
            imageRef.current.style.transform = `translateX(${moveX}px) translateY(${moveY}px)`;
        }
    };

    // Variants for animations
    const fadeInUp = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 2 } },
    };

    const fadeInLeft = {
        hidden: { opacity: 0, x: -400 },
        visible: { opacity: 1, x: 0, transition: { duration: 4 } },
    };

    return (
        <section
            id="contact"
            className="bg-white py-20 md:py-28 relative overflow-hidden -mt-1"
            onMouseMove={handleMouseMove}
        >
            {/* Background Image */}
            <motion.div
                className="hidden xl:block absolute bottom-0 left-1/2 transform -translate-x-1/2 opacity-20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.2 }}
                transition={{ duration: 6 }}
            >
                <img
                    ref={imageRef}
                    src={bgImage}
                    alt="Background"
                    className="max-w-5xl"
                />
            </motion.div>

            {/* Content Container */}
            <div className="container flex flex-col items-center gap-14 xl:flex-row xl:justify-between z-10 p-9">
                {/* Left Section - Image */}
                <motion.div
                    variants={fadeInLeft}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="hidden xl:block z-20"
                >
                    <img
                        src={contactImage}
                        alt="Contact"
                        className="max-w-[400px] xl:max-w-[500px]" // Konsisten dengan Company
                    />
                </motion.div>

                {/* Right Section - Form */}
                <motion.div
                    variants={fadeInUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="flex flex-col items-center gap-3 text-center xl:text-start xl:items-start xl:max-w-lg z-10 xl:gap-5"
                >
                    <h2 className="text-xl md:text-3xl font-bold uppercase text-gray-800">
                        Get in touch with <br /> our team
                    </h2>
                    <h4 className="text-base text-firstcolor font-bold uppercase">
                        Let’s work together!
                    </h4>

                    {/* Form */}
                    <motion.form
                        variants={fadeInUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="bg-gray-900 p-5 mt-5 text-white space-y-5 rounded-md shadow-2xl text-start lg:p-10 w-full"
                    >
                        <motion.input
                            type="text"
                            placeholder="Name"
                            className="w-full bg-transparent border-b border-gray-400 py-2 outline-none placeholder-white"
                            variants={fadeInUp}
                            transition={{ delay: 0.2 }}
                        />
                        <motion.input
                            type="email"
                            placeholder="Email"
                            className="w-full bg-transparent border-b border-gray-400 py-2 outline-none placeholder-white"
                            variants={fadeInUp}
                            transition={{ delay: 0.4 }}
                        />
                        <motion.input
                            type="text"
                            placeholder="Phone"
                            className="w-full bg-transparent border-b border-gray-400 py-2 outline-none placeholder-white"
                            variants={fadeInUp}
                            transition={{ delay: 0.6 }}
                        />
                        <motion.button
                            type="submit"
                            className="border border-firstcolor bg-firstcolor text-white px-5 py-2 uppercase duration-300 hover:opacity-90"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Submit
                        </motion.button>
                    </motion.form>
                </motion.div>
            </div>
        </section>
    );
};

export default Contact;
