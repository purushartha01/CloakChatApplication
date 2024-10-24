import { RouterProvider } from "react-router-dom"
import useRouters from "./contexts/routerContext"



const App = () => {
  const routes = useRouters();
  return (
      <RouterProvider router={routes} />
  )
}

export default App