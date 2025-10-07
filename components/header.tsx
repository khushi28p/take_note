"use client"

import React from 'react'
import { Button } from './ui/button'
import { signIn, signOut, useSession } from 'next-auth/react'

const Header = () => {
  const {data: session} = useSession();
  const isLoggedIn = !!session;
  
  return (
    <nav className='sticky top-0 z-50 w-full bg-background/95 backdrop-blur-sm flex justify-between items-center py-4 px-6 sm:px-12 border-b border-border shadow-md animate-fade-in-down'>
      {/* Logo - Using primary text for high contrast and tracking-wider for style */}
      <span className='font-extrabold text-2xl tracking-wider text-primary'>take_note</span>
      
      {/* CTA Button - Styled as a secondary, attention-grabbing button */}
      {isLoggedIn ? <Button 
      onClick={() => signOut({callbackUrl: "/"})}
        className='bg-secondary text-secondary-foreground hover:bg-secondary/80 border border-secondary-foreground/20 transition-all duration-300 transform hover:scale-[1.05]'
      >
        Logout
      </Button> :<Button 
      onClick={() => signIn("github", {callbackUrl: "/dashboard"})}
        className='bg-secondary text-secondary-foreground hover:bg-secondary/80 border border-secondary-foreground/20 transition-all duration-300 transform hover:scale-[1.05]'
      >
        Sign In
      </Button>}
    </nav>
  )
}

export default Header
