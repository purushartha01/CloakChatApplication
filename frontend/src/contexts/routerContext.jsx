import NotFound from "../pages/NotFound"
import { createBrowserRouter } from 'react-router-dom'
import BaseLayout from './../components/BaseLayout';
import HomePage from "../pages/HomePage";
import ChatPage from "../pages/ChatPage";
import { useAuth } from "../hooks/AuthProvider";
// import { useUser } from "../hooks/useUser";
// import { useContext } from "react";
// import { AuthContext } from "./Auth";





const useRouters = () => {
    const {user}=useAuth();

    console.log(user)

    const routes = [

        {
            path: "*",
            element: <NotFound />
        }, {
            path: "/",
            element: <HomePage />
        }
    ]

    const loggedInRoutes = [
        {
            path: "*",
            element: <NotFound />
        },
        {
            path: "/chats",
            element: <ChatPage />
        }, {
            path: "/",
            element: <HomePage />
        }
    ]

    const mainRoutes = [{
        element: <BaseLayout />,
        // errorElement: <NotFound />,
        children: [...(user ? ([...loggedInRoutes]) : ([...routes])) ]
    }]

    return createBrowserRouter([...mainRoutes])
}


export default useRouters;