import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./component/Home"
import Admin from "./component/Admin"
import "primereact/resources/themes/lara-light-indigo/theme.css"
import "primereact/resources/primereact.min.css"

function App() {
    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route path="/admin" element={<Admin />} />
                </Routes>
            </Router>
        </div>
    )
}

export default App
