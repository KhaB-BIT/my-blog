import React, { useMemo } from "react"
import { NavLink } from "react-router-dom"
import NavBar from "./NavBar"
import AboutBlog from "./AboutBlog"
import Footer from "./Footer"
import JavaImg from "../../images/java.webp"
import SpringbootImg from "../../images/springboot.webp"
import OtherImg from "../../images/other.webp"
import Snow from "./Snow"

const Home = () => {
    const sources = useMemo(() => {
        return [
            {
                url: "/java",
                src: JavaImg,
                alt: "Source Java",
                title: "Java Basic",
            },
            {
                url: "/springboot",
                src: SpringbootImg,
                alt: "Source Springboot",
                title: "Spring Boot Basic",
            },
            {
                url: "/",
                src: OtherImg,
                alt: "Tương lai sẽ làm...",
                title: "Tương lai sẽ làm...",
            },
        ]
    }, [])
    return (
        <div>
            <Snow />
            <NavBar />

            <div className="w-full lg:w-[60vw] px-[15px] m-auto">
                <AboutBlog />
                <div className="flex flex-wrap justify-around">
                    {sources.map((item, index) => {
                        return (
                            <NavLink to={item.url} key={index}>
                                <div className="group flex flex-col m-3 rounded-lg overflow-hidden shadow-lg shadow-indigo-500/40 cursor-pointer hover:opacity-90">
                                    <img
                                        src={item.src}
                                        alt={item.alt}
                                        className="w-[320px] lg:w-[270px] h-[150px] object-cover hover:scale-110 transition-all duration-300 ease-linear"
                                    />
                                    <div className="text-lg p-2">
                                        {item.title}
                                    </div>
                                </div>
                            </NavLink>
                        )
                    })}
                </div>
            </div>

            <Footer />
        </div>
    )
}

export default Home
