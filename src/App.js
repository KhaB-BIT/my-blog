import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import "primereact/resources/themes/lara-light-indigo/theme.css"
import "primereact/resources/primereact.min.css"
import Home from "./component/page/Home"
import Admin from "./component/page/Admin"
import ListLesson from "./component/page/ListLesson"
import Login from "./component/page/Login"

function App() {
    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route path="/java" element={<ListLesson />} />
                    <Route path="/springboot" element={<ListLesson />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/admin" element={<Admin />} />
                </Routes>
            </Router>
        </div>
    )
}

export default App
