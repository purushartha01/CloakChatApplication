import { Button, Flex, Center, FormControl, FormLabel, Input, InputGroup, InputRightElement, useToast, VStack } from "@chakra-ui/react"
import { useContext, useEffect, useState } from "react"
import { apiURL } from "../config/config"
import { useNavigate } from "react-router-dom"
import { BiHide, BiShow } from "react-icons/bi";
import { useAuth } from "../hooks/AuthProvider";
// import { AuthContext } from "../contexts/Auth";
// import { useUser } from "../hooks/useUser";
// import { useAuth } from "../hooks/useAuth";


const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPwd, setShowPwd] = useState(false)
    const [loading, setLoading] = useState(false);


    const { loginAction, user } = useAuth();


    const toast = useToast();

    const navigate = useNavigate();

    const handleInputChange = (e, setMethod) => setMethod(e.target.value)

    const loginUser = async () => {
        setLoading(true);
        if (email.length === 0 || password.length === 0) {
            console.log("Fields are not full")
            toast({
                title: "Fields are not full",
                status: "warning",
                duration: "3000",
                isClosable: true,
                position: "bottom"
            })
            setLoading(false)
            return false;
        } else {
            const userData = {
                email, password
            }
            console.log(userData);

            const navigateToChats = () => {
                navigate('/chats')
            }
            loginAction(userData, navigateToChats)

            // const config = {
            //     headers: {
            //         "Content-type": "application/json",
            //     }
            // }
            // if(loginAction(userData)){
            //     setLoading(false)
            //     navigate('/chats');
            // }

            // await apiURL.post("/api/v1/login", userData, config).then((res) => {
            //     console.log(res.data);
            //     if (res.status === 200) {
            //         toast({
            //             title: "Login Successful",
            //             status: "success",
            //             duration: "3000",
            //             isClosable: true,
            //             position: "bottom"
            //         })

            //         // login(res.data);
            //         // localStorage.setItem("userInfo", JSON.stringify(res.data));
            //         // setAuthenticated(true);
            //         // loginAction(res.data);
            //         // navigate("/chats");
            //         return true;
            //     }
            // }).catch((err) => {
            //     console.log(err?.response?.data?.message);
            //     toast({
            //         title: "Error: ",
            //         description: err?.response?.data?.message,
            //         status: "warning",
            //         duration: "3000",
            //         isClosable: true,
            //         position: "bottom"
            //     })
            //     setLoading(false);
            // })
            setLoading(false)
            // const data=await apiURL.post("/")
        }
    }

    useEffect(() => {
        if(user){
            navigate("/chats");
        }
    }, [])

    return (
        // <Flex height={"100%"} width={"100%"} align={"center"} justify={"center"}>
        //     <Flex direction={"column"} height={"80%"} width={"70%"} align={'center'} justify={'space-around'} className="card roundedCorners">
        <Flex direction={'column'} align={'center'} justify={'space-around'} height="100%" width="70%">
            <VStack display={'flex'} flexDirection={'column'} alignItems={'center'} justifyContent={'center'} spacing="1.5vh" width={"100%"} height={"100%"}>
                {/* <Flex align={'center'} justify={'center'}>
                            <Heading>Login</Heading>
                        </Flex> */}
                <FormControl id="email" isRequired color={"white"}>
                    <FormLabel>Enter Email</FormLabel>
                    <Input type="email" _placeholder={{ color: "rgba(255,255,255,0.5)" }} placeholder="Enter your email" value={email} onChange={(e) => handleInputChange(e, setEmail)} />
                    {/* {validateEmail(email)? (<FormErrorMessage>Entered email is not valid!</FormErrorMessage>):(<FormHelperText>{email}</FormHelperText>)} */}
                </FormControl>
                <FormControl id="password" isRequired>
                    <FormLabel>Enter Email</FormLabel>
                    <InputGroup>
                        <Input type={showPwd ? "text" : "password"} _placeholder={{ color: "rgba(255,255,255,0.5)" }} placeholder="Enter your password" value={password} onChange={(e) => handleInputChange(e, setPassword)} />
                        <InputRightElement background={"none"} padding={"2px"} color={"white"} borderLeft={"1px"} width={"20%"}>
                            {/* <Button color={"white"} _hover={{ background: "none", border: 'none', outline:'none' }} _active={{ border: 'none',outline:'none' }} width={"100%"} marginInline={"10px"} size={"sm"} background={"none"} onClick={() => { setShowPwd(!showPwd) }} sx={{outline:'none'}}> */}
                            <Flex align={'center'} justify={'center'} onClick={() => { setShowPwd(!showPwd) }} sx={{ border: 'none', height: '100%', width: '100%', cursor: 'pointer' }}>
                                {showPwd ? <BiShow size={20} /> : <BiHide size={20} />}
                            </Flex>
                            {/* </Button> */}
                        </InputRightElement>
                    </InputGroup>
                    {/* {validateEmail(email)? (<FormErrorMessage>Entered email is not valid!</FormErrorMessage>):(<FormHelperText>{email}</FormHelperText>)} */}
                </FormControl>
                <FormControl width={"30%"}>
                    <Center>
                        <Button isLoading={loading} width={"100%"} _active={{ background: "rgb(49 130 206 / 90%)" }} onClick={loginUser} id="loginBtn" colorScheme="blue" variant={'solid'}>Login</Button>
                    </Center>
                </FormControl>
            </VStack>
        </Flex>

        //     </Flex>

        // </Flex>
    )
}

export default Login