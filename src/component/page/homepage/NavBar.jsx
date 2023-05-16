import React from "react"
import Logo from "../../images/logo.png"

const NavBar = () => {
    return (
        <div className="py-[10px] px-[30px] flex items-end gap-2">
            <img src={Logo} alt="logo" width="60px" className="rounded-md" />
            <div className="flex flex-col justify-end">
                <span className="text-lg font-bold text-red-700 leading-5">
                    Chicken
                </span>
                <span className="text-lg font-bold text-orange-500 leading-5">
                    Còóde
                </span>
            </div>
        </div>
    )
}

export default NavBar