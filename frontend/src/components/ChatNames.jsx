import { Flex, Text } from "@chakra-ui/react"
import { useState } from "react";
import { useAuth } from "../hooks/AuthProvider";

const ChatNames = ({ chat }) => {
    // console.log(chat);
    const { user } = useAuth();

    const [chatObj, setChatObj] = useState(chat);

    return (
        <Flex width={'100%'} minWidth={'100%'} overflow={'hidden'} minHeight={'100%'} direction={'row'} _hover={{ background: 'rgba(255,255,255,0.1)', cursor: 'pointer' }} marginTop={'1.5'}>
            <Flex height={'100%'} width={'20%'} align={'center'} justify={'center'}>
                <Flex height={'80%'} aspectRatio={'1/1'} borderRadius={'50%'} border={'1px solid white'} background={'rgba(255,255,255,0.2)'} align={'center'} justify={'center'} textTransform={'capitalize'}>
                {chatObj.isGroup ? chatObj.chatname[0] : chatObj?.members[0]._id===user.id ? chatObj?.members[1]?.username[0] : chatObj?.members[0].username[0]}
                </Flex>
            </Flex>
            <Flex height={'100%'} width={'70%'} align={'center'} overflow={'hidden'} textOverflow={'ellipsis'}>
                <Flex direction={'column'} height={'80%'}>
                    <Text fontSize={'2xl'} fontWeight={'medium'} overflow={'hidden'} textOverflow={'ellipsis'}>
                        {/* {chatObj?.chatname} */}
                        {chatObj.isGroup ? chatObj.chatname : chatObj?.members[0]._id===user.id ? chatObj?.members[1]?.username : chatObj?.members[0].username}
                    </Text>
                    <Text fontSize={'md'} fontWeight={'light'} overflow={'hidden'} textOverflow={'ellipsis'}>{chatObj?.latestMsg?.messageContent}</Text>
                </Flex >
            </Flex>
        </Flex>
    )
}

export default ChatNames