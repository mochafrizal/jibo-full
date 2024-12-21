import React from "react";
import { motion } from "framer-motion";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import logo from "../assets/jibo-logo.png"

const Footer = () => {
    // Variabel animasi
    const fadeDown = {
        hidden: { opacity: 0, y: -50 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <div className="py-10 md:py-16">
            <div className="text-whitecolor flex flex-col items-center justify-center gap-8 text-xl lg:text-2xl">

                {/* Logo */}
                <motion.img
                    src={logo}
                    alt="logo"
                    className="w-52"
                    initial="hidden"
                    animate="visible"
                    variants={fadeDown}
                    transition={{ duration: 1, delay: 0.4 }}
                />

                {/* Kontak */}
                <motion.div
                    className="text-center"
                    initial="hidden"
                    animate="visible"
                    variants={fadeDown}
                    transition={{ duration: 0.8, delay: 0.4 }}
                >
                    <a href="tel:+88 333 78 901" className="block">
                        1092018308
                    </a>
                    <a href="mailto:z8xH3@example.com" className="block">
                        Lorem, ipsum.@gmail.com
                    </a>
                </motion.div>

                {/* Garis Pemisah */}
                <motion.span
                    className="border-b w-40 opacity-50"
                    initial="hidden"
                    animate="visible"
                    variants={fadeDown}
                    transition={{ duration: 0.8, delay: 0.6 }}
                ></motion.span>

                {/* Ikon Sosial Media */}
                <motion.div
                    className="text-gray-200 space-x-5 flex justify-center items-center"
                    initial="hidden"
                    animate="visible"
                    variants={fadeDown}
                    transition={{ duration: 0.8, delay: 0.8 }}
                >
                    <FaFacebookF
                        className="cursor-pointer hover:text-firstcolor duration-300 text-2xl"
                    />
                    <FaInstagram
                        className="cursor-pointer hover:text-firstcolor duration-300 text-2xl"
                    />
                    <FaTwitter
                        className="cursor-pointer hover:text-firstcolor duration-300 text-2xl"
                    />
                </motion.div>
            </div>

            {/* Copyright */}
            <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeDown}
                transition={{ duration: 0.8, delay: 1 }}
            >
                <p className="text-whitecolor text-xs text-center mt-10 opacity-50">
                    Copyright &copy; 2024 jibo. All rights reserved.
                </p>
            </motion.div>
        </div>
    );
};

export default Footer;
