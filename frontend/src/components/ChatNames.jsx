import { Flex } from "@chakra-ui/react"

const ChatNames = ({ chat }) => {
    console.log(chat._id);
    return (
        <Flex width={'100%'} minHeight={'100%'} direction={'row'} _hover={{background:'rgba(255,255,255,0.1)',cursor:'pointer'}}>
            <Flex height={'100%'} width={'30%'} align={'center'} justify={'center'}>
                <Flex height={'80%'} aspectRatio={'1/1'} borderRadius={'50%'} border={'1px solid white'}>
                </Flex>
            </Flex>
            <Flex height={'100%'} width={'70%'} align={'center'}>
                <Flex direction={'column'} height={'80%'}>
                    <Flex fontSize={'2xl'} fontWeight={'medium'}>{chat?.chatname || chat?.username}</Flex>
                    <Flex fontSize={'3xs'} fontWeight={'light'}>{chat?.latestMsg}</Flex>
                </Flex >
            </Flex>
        </Flex>
    )
}

export default ChatNames