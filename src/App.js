import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import "primereact/resources/themes/lara-light-indigo/theme.css"
import "primereact/resources/primereact.min.css"
import Home from "./component/page/homepage/Home"
import Login from "./component/page/loginpage/Login"
import Admin from "./component/page/adminpage/Admin"
import LessonDetail from "./component/page/detailpage/LessonDetail"
import ListLesson from "./component/page/lessonpage/ListLesson"
import NotFoundPage from "./component/page/notfoundpage/NotFoundPage"
import { createContext } from "react"
import { useState } from "react"

export const MyContext = createContext()

function App() {
    const [source, setSource] = useState()

    return (
        <MyContext.Provider value={{ source, setSource }}>
            <div className="App">
                <Router>
                    <Routes>
                        <Route exact path="/" element={<Home />} />
                        <Route path="/java" element={<ListLesson />} />
                        <Route path="/java/:id" element={<LessonDetail />} />
                        <Route
                            path="/springboot/:id"
                            element={<LessonDetail />}
                        />
                        <Route path="/springboot" element={<ListLesson />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/admin" element={<Admin />} />
                        <Route path="*" element={<NotFoundPage />} />
                    </Routes>
                </Router>
            </div>
        </MyContext.Provider>
    )
}

export default App
