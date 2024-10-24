import { Outlet } from "react-router-dom"
import Navbar from "./Navbar"


const BaseLayout = () => {
  return (
    <>
    <Navbar/>
    <Outlet/>
    </>
  )
}

export default BaseLayout