import React, { useEffect, useState } from 'react';
import logo from "../assets/Pictures/Logo.png";
import ProfilePicture from "../assets/Pictures/profile_picture.png";

function Header() {
    const [login, setLogin] = useState(false);

    useEffect(() => {
        const getToken = () => localStorage.getItem("token");
        if (getToken()) {
            console.log(getToken())
            setLogin(true);
        }
    }, [])

    return (
        <div className="w-full h-28 p-4 flex items-center justify-between">
            <img src={logo} alt="logo" className='h-full' />
            {
                login ? <div className='flex h-full justify-center items-center gap-3'>
                    <button className='bg-red-100 p-1 px-4 h-10 rounded text-red-600'>
                        <i class="fa-solid fa-right-from-bracket mr-2"></i>
                        Logout
                    </button>
                    <img src={ProfilePicture} alt="logo" className='h-14 rounded-full' />
                </div> : ''
            }

        </div>
    );
}

export default Header;
