import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../layouts/header';
import NotFount404Image from "../assets/Pictures/404.png";



export const NotFound404 = () => {
    const navigate = useNavigate();
    return (
        <>
            <Header />
            <div className='flex flex-col items-center justify-center'>
                <img src={NotFount404Image} alt="" />
                <p className='text-5xl mb-7'>Sorry, its look like the page get</p>
                <button onClick={() => navigate('/')}
                    className='button-style text-white rounded'
                >
                    Back to Home
                </button>
            </div>

        </>
    );
};

