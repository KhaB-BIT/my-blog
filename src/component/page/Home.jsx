import React from "react"
import { NavLink } from "react-router-dom"
import NavBar from "./NavBar"
import AboutBlog from "./AboutBlog"
import Footer from "./Footer"

const Home = () => {
    return (
        <div>
            <NavBar />

            <div className="w-[60vw] m-auto">
                <AboutBlog />
                <div className="flex flex-wrap justify-around">
                    <NavLink to="/java">
                        <div className="group flex flex-col m-3 rounded-lg overflow-hidden shadow-lg shadow-indigo-500/40 cursor-pointer hover:opacity-90">
                            <img
                                src="https://media.geeksforgeeks.org/wp-content/cdn-uploads/20230305131111/Java-programming.png"
                                alt="Java"
                                className="w-[260px] h-[150px] object-cover hover:scale-110 transition-all duration-300 ease-linear"
                            />
                            <div className="text-lg p-2">Java Basic</div>
                        </div>
                    </NavLink>

                    <NavLink to="/springboot">
                        <div className="flex flex-col m-3 rounded-lg overflow-hidden shadow-lg shadow-indigo-500/40 cursor-pointer hover:opacity-90">
                            <img
                                src="https://tvd12.com/wp-content/uploads/springboot.jpeg"
                                alt="Springboot"
                                className="w-[260px] h-[150px] object-cover hover:scale-110 transition-all duration-300 ease-linear"
                            />
                            <div className="text-lg p-2">Spring Boot</div>
                        </div>
                    </NavLink>

                    <NavLink to="/">
                        <div className="flex flex-col m-3 rounded-lg overflow-hidden shadow-lg shadow-indigo-500/40 hover:opacity-90">
                            <img
                                src="https://tienganhfree.com/wp-content/uploads/2019/12/Other-v%C3%A0-Another.png"
                                alt="Springboot"
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
