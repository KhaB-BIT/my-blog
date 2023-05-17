import React from "react"
import NotFound from "../../images/notfound.webp"

const NotFoundPage = () => {
    return (
        <div className="w-[100vw] h-[100vh] flex justify-center items-center">
            <img src={NotFound} alt="not found" className="w-[500px]" />
        </div>
    )
}

export default NotFoundPage
