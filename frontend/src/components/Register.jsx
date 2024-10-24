import { Center, Flex, FormControl, FormLabel, Input, InputGroup, InputRightElement, Button, VStack, useToast } from "@chakra-ui/react"
import { useState } from "react"
import { apiURL } from "../config/config";
import { useNavigate } from 'react-router-dom';
import { BiHide, BiShow } from "react-icons/bi";


const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPwd, setShowPwd] = useState(false);
    const [showConPwd, setShowConPwd] = useState(false);
    const [loading, setLoading] = useState(false);

    const toast = useToast();

    const navigate = useNavigate();


    const registerUser = async () => {
        setLoading(true)
        if (email.length === 0 || password.length === 0 || confirmPassword.length === 0 || username.length === 0) {
            console.log("Some Fields are empty")
            toast({
                title: "Some Fields are empty",
                status: "warning",
                duration: "3000",
                isClosable: true,
                position: "bottom"

            })
            setLoading(false)

            return false;
        } else if (!validateEmail(email) || !validatePwd(password) || password !== confirmPassword) {
            if (!validateEmail(email)) {
                console.log("Email invalid ");
                toast({
                    title: "Email invalid",
                    status: "warning",
                    duration: "3000",
                    isClosable: true,
                    position: "bottom"

                })
                setLoading(false)
            }
            if (!validatePwd(password)) {
                console.log("Password invalid ");
                toast({
                    title: "Password invalid",
                    status: "warning",
                    duration: "3000",
                    isClosable: true,
                    position: "bottom"

                })
                setLoading(false)
            }
            if (password !== confirmPassword) {
                console.log("passwords do not match");
                toast({
                    title: "passwords don't match",
                    status: "warning",
                    duration: "3000",
                    isClosable: true,
                    position: "bottom"

                })
                setLoading(false)
            }
            return false;
        } else {
            const userData = {
                username, email, password
            }
            console.log(userData);

            try {
                const config = {
                    headers: {
                        "Content-type": "application/json",
                    }
                }

                await apiURL.post("/api/v1/signup", userData, config).then((res) => {
                    console.log(res.data);
                    if (res.status === 200) {
                        toast({
                            title: "Registration successful",
                            status: "success",
                            duration: "3000",
                            isClosable: true,
                            position: "bottom"
                        })

                        // localStorage.setItem("user", JSON.stringify(res.data));
                        setLoading(false);
                        // navigate("/chats");
                        return true;
                    }
                }).catch((err) => {
                    console.log(err.response.data.message);
                    toast({
                        title: "Error",
                        description: err.response.data.message,
                        status: "warning",
                        duration: "3000",
                        isClosable: true,
                        position: "bottom"
                    })
                    setLoading(false);
                })
            } catch (err) {
                console.log(err);
                toast({
                    title: "An error ocurred!",
                    status: "warning",
                    duration: "3000",
                    isClosable: true,
                    position: "bottom"
                })
            }
            setLoading(false)
            // const data=await apiURL.post("/")
        }
    }


    const handleInputChange = (e, setMethod) => setMethod(e.target.value)

    const validateEmail = (email) => {
        //TODO:remove test case validator

        return /^[a-zA-Z0-9_.±]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i.test(email) || true;
    }

    const validatePwd = (pwd) => {
        //TODO:remove test case validator
        return /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/i.test(pwd) || true;
    }

    return (
        <Flex height={"100%"} width={"100%"} direction={'column'} align={'center'} justify={'center'}>
            <VStack spacing={"1.5vh"} width={"70%"} height={"100%"} sx={{display:'flex',flexDirection:'column', alignItems:'center', justifyContent:'center'}}>

                <FormControl isRequired>
                    <FormLabel>Username</FormLabel>
                    <Input type="text" value={username} _placeholder={{ color: "rgba(255,255,255,0.5)" }} placeholder="Enter your username" onChange={(e) => { handleInputChange(e, setUsername) }} />
                    {/*  */}
                </FormControl>
                <FormControl isRequired>
                    <FormLabel>Email</FormLabel>
                    <Input type="text" value={email} _placeholder={{ color: "rgba(255,255,255,0.5)" }} placeholder="Enter your email" onChange={(e) => { handleInputChange(e, setEmail) }} />
                    {/* {validateEmail(email) && (<FormErrorMessage>Please enter a valid Email</FormErrorMessage>)} */}
                </FormControl>
                <FormControl id="password" isRequired>
                    <FormLabel>Enter Password</FormLabel>
                    <InputGroup>
                        <Input type={showPwd ? "text" : "password"} _placeholder={{ color: "rgba(255,255,255,0.5)" }} placeholder="Enter your password" value={password} onChange={(e) => handleInputChange(e, setPassword)} />
                        <InputRightElement background={"none"} padding={"2px"} color={"white"} borderLeft={"1px"} width={"20%"}>
                            {/* <Button color={"white"} _hover={{ background: "none" }} width={"100%"} marginInline={"10px"} size={"sm"} background={"none"} onClick={() => { setShowPwd(!showPwd) }} >{showPwd ? (<span>Hide</span>) : (<span>Show</span>)}</Button> */}

                            <Flex align={'center'} justify={'center'} onClick={() => { setShowPwd(!showPwd) }} sx={{ border: 'none', height: '100%', width: '100%', cursor: 'pointer' }}>
                                {showPwd ? <BiShow size={20} /> : <BiHide size={20} />}
                            </Flex>

                        </InputRightElement>
                    </InputGroup>
                    {/* {validateEmail(email)? (<FormErrorMessage>Entered email is not valid!</FormErrorMessage>):(<FormHelperText>{email}</FormHelperText>)} */}
                </FormControl>
                <FormControl id="confirmPassword" isRequired>
                    <FormLabel>Enter Password</FormLabel>
                    <InputGroup>
                        <Input type={showConPwd ? "text" : "password"} _placeholder={{ color: "rgba(255,255,255,0.5)" }} placeholder="Enter your password" value={confirmPassword} onChange={(e) => handleInputChange(e, setConfirmPassword)} />
                        <InputRightElement background={"none"} padding={"2px"} color={"white"} borderLeft={"1px"} width={"20%"}>
                            {/* <Button color={"white"} _hover={{ background: "none" }} width={"100%"} marginInline={"10px"} size={"sm"} background={"none"} onClick={() => { setShowConPwd(!showConPwd) }} >{showConPwd ? (<span>Hide</span>) : (<span>Show</span>)}</Button> */}

                            <Flex align={'center'} justify={'center'} onClick={() => { setShowConPwd(!showConPwd) }} sx={{ border: 'none', height: '100%', width: '100%', cursor: 'pointer' }}>
                                {showConPwd ? <BiShow size={20} /> : <BiHide size={20} />}
                            </Flex>

                        </InputRightElement>
                    </InputGroup>
                    {/* {validateEmail(email)? (<FormErrorMessage>Entered email is not valid!</FormErrorMessage>):(<FormHelperText>{email}</FormHelperText>)} */}
                </FormControl>
                <FormControl width={"30%"}>
                    <Center>
                        <Button isLoading={loading} width={"100%"} _active={{ background: "rgb(49 130 206 / 90%)" }} id="loginBtn" colorScheme="blue" variant={'solid'} onClick={registerUser}>Register</Button>
                    </Center>
                </FormControl>
            </VStack>
        </Flex>
    )
}

export default Register