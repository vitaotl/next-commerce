import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  auth,
  currentUser
} from "@clerk/nextjs"
import Link from "next/link"
import React from "react"

const Navbar: React.FC = async () => {
  const user = await currentUser()
  return (
    <nav className="fixed top-0 w-full flex items-center justify-between py-2 px-8 z-50 bg-slate-800 text-gray-300">
      <Link
        href="/"
        className="uppercase font-bold text-md h-12 flex items-center"
      >
        Next Store
      </Link>
      <div className="flex items-center gap-8">
        <SignedIn>
          <UserButton />
        </SignedIn>
        <SignedOut>
          <SignInButton mode="modal">
            <button className="uppercase rounded-md border-gray-400 px-3 py-2">
              Fazer Login
            </button>
          </SignInButton>
        </SignedOut>
      </div>
    </nav>
  )
}

export default Navbar
