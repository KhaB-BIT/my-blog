import React from "react"
import { NavLink } from "react-router-dom"

const Home = () => {
    return (
        <div>
            <div className="w-[100vw] flex flex-wrap">
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
                            src="https://miro.medium.com/v2/resize:fit:900/0*t61rpXrvkpesX_8U.jpg"
                            alt="Springboot"
                            className="w-[260px] h-[150px] object-cover hover:scale-110 transition-all duration-300 ease-linear"
                        />
                        <div className="text-lg p-2">Spring Boot</div>
                    </div>
                </NavLink>
            </div>
        </div>
    )
}

export default Home
