import { Flex, Input, InputGroup, InputRightElement, Spinner, useToast } from "@chakra-ui/react"
import ChatNames from "../components/ChatNames"
import { IoMdAdd, IoMdSearch } from "react-icons/io";
import Chat from "../components/Chat";
import { useEffect, useState } from "react";
import { apiURL, createAuthHeader } from "../config/config";
import { useAuth } from "./../hooks/AuthProvider";
import SearchedNames from "../components/SearchNames";

const ChatPage = () => {

    const { user, token } = useAuth();

    const [chatData, setChatData] = useState({});
    const [allChats, setAllChats] = useState([]);
    const [allSearchedChats, setAllSearchedChats] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchedChat, setSearchedChat] = useState('');
    const [currentChat, setCurrentChat] = useState('');

    const toast = useToast();


    //TODO: make different component for searched users and corresponding fetch method

    const fetchChatViaSearch = async (e, chat) => {
        e.preventDefault();
        console.log(chat)

        const finalChatObj = { senderId: user.id, receiver: chat }
        console.log(finalChatObj)
        const authHeader = createAuthHeader(token)

        console.log(authHeader);
        await apiURL.post('/api/v1/chat/create', finalChatObj, { headers: { Authorization: authHeader } }).then((res) => {
            console.log(res);
            if (res.status === 200) {
                console.log(res.data)
                setCurrentChat(res.data.chat[0]);
                // setLoading(false)
            }
        }).catch((err) => {
            // console.log(err?.response?.data?.message)
            toast({
                title: err?.response?.data?.message,
                status: "error",
                duration: "3000",
                isClosable: true,
                position: "bottom"
            })
            // setLoading(false)
        })
    }



    const fetchChat = async (e, chat) => {
        e.preventDefault();
        console.log(chat)

        const finalChatObj = { senderId: user.id, receiver: chat }
        console.log(finalChatObj)
        const authHeader = createAuthHeader(token)

        console.log(authHeader);
        await apiURL.post('/api/v1/chat/get', finalChatObj, { headers: { Authorization: authHeader } }).then((res) => {
            console.log(res);
            if (res.status === 200) {
                console.log(res.data)
                setCurrentChat(res.data.chat[0]);
                // setLoading(false)
            }
        }).catch((err) => {
            // console.log(err?.response?.data?.message)
            toast({
                title: err?.response?.data?.message,
                status: "error",
                duration: "3000",
                isClosable: true,
                position: "bottom"
            })
            // setLoading(false)
        })
    }


    const searchChat = async (e) => {
        e.preventDefault();
        setLoading(true);
        if (searchedChat.length === 0) {
            setLoading(false);
            return false;
        }

        const authHeader = createAuthHeader(token)

        // console.log(authHeader);

        apiURL.get('/api/v1/chat/search', {
            headers: { Authorization: authHeader }, params: {
                data: searchedChat
            }
        }).then((res) => {
            // console.log(res);
            if (res.status === 200) {
                // console.log(res.data)
                setAllSearchedChats(res.data.users)
                setAllChats([]);
                setLoading(false)
            }
        }).catch((err) => {
            // console.log(err?.response?.data?.message)
            toast({
                title: err?.response?.data?.message,
                status: "error",
                duration: "3000",
                isClosable: true,
                position: "bottom"
            })
            setLoading(false)
        })
    }

    useEffect(() => {
        setLoading(true);
        const authHeader = createAuthHeader(token);

        apiURL.get('/api/v1/chat/all', {
            headers: { Authorization: authHeader }
        }).then((res) => {
            console.log(res.data, res.status);
            if (res.status === 201) {
                console.log(res.data.chats)
                setAllChats(res.data.chats)
                setLoading(false)
            }
        }).catch((err) => {
            console.log(err?.response?.data?.message)
            toast({
                title: err?.response?.data?.message,
                status: "error",
                duration: "3000",
                isClosable: true,
                position: "bottom"
            })
            setLoading(false)
        })
        setLoading(false)
    }, [token, toast]);



    return (
        <Flex height={'90vh'} width={'100%'} align={'center'} justify={'center'}>
            <Flex direction={'row'} height={'85vh'} width={'80%'} alignItems={'center'} className="card roundedCorners" >
                <Flex direction={'column'} align={'center'} height={'85vh'} width={'40%'} sx={{ border: '1px solid white', borderRadius: '20px 0 0 20px' }}>
                    <Flex direction={'row'} width={'100%'} height={'10vh'} align={'center'} justify={'space-around'} sx={{ borderBottom: '2px solid white', position: 'sticky' }} flex={'0 0 auto'}>
                        {/* <Flex width={'20%'} align={'center'} justify={'center'}>
                            <IoMenu size={40}/>
                        </Flex> */}
                        <Flex width={'80%'} >
                            <InputGroup sx={{ height: "100%", width: "100%", color: "white", border: '1px solid #cecccc', outline: 'none', borderRadius: '25px', overflow: 'hidden' }}>
                                <Input id="searchBar" borderLeftRadius={'25px'} borderRightRadius={'none'} width={'80%'} value={searchedChat} _hover={{ outline: 'none' }} _focus={{ border: '3px solid #fff', outline: 'none' }} _active={{ border: '3px solid #fff', outline: 'none' }} sx={{ color: "white", outline: 'none' }} _placeholder={{ color: '#cecccc' }} onChange={(e) => {
                                    e.preventDefault();
                                    setSearchedChat(e.target.value);
                                }} placeholder="Search" />
                                <InputRightElement width={'20%'} height={'100%'} borderLeftRadius={'none'} borderRightRadius={'25px'}>
                                    <IoMdSearch size={'30'} className="chatIcons" style={{ cursor: 'pointer' }} title="Search" onClick={searchChat} />
                                </InputRightElement>
                            </InputGroup>
                        </Flex>
                        <Flex width={'10%'} aspectRatio={'1/1'} borderRadius={'100%'} border={'1px solid white'} align={'center'} justify={'center'} >
                            <IoMdAdd size={30} className="chatIcons" style={{ cursor: 'pointer' }} title="New Chat" onClick={(e) => {
                                e.preventDefault();
                                const search = document.getElementById('searchBar');
                                search.focus();
                            }} />
                        </Flex>
                    </Flex>
                    <Flex direction={'column'} width={'100%'} align={'center'} height={'75vh'} overflowY={'auto'}>
                        {loading ? <Spinner color="white.700" size={'lg'} marginTop={'50%'} /> : (
                            allChats.length > 0 ? (allChats?.map((chat) => {
                                return (
                                    <Flex key={chat._id} width={'100%'} minHeight={'8vh'} onClick={(e) => { fetchChat(e, chat) }}>
                                        <ChatNames chat={{ ...chat }} />
                                    </Flex>
                                )
                            }
                            )):(
                                allSearchedChats?.map((chat)=>{
                                    return (
                                        <Flex key={chat.id} width={'100%'} minHeight={'8vh'} onClick={(e) => { fetchChatViaSearch(e, chat) }}>
                                            <SearchedNames chat={{ ...chat }} />
                                        </Flex>
                                    )
                                })
                            )
                    )}
                    </Flex>
                </Flex>
                <Flex height={'85vh'} width={'60%'} sx={{ borderWidth: '1px 1px 1px 0', borderColor: 'white', borderRadius: '0 20px 20px 0' }}>
                    {currentChat && <Chat chatData={{ ...currentChat }} />}
                </Flex>
            </Flex>
        </Flex>
    )
}

export default ChatPage