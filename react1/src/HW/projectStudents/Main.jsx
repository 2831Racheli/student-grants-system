import { Provider } from "react-redux"
import s from "./redux/store"
import { AddUser } from "./components/AddUser"
import { Login } from "./components/Login"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Nav } from "./routing/Nav"
import { Home } from "./components/Home"
import { ViewStatus } from "./components/ViewStatus"
import { ViewRequests } from "./components/ViewRequests"
import { DisplayDetails } from "./components/DisplayDetails"
import { Father } from "./ApplicationForm/Father"

export const Main = () => {
    return (
       <Provider store={s}>
        <BrowserRouter>
            <Nav />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/add-user" element={<AddUser />} />
                {/* ניתוב ישיר ל-Father שמשחרר את הנעילה */}
                <Route path="/main" element={<Father />} /> 
                <Route path="/viewStatus" element={<ViewStatus />} />
                <Route path="/viewRequests" element={<ViewRequests />} />
                <Route path="/displayDetails/:id" element={<DisplayDetails />} />
            </Routes>
        </BrowserRouter>
     </Provider>
    )
}