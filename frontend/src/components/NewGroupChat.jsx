import { FormControl, FormLabel, Input } from "@chakra-ui/react"
import { useState } from "react"

const NewGroupChat = () => {

    const [chatGroupName, setChatGroupName] = useState('');
    const [chatGroupNameLength, setChatGroupNameLength] = useState(0);

    return (
        <FormControl>
            <FormLabel>Enter Chat Name below{`(${chatGroupNameLength}/50)`}:</FormLabel>
            <Input type="text" value={chatGroupName} maxLength={'50'} onChange={(e) => { e.preventDefault(); setChatGroupName(e.target.value); setChatGroupNameLength(e.target.value.length) }} />
        </FormControl>
    )
}

export default NewGroupChat