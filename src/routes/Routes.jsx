import { createBrowserRouter } from "react-router-dom";
import { App } from "../App"
import { Login } from "../pages/Login"
import { RegisterPlace } from "../pages/RegisterPlace"
import { RegisterUser } from "../pages/RegisterUser"
import { PlaceList } from "../pages/PlaceList"
import { DashBoard } from "../pages/DashBoard"


export const Routes = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/login",
                element: <Login />
            },
            {
                path: "/registerUser",
                element: <RegisterUser />
            },
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
            }
        ],

    },
]);