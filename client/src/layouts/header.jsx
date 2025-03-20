import React from 'react'
import logo from "../assets/Pictures/Logo.png";

function Header() {
    return (
        <>
            <div className="w-full h-28 p-4 flex items-center">
                <img src={logo} alt="logo" className='h-full' />
            </div>
        </>
    )
}

export default Header