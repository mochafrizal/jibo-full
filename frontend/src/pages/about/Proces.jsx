import React, { useState } from "react";
import { motion } from "framer-motion";
import imp1 from "../../assets/process-1.jpg";
import imp2 from "../../assets/process-2.jpg";
import imp3 from "../../assets/process-3.jpg";
import imp4 from "../../assets/process-4.jpg";

const Process = () => {
    const [activeTab, setActiveTab] = useState(1);

    const contentData = {
        1: {
            title: "Acquaintance with the customer",
            paragraphs: [
                "The first thing we do is meeting with our clients and talk through their goals on a future project. During this meeting, feel free to communicate your ideas and ask lots of questions.",
                "This stage is highly decisive as you can evaluate the work of your potential architect by browsing their portfolio. As a client, you may also assess whether the architect listens to your needs and confirms that he or she understands them.",
            ],
            image: imp1,
        },
        2: {
            title: "Project Concept Development",
            paragraphs: [
                "In this stage, we develop a project concept based on the client’s preferences and ideas. We present the concept in a visual format to ensure that the client’s vision is accurately represented.",
                "This phase involves a lot of back-and-forth communication, allowing us to refine the project concept until it meets the client’s expectations.",
            ],
            image: imp2,
        },
        3: {
            title: "Working on Interior and Exterior",
            paragraphs: [
                "Once the concept is approved, we start working on the interior and exterior designs. We make sure that all design elements are in harmony, creating a cohesive and aesthetically pleasing result.",
                "We present detailed plans and 3D visualizations to help the client understand how the final project will look and feel.",
            ],
            image: imp3,
        },
        4: {
            title: "Finishing Touches for your future home",
            paragraphs: [
                "The final stage involves adding the finishing touches to the project. We ensure that every detail is perfect and meets the client’s standards.",
                "This is where we add the final flourishes that turn a house into a home, making sure it is ready for the client to move in.",
            ],
            image: imp4,
        },
    };

    return (
        <section className="py-16 xl:py-28 container mx-auto mt-5 p-10">
            <div className="flex flex-col gap-10 xl:flex-row xl:justify-between">
                {/* Left Section */}
                <div className="space-y-5 xl:w-1/2">
                    <motion.h4
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, type: "spring" }}
                        className="text-lg text-firstcolor font-bold uppercase"
                    >
                        4 steps to a new home
                    </motion.h4>

                    <motion.h1
                        initial={{ opacity: 0, y: -30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, type: "spring" }}
                        className="text-3xl xl:text-5xl font-bold uppercase text-white"
                    >
                        How we Do <span className="font-normal">It</span>
                    </motion.h1>

                    {/* Tab Content */}
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="space-y-3 pt-3 xl:pt-28"
                    >
                        <h2 className="text-firstcolor text-xl font-bold">
                            {contentData[activeTab].title}
                        </h2>
                        {contentData[activeTab].paragraphs.map((paragraph, index) => (
                            <motion.p
                                key={index}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{
                                    duration: 0.5,
                                    delay: index * 0.2,
                                }}
                                className="text-gray-400"
                            >
                                {paragraph}
                            </motion.p>
                        ))}
                    </motion.div>
                </div>

                {/* Right Section */}
                <div className="space-y-10 xl:w-1/2">
                    {/* Tabs */}
                    <ul className="grid grid-cols-1 gap-3 lg:grid-cols-2 xl:gap-y-7 text-sm xl:text-base font-bold">
                        {Object.keys(contentData).map((tab) => (
                            <motion.li
                                key={tab}
                                whileHover={{ scale: 1.1, rotate: 0 }}
                                whileTap={{ scale: 0.95 }}
                                className={`cursor-pointer flex items-center gap-2 uppercase transition ${activeTab === parseInt(tab)
                                    ? "text-firstcolor"
                                    : "text-gray-400"
                                    }`}
                                onClick={() => setActiveTab(parseInt(tab))}
                            >
                                <span>{`0${tab}`}</span>
                                <p>{contentData[tab].title}</p>
                            </motion.li>
                        ))}
                    </ul>

                    {/* Image */}
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                            duration: 0.8,
                            type: "spring",
                            stiffness: 100,
                        }}
                        whileHover={{ scale: 1.05 }}
                    >
                        <img
                            src={contentData[activeTab].image}
                            alt={contentData[activeTab].title}
                            className="w-full rounded-lg shadow-lg"
                        />
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Process;
