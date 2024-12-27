import { Button, Checkbox, Flex, FormControl, FormLabel, Input, ModalFooter, Text, useToast } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { useAuth } from "../hooks/AuthProvider";
import { apiURL, createAuthHeader } from "../config/config";

const NewGroupChat = (props) => {

    const { user, token } = useAuth();
    const toast = useToast();

    const [chatGroupName, setChatGroupName] = useState('');
    const [usersList, setUsersList] = useState([]);
    const [chatGroupNameLength, setChatGroupNameLength] = useState(0);
    const [checkedChats, setCheckedChats] = useState([]);


    const createGroupChat = async (chatList) => {
        if (chatGroupName.length === 0) {
            toast({
                title: "Please enter chatname",
                status: "error",
                duration: "3000",
                isClosable: true,
                position: "bottom"
            })
            return false;
        }
        if (chatList.length === 0) {
            toast({
                title: "No Chats selected",
                status: "error",
                duration: "3000",
                isClosable: true,
                position: "bottom"
            })
            return false;
        }
        console.log(chatList);

        const finalChatObj = { members: chatList, chatName: chatGroupName, chatAdmin: user.id }

        const authHeader = createAuthHeader(token)

        // console.log(authHeader);
        await apiURL.post('/api/v1/chat/createGroup', finalChatObj, { headers: { Authorization: authHeader } }).then((res) => {
            console.log(res.data);
            if(res.status===200){
                toast({
                    title: res?.data?.message,
                    status: "success",
                    duration: "3000",
                    isClosable: true,
                    position: "bottom"
                })
                props.updaterMethod(prev=>prev+1);
                props.onCloseModal();
                return true;
            }
        })
            .catch((err) => {
                console.log(err);
                toast({
                    title: err?.response?.data?.message,
                    status: "error",
                    duration: "3000",
                    isClosable: true,
                    position: "bottom"
                })
                return false;
            })

    }


    useEffect(() => {

        setUsersList(props.usersList);

    }, [usersList, props.usersList]);

    return (
        <Flex width={'100%'} height={'100%'} direction={'column'}>
            <FormControl>
                <FormLabel>Enter Chat Name below{`(${chatGroupNameLength}/50)`}:</FormLabel>
                <Input type="text" outline={'1px solid blue'} value={chatGroupName} maxLength={'50'} onChange={(e) => { e.preventDefault(); setChatGroupName(e.target.value); setChatGroupNameLength(e.target.value.length) }} />
            </FormControl>

            {usersList?.map((chat) => {
                return (
                    <Flex key={chat._id} dir="column" >
                        {chat?.members[0]._id !== user.id ? (
                            <Flex dir="row" width={'100%'}>
                                <Flex>
                                    <Checkbox width={'20%'} checked={checkedChats.includes(chat?.members[0]._id)} onChange={(e) => {
                                        e.preventDefault();
                                        if (e.target.checked) {
                                            setCheckedChats(prev => [...prev, chat?.members[0]._id])
                                        } else {
                                            setCheckedChats(prev => prev.filter((data) => data !== chat?.members[0]._id))
                                        }
                                    }} />
                                </Flex>
                                <Flex width={'80%'}>
                                    <Text>{chat?.members[0].username}</Text>
                                </Flex>
                            </Flex>
                        ) : (
                            <Flex dir="row" width={'100%'}>
                                <Flex>
                                    <Checkbox width={'20%'} checked={checkedChats.includes(chat?.members[1]._id)} onChange={(e) => {
                                        e.preventDefault();
                                        if (e.target.checked) {
                                            setCheckedChats(prev => [...prev, chat?.members[1]._id])
                                        } else {
                                            setCheckedChats(prev => prev.filter((data) => data !== chat?.members[1]._id))
                                        }
                                    }} />
                                </Flex>
                                <Flex width={'80%'}>
                                    <Text>{chat?.members[1].username}</Text>
                                </Flex>
                            </Flex>
                        )}
                    </Flex>
                )
            }

            )}

            <ModalFooter>
                <Button variant={'solid'} colorScheme={'blue'} onClick={(e) => {
                    e.preventDefault();
                    createGroupChat(checkedChats);
                }}>
                    Create Group
                </Button>
            </ModalFooter>
        </Flex>
    )
}

export default NewGroupChat