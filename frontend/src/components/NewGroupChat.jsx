import { Flex, FormControl, FormLabel, Input } from "@chakra-ui/react"
import { useEffect, useState } from "react"

const NewGroupChat = (props) => {

    const [chatGroupName, setChatGroupName] = useState('');
    const [usersList,setUsersList]=useState([]);
    const [chatGroupNameLength, setChatGroupNameLength] = useState(0);

    useEffect(()=>{

        setUsersList(props.usersList)

    },[usersList]);

    return (
        <Flex width={'100%'} height={'100%'}>
            <FormControl>
                <FormLabel>Enter Chat Name below{`(${chatGroupNameLength}/50)`}:</FormLabel>
                <Input type="text" outline={'1px solid blue'} value={chatGroupName} maxLength={'50'} onChange={(e) => { e.preventDefault(); setChatGroupName(e.target.value); setChatGroupNameLength(e.target.value.length) }} />
            </FormControl>
            <
        </Flex>
    )
}

export default NewGroupChat