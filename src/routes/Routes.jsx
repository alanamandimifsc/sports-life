import { createBrowserRouter } from "react-router-dom";
import { App } from "../App"
import { Login } from "../pages/Login"
import { RegisterPlace } from "../pages/RegisterPlace"
import { RegisterUser } from "../pages/RegisterUser"
import { PlaceList } from "../pages/PlaceList"
import { DashBoard } from "../pages/DashBoard"
import Menu from "../pages/menu";

import { Navigate } from "react-router-dom";

let isAutenticado = JSON.parse(localStorage.getItem("isAutenticado")) || false;

const PrivateRoute = ({ children }) => {
    return isAutenticado ? children : <Navigate to="/login" replace={true} />;
};

export const Routes = createBrowserRouter([

    {

        path: "/login",
        element: <Login />
    },
    {
        path: "/registerUser",
        element: <RegisterUser />
    },
    {
        path: "/",
        element:
            <PrivateRoute>
                <App />
            </PrivateRoute>,
        children: [

            {
                path: "/registerPlace",
                element: <RegisterPlace />
            },
            {
                path: "/placeList",
                element: <PlaceList />
            },
            {
                path: "/dashboard",
                element: <DashBoard />
            },
            {
                path: "/registerPlace/:id",
                element: <RegisterPlace />
            },
            {
                path: "/menu",
                element: <Menu />
            }
        ],

    },
]);