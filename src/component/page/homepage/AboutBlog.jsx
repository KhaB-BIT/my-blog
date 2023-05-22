import React from "react"
import Tree from "../../images/tree.webp"
import { useNavigate } from "react-router-dom"

const AboutBlog = () => {
    const navigate = useNavigate()
    return (
        <div className="flex flex-col lg:flex-row my-7 justify-center items-center">
            <div>
                <h1 className="text-4xl font-bold">Câu chuyện là...</h1>
                <p className="mt-5">
                    Web site này được một Frontend developer code 🐔 dựng lên để
                    học Java và Springboot. Học bằng cách trình bày lại là một
                    phương pháp coi bộ cũng lạ 😆. Tương lai mình còn làm thêm
                    nhiều cái nữa, còn có hay không thì hên xui
                </p>
                <p className="mt-5">
                    Bên cạnh đó cũng chia sẻ kiến thức cho ai vô tình tìm được
                    cái blog củ chuối này 😊
                </p>
            </div>

            <img
                src={Tree}
                alt="abc"
                width="300px"
                className="cursor-pointer mt-2"
                onDoubleClick={() => navigate("/login")}
            />
        </div>
    )
}

export default AboutBlog
