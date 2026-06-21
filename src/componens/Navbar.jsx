import React from 'react'
import { Link } from 'react-router-dom';


const Navbar = () => {
    return (
        <nav className='bg-gray-900 p-4 shadow-md'>
            <div className='max-w-7xl mx-auto px-4'>
                <div className='flex justify-between items-center h-7'>
                    <div className='text-xl font-bold text-white'>
                        Arshdeep's AuraFlix
                    </div>
                    <div className='space-x-6 text-white'>
                        <Link to="/">Movies</Link>
                        <Link to="/watchlist">Watchlist</Link>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar