import { Flex, Text } from "@chakra-ui/react"
import { useState } from "react";

const ChatNames = ({ chat }) => {
    // console.log(chat);

    const [chatObj, setChatObj] = useState(chat);

    return (
        <Flex width={'100%'} minWidth={'100%'} overflow={'hidden'} minHeight={'100%'} direction={'row'} _hover={{ background: 'rgba(255,255,255,0.1)', cursor: 'pointer' }} marginTop={'1.5'}>
            <Flex height={'100%'} width={'20%'} align={'center'} justify={'center'}>
                <Flex height={'80%'} aspectRatio={'1/1'} borderRadius={'50%'} border={'1px solid white'}>
                </Flex>
            </Flex>
            <Flex height={'100%'} width={'70%'} align={'center'} overflow={'hidden'} textOverflow={'ellipsis'}>
                <Flex direction={'column'} height={'80%'}>
                    <Text fontSize={'2xl'} fontWeight={'medium'} overflow={'hidden'} textOverflow={'ellipsis'}>{chatObj?.chatname}</Text>
                    <Text fontSize={'md'} fontWeight={'light'} overflow={'hidden'} textOverflow={'ellipsis'}>{chatObj?.latestMsg?.messageContent}</Text>
                </Flex >
            </Flex>
        </Flex>
    )
}

export default ChatNames