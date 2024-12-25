import { Flex, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react"
import Login from "../components/Login"
import Register from "../components/Register"

const HomePage = () => {

  // const navigate=useNavigate();
  
  // const {authenticated}=useContext(AuthContext);
  
//   useEffect(()=>{
//     if(authenticated){
//         navigate('/chats')
//     }
// },[authenticated,navigate])


  return (
    <Flex direction={'column'} height={'100%'} width={'100%'} align={'center'} justify={'center'}>
        <Flex height={'80%'} width={'40%'} className="card roundedCorners">    
          <Tabs size='xl' height={"100%"} width={'100%'} variant='unstyled' defaultIndex={0}>
            <TabList d="flex" justifyContent="space-evenly" borderTopRadius={'20px'} borderBottomRadius={'none'}>
              <Tab width="50%" fontWeight={"600"} borderTopRightRadius={'none'} borderTopLeftRadius={'20px'} borderBottomRadius={'none'} outline={'none'} border={'none'} _focus={{border:'none', outline:'none'}} _selected={{ color: "white", padding: "10px", width: "50%", background: "rgba(255,255,255,0.1)" }}>Login</Tab>
              <Tab width="50%" fontWeight={"600"} borderTopLeftRadius={'none'} borderTopRightRadius={'20px'} borderBottomRadius={'none'} outline={'none'} border={'none'} _focus={{border:'none', outline:'none'}} _selected={{ color: "white", padding: "10px", width: "50%", background: "rgba(255,255,255,0.1)" }}>Register</Tab>
            </TabList>
            <TabPanels height={"100%"} width={'100%'}>
              <TabPanel display={'flex'} alignItems={'center'} justifyContent={'center'} height={"100%"} width={'100%'}>
                <Login />
              </TabPanel>
              <TabPanel display={'flex'} alignItems={'center'} justifyContent={'center'} height={'100%'} width={'100%'}>
                <Register />
              </TabPanel>
            </TabPanels>
          </Tabs>

        </Flex>

    </Flex>
  )
}

export default HomePage