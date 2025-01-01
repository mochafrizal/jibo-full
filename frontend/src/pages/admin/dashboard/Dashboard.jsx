import React from "react";
import { useSelector } from "react-redux";
import { FiUsers, FiBox } from "react-icons/fi";
import { FaBlog } from "react-icons/fa";
import { RiAdminLine } from "react-icons/ri";
import { useGetUsersQuery, useGetAdminsQuery } from "../../../redux/features/auth/authApi";
import { useFetchGetAllPostsQuery } from "../../../redux/features/post/postApi";
import { useFetchGetAllProductsQuery } from "../../../redux/features/product/productApi";
import Chart from "./chart";

const Dashboard = () => {
    const { admin } = useSelector((state) => state.auth);

    const { data: adminData } = useGetAdminsQuery();
    const { data: userData } = useGetUsersQuery();
    const { data: postData } = useFetchGetAllPostsQuery();
    const { data: productData } = useFetchGetAllProductsQuery();

    const dashboardItems = [
        {
            icon: RiAdminLine,
            count: adminData?.admins?.length || 0,
            label: "Admin",
            className: "bg-indigo-900/30 text-indigo-400",
            iconColor: "text-indigo-400"
        },
        {
            icon: FiUsers,
            count: userData?.users?.length || 0,
            label: "Pengguna",
            className: "bg-emerald-900/30 text-emerald-400",
            iconColor: "text-emerald-400"
        },
        {
            icon: FaBlog,
            count: postData?.posts?.length || 0,
            label: "Postingan",
            className: "bg-red-900/30 text-red-400",
            iconColor: "text-red-400"
        },
        {
            icon: FiBox,
            count: productData?.products?.length || 0,
            label: "Produk",
            className: "bg-blue-900/30 text-blue-400",
            iconColor: "text-blue-400"
        }
    ];

    return (
        <div className="p-6 bg-primary h-full rounded-md">
            {/* Welcome Card */}
            <div className="bg-gray-800 p-6 mb-6 rounded-lg shadow-lg border border-gray-700">
                <h1 className="text-2xl font-bold text-white">
                    Halo, {admin?.name || "Admin"}
                </h1>
                <p className="text-gray-400">Selamat datang di dashboard</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {dashboardItems.map((item, index) => {
                    const IconComponent = item.icon;
                    return (
                        <div
                            key={index}
                            className={`${item.className} p-6 rounded-lg shadow-lg border border-gray-700/50 backdrop-blur-sm transition-transform duration-300 hover:scale-105`}
                        >
                            <IconComponent className={`mx-auto text-4xl mb-2 ${item.iconColor}`} />
                            <div className="text-2xl font-bold mb-1">{item.count}</div>
                            <div className="text-gray-300">{item.label}</div>
                        </div>
                    );
                })}
            </div>
            {/* chart secton */}
            <div className="mt-12">
                <Chart postData={postData} productData={productData} />
            </div>
        </div>

    );
};

export default Dashboard;