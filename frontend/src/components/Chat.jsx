/* eslint-disable react/prop-types */
import { Flex, Input, InputGroup, InputRightElement, useToast } from "@chakra-ui/react"
import { IoMdSend } from "react-icons/io"
import { useEffect, useState } from "react"
import { useAuth } from "../hooks/AuthProvider";
import { apiURL, createAuthHeader } from "../config/config";

const Chat = ({ chatData, socketObj }) => {

    const { socket } = socketObj;
    console.log(chatData)
    const [isTyping, setIsTyping] = useState(false)
    const [currMsg, setCurrMsg] = useState('')
    const [currentChatData, setCurrChatData] = useState(chatData)
    const [allMsgs, setAllMsgs] = useState([...chatData.messages])
    const [isMsgSent, setIsMsgSent] = useState(0);

    const { user, token } = useAuth()
    const toast = useToast();

    const handleTyping = (e) => {
        if (!isTyping) {
            // console.log(socket)
            socket.emit("typing", chatData)
            socket.on("typing", setIsTyping(true))
        }
        let lastTypingTime = new Date().getTime();
        var timerLength = 3000;
        setTimeout(() => {
            var timeNow = new Date().getTime();
            var timeDiff = timeNow - lastTypingTime;
            if (timeDiff >= timerLength && isTyping) {
                socket.emit("stop-typing", chatData);
                setIsTyping(false);
            }
        }, timerLength);

    }

    const handleStopTyping = () => {
        socket.emit("stop-typing", chatData);
        setIsTyping(false);
    }
    // console.log(allMsgs)

    const sendMsg = async (e) => {
        e.preventDefault();
        const finalMsg = {
            messageContent: currMsg,
            sender: user.id,
            chatId: chatData._id
        }

        const authHeader = createAuthHeader(token);
        await apiURL.post("/api/v1/msg/new", finalMsg, { headers: { Authorization: authHeader } })
            .then((res) => {
                console.log(res.data)
                if (res.status === 200) {
                    setIsMsgSent(true);
                    setCurrChatData(res.data.chatData);
                    setCurrMsg('');
                    // setAllMsgs(res.data.chatData.messages)
                }
            }).catch((err) => {
                console.log(err)
            })


    }


    useEffect(() => {

        const authHeader = createAuthHeader(token);

        apiURL.post('/api/v1/msg/get', { chatId: chatData._id }, {
            headers: { Authorization: authHeader }
        }).then((res) => {
            // console.log(res.data, res.status);
            if (res.status === 200) {
                console.log(res.data)
                setAllMsgs(res.data)
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
        })
    }, [token, toast, chatData, isMsgSent])

    return (
        <Flex height={'85vh'} width={'100%'} direction={'column'} borderRadius={'0 20px 20px 0'} overflow={'hidden'}>
            <Flex height={'10vh'} width={"100%"} direction={'column'} align={'center'} paddingLeft={'2vh'} borderBottom={'2px solid white'}>
                <Flex height={'60%'} width={"100%"} fontSize={'2xl'} align={'center'} fontWeight={'semibold'} textTransform={'capitalize'}>
                    {chatData?.chatname}
                </Flex>
                <Flex height={'40%'} width={"100%"} fontWeight={'normal'} align={'center'}>
                    Members: {chatData?.members.length}
                </Flex>
            </Flex>
            <Flex height={'70vh'} width={'100%'} direction={'column'} overflowY={'auto'}>
                {/* {} */}
                {allMsgs.length > 0 ?
                    (allMsgs.map((msg) => {
                        return (
                            <Flex direction={'row'} key={msg._id} min-height={'fit-content'} marginTop={'15px'} justify={msg.sender._id === user.id ? 'flex-end' : 'flex-start'}>
                                <Flex height={'100%'} width={'fit-content'} max-width={"40vw"} direction={'column'} backgroundColor={'rgba(255,255,255,0.2)'}>
                                    <Flex height={'fit-content'} width={"100%"} backgroundColor={'rgba(255,255,255,0.1)'} textTransform={'capitalize'} padding={"0 2%"}>
                                        {msg.sender.username}
                                    </Flex>
                                    <Flex height={'fit-content'} max-width={'100%'} sx={{ textWrap: 'pretty' }} padding={"0 2%"}>
                                        {msg.messageContent}
                                    </Flex>
                                </Flex>
                            </Flex>
                        )
                    })) : (
                        <Flex></Flex>
                    )}
            </Flex>
            <Flex height={'5vh'} width={'100%'}>
                <InputGroup height={'100%'} width={'100%'} sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', border: '2px solid white' }}>
                    <Input height={'100%'} value={currMsg} width={'80%'} sx={{ borderRadius: 'none', borderWidth: '0 2px 0 0', outline: 'none' }} _active={{ outline: 'none' }} _focus={{ outline: 'none' }} placeholder="Enter message here" onFocus={(e) => {
                        handleTyping(e);
                    }} onChange={(e) => {
                        e.preventDefault()
                        setCurrMsg(e.target.value);
                    }} onBlur={(e) => {
                        e.preventDefault();
                        handleStopTyping(e);
                    }}>
                    </Input>
                    <InputRightElement height={'100%'} width={'20%'} sx={{ borderRadius: 'none' }}>
                        <IoMdSend size={25} className="chatIcons" onClick={sendMsg} />
                    </InputRightElement>
                </InputGroup>
            </Flex>
        </Flex>
    )
}

export default Chat