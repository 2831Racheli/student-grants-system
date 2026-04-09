import { Provider } from "react-redux"
import s from "./redux/store"
// import { Products } from "./Products"
 import { AddUser } from "./components/AddUser"
import { Login } from "./components/Login"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Routing } from "./routing/Routing"
import { Nav } from "./routing/Nav"
import { Home } from "./components/Home"
import { ViewStatus } from "./components/ViewStatus"
import { ViewRequests } from "./components/ViewRequests"
import { DisplayDetails } from "./components/DisplayDetails"

export const Main = () => {
    return <>
        {/* מפה שמתי בהערה שייך לREDUX */}
       <Provider store={s}>
        
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<><Nav /><Home /></>}></Route>
                <Route path="/home" element={<><Nav /><Home /></>}></Route>
                <Route path="/login" element={<><Nav /><Login /></>}></Route>
                <Route path="/add-user" element={<><Nav /><AddUser /></>}></Route>
                <Route path="/main" element={<><Nav /><Routing /></>}></Route>
                <Route path="/viewStatus" element={<><Nav /><ViewStatus /></>}></Route>
                <Route path="/viewRequests" element={<><Nav /><ViewRequests /></>}></Route>
                <Route path="/displayDetails/:id" element={<><Nav /><DisplayDetails /></>}></Route>
            </Routes>
        </BrowserRouter>
     </Provider>
    </>
}