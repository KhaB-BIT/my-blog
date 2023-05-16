import React from "react"
import { NavLink } from "react-router-dom"
import NavBar from "./NavBar"
import AboutBlog from "./AboutBlog"
import Footer from "./Footer"
import JavaImg from "../../images/java.png"
import SpringbootImg from "../../images/springboot.jpg"
import OtherImg from "../../images/other.png"
import Snow from "./Snow"

const Home = () => {
    return (
        <div>
            <Snow />
            <NavBar />

            <div className="w-[60vw] m-auto">
                <AboutBlog />
                <div className="flex flex-wrap justify-around">
                    <NavLink to="/java">
                        <div className="group flex flex-col m-3 rounded-lg overflow-hidden shadow-lg shadow-indigo-500/40 cursor-pointer hover:opacity-90">
                            <img
                                src={JavaImg}
                                alt="Java"
                                className="w-[260px] h-[150px] object-cover hover:scale-110 transition-all duration-300 ease-linear"
                            />
                            <div className="text-lg p-2">Java Basic</div>
                        </div>
                    </NavLink>

                    <NavLink to="/springboot">
                        <div className="flex flex-col m-3 rounded-lg overflow-hidden shadow-lg shadow-indigo-500/40 cursor-pointer hover:opacity-90">
                            <img
                                src={SpringbootImg}
                                alt="Springboot"
                                className="w-[260px] h-[150px] object-cover hover:scale-110 transition-all duration-300 ease-linear"
                            />
                            <div className="text-lg p-2">Spring Boot</div>
                        </div>
                    </NavLink>

                    <NavLink to="/">
                        <div className="flex flex-col m-3 rounded-lg overflow-hidden shadow-lg shadow-indigo-500/40 hover:opacity-90">
                            <img
                                src={OtherImg}
                                alt="OtherImg"
                                className="w-[260px] h-[150px] object-cover hover:scale-110 transition-all duration-300 ease-linear"
                            />
                            <div className="text-lg p-2">
                                Tương lai sẽ làm...
                            </div>
                        </div>
                    </NavLink>
                </div>
            </div>

            <Footer />
        </div>
    )
}

export default Home
