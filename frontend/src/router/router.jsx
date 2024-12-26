import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/home/Home";
import About from "../pages/about/About";
import Company from "../pages/miniPage/Company";
import ContactUs from "../pages/miniPage/contactUs";
import SingglePost from "../pages/posts/singglePost";
import Login from "../pages/user/Login";
import Register from "../pages/user/AdminRegister";
import AdminLayout from "../pages/admin/AdminLayout";
import Dashboard from "../pages/admin/dashboard/Dashboard"
import Product from "../pages/product/Product";
import PrivateRouter from "./PrivateRouter";
import UploadPost from "../pages/admin/menegepost/upload-post";
import UploadProduct from "../pages/admin/menegeproduct/upload-product";
import ProductsMenege from "../pages/admin/menegeproduct/product-menege";
import PostsMenege from "../pages/admin/menegepost/menege-post";
import ManageUsers from "../pages/admin/menegeuser/menege-user";
import UserRegister from "../pages/user/UserRegister";
import AdminRegister from "../pages/user/AdminRegister";


const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/about-us",
                element: <About />
            },
            {
                path: "/Product",
                element: <Product />
            },

            {
                path: "/Company",
                element: <Company />
            },
            {
                path: "/contact-us",
                element: <ContactUs />
            },
            {
                path: "/posts/:id",
                element: <SingglePost />
            },
            {
                path: "/login",
                element: <Login />
            },
            {
                path: "/user-register",
                element: <UserRegister />
            },
            {
                // private routes 
                path: "/dashboard",
                element: <PrivateRouter> <AdminLayout /> </PrivateRouter>,
                children: [
                    {
                        path: "",
                        element: <Dashboard />
                    },
                    {
                        path: "upload-post",
                        element: <UploadPost />
                    },
                    {
                        path: "upload-product",
                        element: <UploadProduct />
                    },
                    {
                        path: "post-manage",
                        element: <PostsMenege />
                    },
                    {
                        path: "product-manage",
                        element: <ProductsMenege />
                    },
                    {
                        path: "manage-user",
                        element: <ManageUsers />
                    },
                    {
                        path: "admin-register",
                        element: <AdminRegister />
                    },
                ]
            },
        ]
    },
]);

export default router;

