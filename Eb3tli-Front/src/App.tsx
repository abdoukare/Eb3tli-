import { Route, Routes } from "react-router";
import Auth from "./pages/Auth/Auth";
import Chat from "./pages/Chat/Chat";
import {Toaster} from "sonner"

const App: React.FC = () => {
  return (
    <>
      {/* <p className="text-2xl font-bold text-blue-500">Welcome to Eb3tli app</p> */}
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route path="/chat" element={<Chat />} />

      </Routes>
      <Toaster/>

      
    </>
  )
}

export default App;