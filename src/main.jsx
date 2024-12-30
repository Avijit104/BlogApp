import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./sotre/store.js";
import { createBrowserRouter, RouterProvider } from "react-router";
import  { AddBlogs, AllBlogs, Blogs, EditBlogs, HomePage, LoginPage, SignupPage } from './pages/index.js'
import AuthLayout from "./components/AuthLayout.jsx";
import { Flag } from "appwrite";
import { Login } from "./components/index.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
        {
            path: "/",
            element: <HomePage />,
        },
        {
            path: "/login",
            element: (
                <AuthLayout authentication={false}>
                    <LoginPage />
                </AuthLayout>
            ),
        },
        {
            path: "/signup",
            element: (
                <AuthLayout authentication={false}>
                    <SignupPage />
                </AuthLayout>
            ),
        },
        {
            path: "/all-blogs",
            element: (
                <AuthLayout authentication>
                    {" "}
                    <AllBlogs />
                </AuthLayout>
            ),
        },
        {
            path: "/add-blogs",
            element: (
                <AuthLayout authentication>
                    {" "}
                    <AddBlogs />
                </AuthLayout>
            ),
        },
        {
            path: "/edit-blogs/:slug",
            element: (
                <AuthLayout authentication>
                    {" "}
                    <EditBlogs />
                </AuthLayout>
            ),
        },
        {
            path: "/blog/:slug",
            element: <Blogs />,
        },
    ],
},
])

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  </StrictMode>
);
