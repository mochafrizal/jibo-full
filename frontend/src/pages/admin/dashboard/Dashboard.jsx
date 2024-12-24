import React from "react";
import { useSelector } from "react-redux";
import { FiUsers, FiBox } from "react-icons/fi";
import { FaBlog } from "react-icons/fa";
import { RiAdminLine } from "react-icons/ri";
import { useGetUsersQuery, useGetAdminsQuery } from "../../../redux/features/auth/authApi";
import { useFetchGetAllPostsQuery } from "../../../redux/features/post/postApi";
import { useFetchGetAllProductsQuery } from "../../../redux/features/product/productApi";

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
            className: "bg-indigo-100"
        },
        {
            icon: FiUsers,
            count: userData?.users?.length || 0,
            label: "Pengguna",
            className: "bg-green-100"
        },
        {
            icon: FaBlog,
            count: postData?.posts?.length || 0,
            label: "Postingan",
            className: "bg-red-100"
        },
        {
            icon: FiBox,
            count: productData?.products?.length || 0,
            label: "Produk",
            className: "bg-blue-100"
        }
    ];

    return (
        <div className="p-6">
            <div className="bg-white p-6 mb-6 rounded-lg shadow">
                <h1 className="text-2xl font-bold">Halo, {admin?.name || "Admin"}</h1>
                <p className="text-gray-600">Selamat datang di dashboard</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {dashboardItems.map((item, index) => {
                    const IconComponent = item.icon;
                    return (
                        <div key={index} className={`${item.className} p-6 rounded-lg shadow text-center`}>
                            <IconComponent className="mx-auto text-4xl mb-2" />
                            <div className="text-2xl font-bold mb-1">{item.count}</div>
                            <div className="text-gray-600">{item.label}</div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Dashboard;