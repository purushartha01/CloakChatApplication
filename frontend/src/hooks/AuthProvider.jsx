import { useContext, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiURL } from "../config/config";
import { useToast } from '@chakra-ui/react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('userInfo'))?.userData || null);
    const [token, setToken] = useState(JSON.parse(localStorage.getItem("userInfo"))?.accessToken || "");
    // const [chats,setChats]=useState()
    // const navigate = useNavigate();

    const toast = useToast();

    const loginAction = async (data) => {
        console.log(data)
        try {
            await apiURL.post('/api/v1/login', data).then((res) => {
                if (res.status === 200) {
                    toast({
                        title: "Login Successful",
                        status: "success",
                        duration: "3000",
                        isClosable: true,
                        position: "bottom"
                    })
                    setUser(res.data.userData);
                    setToken(res.data.accessToken);
                    localStorage.setItem("userInfo", JSON.stringify(res.data));
                    // navigate("/chats");
                    return true;
                }
                // throw new Error(res.message);
            }).catch((err)=>{
                console.log(err);
                toast({
                    title: "Error: ",
                    description: err?.response?.data?.message,
                    status: "warning",
                    duration: "3000",
                    isClosable: true,
                    position: "bottom"
                })
            })
    } catch (err) {
        console.error(err);
    }
};

const logOut = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("userInfo");
    // navigate("/login");
};

//TODO: add method to update regenerated token
const updateToken=()=>{

}

return <AuthContext.Provider value={{ token, user, loginAction, logOut }}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

export const useAuth = () => {
    return useContext(AuthContext);
};