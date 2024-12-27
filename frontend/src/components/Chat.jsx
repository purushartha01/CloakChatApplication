/* eslint-disable react/prop-types */
import { Box, Flex, Input, InputGroup, InputRightElement, Text, useToast } from "@chakra-ui/react"
import { IoMdSend } from "react-icons/io"
import { useEffect, useRef, useState } from "react"
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
    const msgRef = useRef(null);


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
                    scrollToBottom();
                    // setAllMsgs(res.data.chatData.messages)
                }
            }).catch((err) => {
                console.log(err)
            })


    }

    const scrollToBottom=()=>{
        msgRef?.current?.lastElementChild?.scrollIntoView();
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
                scrollToBottom();
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
            <Flex height={'10vh'} width={"100%"} direction={'row'} align={'center'} borderBottom={'2px solid white'}>
                <Flex height={'100%'} width={'20%'} align={'center'} justify={'center'}>
                    <Box height={'80%'} display={'flex'} aspectRatio={'1/1'} borderRadius={'50%'} border={'2px solid white'} background={'rgba(255,255,255,0.2)'} alignItems={'center'} fontSize={'1.5rem'} justifyContent={'center'} textTransform={'capitalize'}>
                        {/* <img src={}/> */}
                        {chatData?.isGroup ? chatData?.chatname[0] :chatData?.members[0]._id===user.id ? chatData?.members[1]?.username[0] : chatData?.members[0].username[0]}
                    </Box>
                </Flex>
                <Flex height={'100%'} width={"80%"} direction={'column'} align={'center'} paddingLeft={'2vh'}>
                    <Flex height={'60%'} width={"100%"} fontSize={'2xl'} align={'center'} fontWeight={'semibold'} textTransform={'capitalize'}>
                        {/* {chatData?.chatname} */}
                        {chatData?.isGroup ? chatData?.chatname :chatData?.members[0]._id===user.id ? chatData?.members[1]?.username : chatData?.members[0].username}
                    </Flex>
                    {chatData?.isGroup && <Flex height={'40%'} width={"100%"} fontWeight={'normal'} align={'center'}>
                        Members: {chatData?.members.length}
                    </Flex>}
                </Flex>
            </Flex>
            <Flex height={'70vh'} width={'100%'} direction={'column'} overflowY={'auto'} ref={msgRef}>
                {/* {} */}
                {allMsgs.length > 0 ?
                    (allMsgs.map((msg) => {
                        return (
                            <Flex direction={'row'} key={msg._id} min-height={'15vh'} maxHeight={'fit-content'} marginTop={'15px'} justify={msg.sender._id === user.id ? 'flex-end' : 'flex-start'} gap={'2'} padding={'2'}>
                                {msg.sender._id !== user.id && <Flex height={'100%'}>
                                    <Box height={'5vh'} aspectRatio={'1/1'} borderRadius={'50%'} border={'1px solid white'}>
                                        {/* <img src={} /> */}
                                    </Box>
                                </Flex>}
                                <Flex height={'100%'} max-width={"30vw"} direction={'column'} >
                                    <Flex height={'fit-content'} width={"100%"} fontWeight={'bold'} textTransform={'capitalize'} padding={"0 2%"} justify={msg.sender._id === user.id ? 'flex-end' : 'flex-start'}>
                                        {(msg.sender._id !== user.id && msg.sender.username) || "You"}
                                    </Flex>
                                    <Flex height={'fit-content'}  backgroundColor={'rgba(255,255,255,0.2)'} borderRadius={'10px'} paddingX={'3'} paddingY={'1'}>
                                        <Text height={'100%'} maxWidth={'20vw'} sx={{ wordWrap: 'break-word', overflow: 'hidden' }}>
                                            {msg.messageContent}
                                        </Text>
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