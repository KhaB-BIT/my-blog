import React from "react"

const HeaderLesson = ({ location }) => {
    return (
        <>
            {location.pathname === "/java" ? (
                <div className="flex">
                    <div>
                        <h1 className="text-3xl font-bold mb-3">Java Basic</h1>
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
                            Springboot Basic
                        </h1>
                        <p>
                            Một framework mạnh mẽ mà bất kì Java Developer nào
                            cũng phải biết!
                        </p>
                    </div>
                    <div className="rounded-lg overflow-hidden">
                        <img
                            src="https://miro.medium.com/v2/resize:fit:900/0*t61rpXrvkpesX_8U.jpg"
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
