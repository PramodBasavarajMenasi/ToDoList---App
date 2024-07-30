import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex justify-around bg-violet-950 text-white p-2'>
        <div className="flex justify-center ">
            <span className='font-bold text-xl hover:cursor-pointer'>iTask</span>
        </div>
        <ul className="flex gap-7 ">
            <li className='hover:cursor-pointer hover:font-bold transition-all duration-500'>Home</li>
            <li className='hover:cursor-pointer  hover:font-bold transition-all duration-500'>Your Tasks</li>
        </ul>
    </nav>
  )
}

export default Navbar
 