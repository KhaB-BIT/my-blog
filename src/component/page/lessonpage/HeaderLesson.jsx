import React from "react"
import { useNavigate } from "react-router-dom"
import JavaImg from "../../images/java.webp"
import SpringbootImg from "../../images/springboot.webp"

const HeaderLesson = ({ location }) => {
    const navigate = useNavigate()
    return (
        <>
            {location.pathname === "/java" ? (
                <div className="flex flex-col lg:flex-row justify-center items-center">
                    <div>
                        <h1 className="text-3xl font-bold mb-3">
                            Java Basic{" "}
                            <span
                                className="cursor-pointer"
                                onClick={() => navigate("/")}
                            >
                                🏠
                            </span>
                        </h1>
                        <p>
                            Một ngôn ngữ mạnh mẽ lâu đời và khó bị thay thế.
                            Code 1 lần chạy mọi nơi!
                        </p>
                    </div>
                    <div className="rounded-lg overflow-hidden">
                        <img
                            src={JavaImg}
                            alt="java"
                            className="max-w-[400px] rounded-lg mt-2"
                        />
                    </div>
                </div>
            ) : (
                <div className="flex flex-col lg:flex-row justify-center items-center">
                    <div>
                        <h1 className="text-3xl font-bold mb-3">
                            Springboot Basic{" "}
                            <span
                                className="cursor-pointer"
                                onClick={() => navigate("/")}
                            >
                                🏠
                            </span>
                        </h1>
                        <p>
                            Một framework mạnh mẽ mà bất kì Java Developer nào
                            cũng phải biết!
                        </p>
                    </div>
                    <div className="rounded-lg overflow-hidden">
                        <img
                            src={SpringbootImg}
                            alt="java"
                            className="max-w-[400px] rounded-lg mt-2"
                        />
                    </div>
                </div>
            )}
        </>
    )
}

export default HeaderLesson
