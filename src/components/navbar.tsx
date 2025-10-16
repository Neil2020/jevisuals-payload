'use client'

import React, { useState } from 'react'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <nav className="fixed top-0 left-0 w-full z-50  bg-opacity-50 backdrop-blur-sm">
      <div className="flex justify-between items-center px-6 py-4">
        {/* Logo placeholder */}
        <div className="flex items-center">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
            <span className="text-black font-bold text-lg">JE</span>
          </div>
        </div>

        {/* Hamburger Menu */}
        <button
          onClick={toggleMenu}
          className="flex flex-col justify-center items-center w-8 h-8 space-y-1.5 focus:outline-none"
          aria-label="Toggle menu"
        >
          <span
            className={`block w-6 h-0.5 bg-white transition-transform duration-300 ${
              isMenuOpen ? 'rotate-45 translate-y-2' : ''
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-white transition-opacity duration-300 ${
              isMenuOpen ? 'opacity-0' : ''
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-white transition-transform duration-300 ${
              isMenuOpen ? '-rotate-45 -translate-y-2' : ''
            }`}
          />
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-black bg-opacity-90 backdrop-blur-sm">
          <div className="flex flex-col space-y-4 px-6 py-8">
            <a href="#" className="text-white text-lg hover:text-gray-300 transition-colors">
              Home
            </a>
            <a href="#" className="text-white text-lg hover:text-gray-300 transition-colors">
              About
            </a>
            <a href="#" className="text-white text-lg hover:text-gray-300 transition-colors">
              Work
            </a>
            <a href="#" className="text-white text-lg hover:text-gray-300 transition-colors">
              Contact
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar