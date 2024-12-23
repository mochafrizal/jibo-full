import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/home/Home";
import About from "../pages/about/About";
import Company from "../pages/miniPage/Company";
import ContactUs from "../pages/miniPage/contactUs";
import SingglePost from "../pages/posts/singglePost";
import Login from "../pages/user/Login";
import Register from "../pages/user/Register";
import AdminLayout from "../pages/admin/AdminLayout";
import Dashboard from "../pages/admin/dashboard/Dashboard"
// import AddPost from "../pages/admin/post/AddPost";
// import ManagePosts from "../pages/admin/post/ManagePosts";
// import ManageUser from "../pages/admin/user/ManageUser";
// import UpdatePost from "../pages/admin/post/updatePost";
import PrivateRouter from "./PrivateRouter";


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
                path: "/register",
                element: <Register />
            },
            {
                // its will be protected by the admin : use private routes 
                path: "/dashboard",
                element: <PrivateRouter> <AdminLayout /> </PrivateRouter>,
                children: [
                    {
                        path: "",
                        element: <Dashboard />
                    },
                    // {
                    //     path: "add-new-post",
                    //     element: <AddPost />
                    // },
                    // {
                    //     path: "manage-items",
                    //     element: <ManagePosts />
                    // },
                    // {
                    //     path: "users",
                    //     element: <ManageUser />
                    // },
                    // {
                    //     path: "update-items/:id",
                    //     element: <UpdatePost />
                    // },
                ]
            },
        ]
    },
]);

export default router;