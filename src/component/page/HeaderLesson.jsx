import React from "react"
import { useNavigate } from "react-router-dom"

const HeaderLesson = ({ location }) => {
    const navigate = useNavigate()
    return (
        <>
            {location.pathname === "/java" ? (
                <div className="flex">
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
                            src="https://media.geeksforgeeks.org/wp-content/cdn-uploads/20230305131111/Java-programming.png"
                            alt="java"
                            className="max-w-[400px]"
                        />
                    </div>
                </div>
            ) : (
                <div className="flex">
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
                            src="https://tvd12.com/wp-content/uploads/springboot.jpeg"
                            alt="Springboot"
                            className="max-w-[400px]"
                        />
                    </div>
                </div>
            )}
        </>
    )
}

export default HeaderLesson
