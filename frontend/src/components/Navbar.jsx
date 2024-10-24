import {Flex, Heading, Image } from "@chakra-ui/react"
import Logo from './../assets/bg6.jpg'

const Navbar = () => {
  return (
    <Flex position={'sticky'} top={'0'} direction={"row"} height={"10vh"} width={"100%"}>
      <Flex direction={"row"} height={"100%"} width={"100%"} align={"center"} justify={"center"}>
        <Flex height={"90%"} justify={'space-around'} align={'center'}>
          <Image borderRadius={"full"} height={"80%"} aspectRatio={'1/1'} src={Logo} title="CloakChat" />
          <Heading marginLeft={'1vw'}>CloakChat</Heading>
        </Flex>
      </Flex>

    </Flex>
  )
}

export default Navbar