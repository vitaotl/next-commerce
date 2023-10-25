import Link from "next/link"
import React from "react"

const Navbar: React.FC = () => {
  return (
    <nav className="fixed top-0 w-full flex items-center justify-between py-2 px-8 z-50 bg-slate-800 text-gray-300">
      <Link
        href="/"
        className="uppercase font-bold text-md h-12 flex items-center"
      >
        Next Store
      </Link>
    </nav>
  )
}

export default Navbar
