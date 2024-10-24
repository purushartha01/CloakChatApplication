/* eslint-disable react/prop-types */
import { Flex, Input, InputGroup, InputRightElement } from "@chakra-ui/react"
import { IoMdSend } from "react-icons/io"

const Chat = ({ chatData }) => {


    console.log(chatData)
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
                {chatData.messages.length > 0 ?
                    (chatData?.messages.map((msg) => {
                        return (
                            <Flex key={msg.id} height={'5vh'}>
                                {msg}
                            </Flex>
                        )
                    })) : (
                        <Flex></Flex>
                    )}
            </Flex>
            <Flex height={'5vh'} width={'100%'}>
                <InputGroup height={'100%'} width={'100%'} sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', border: '2px solid white' }}>
                    <Input height={'100%'} width={'80%'} sx={{ borderRadius: 'none', borderWidth: '0 2px 0 0', outline: 'none' }} _active={{ outline: 'none' }} _focus={{ outline: 'none' }} placeholder="Enter message here">

                    </Input>
                    <InputRightElement height={'100%'} width={'20%'} sx={{ borderRadius: 'none' }}>
                        <IoMdSend size={25} className="chatIcons" />
                    </InputRightElement>
                </InputGroup>
            </Flex>
        </Flex>
    )
}

export default Chat