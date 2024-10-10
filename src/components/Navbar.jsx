import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-black flex justify-between h-14 items-center px-4' >
        
        <div className="logo font-bold text-2xl text-white">
        <span className="text-purple-700"> &lt;</span>
        <span>Pass</span>
        <span className="text-purple-700">OP/&gt;</span>
        </div>
        
        <button className='max-h-10 bg-white text-black rounded-full flex justify-center items-center'>
          <img className='p-4 w-16' src="icons/github.png" alt="github" />
          <span className='px-1'>GitHub</span>
        </button>
    </nav>
  )
}

export default Navbar
