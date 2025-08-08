'use client'

import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import Link from 'next/link'
import { useAuth } from '@/app/contexts/AuthContext'

export default function UserDropdown({ user, isOpen, onClose }) {
  const { signOut } = useAuth()
  const dropdownRef = useRef(null)
  
  useEffect(() => {
    if (!isOpen) return

    // Close dropdown when clicking outside
    const handleClickOutside = (e) => {
      // Check if click is outside dropdown and not on the user button
      const userButton = document.querySelector('[aria-label="User menu"]')
      if (
        dropdownRef.current && 
        !dropdownRef.current.contains(e.target) &&
        userButton &&
        !userButton.contains(e.target)
      ) {
        onClose()
      }
    }

    // Close dropdown on escape key
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleEscape)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, onClose])
  
  const handleSignOut = async () => {
    await signOut()
    onClose()
  }

  if (!isOpen) return null

  // Only render portal after component mounts (client-side only)
  if (typeof window === 'undefined') return null

  return createPortal(
    <div 
      ref={dropdownRef}
      className="fixed top-[100px] right-6 lg:right-12 w-64 z-[9999] glass-darker backdrop-blur-2xl rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] animate-fadeIn"
      role="menu"
      aria-label="User menu dropdown"
    >
      {/* User Info Section */}
      <div className="p-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-primary-gradient flex items-center justify-center text-white font-semibold text-lg shrink-0">
            {user.email ? user.email[0].toUpperCase() : 'U'}
          </div>
          <div className="min-w-0">
            <p className="font-semibold text-white truncate">
              {user.email?.split('@')[0] || 'User'}
            </p>
            <p className="text-sm text-white/60 truncate">{user.email}</p>
          </div>
        </div>
      </div>
              
      {/* Menu Items */}
      <div className="p-2">
        <Link 
          href="/dashboard" 
          className="flex items-center gap-3 px-4 py-3 text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-200"
          onClick={onClose}
          role="menuitem"
        >
          <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <span>Dashboard</span>
        </Link>
        
        <Link 
          href="/settings" 
          className="flex items-center gap-3 px-4 py-3 text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-200"
          onClick={onClose}
          role="menuitem"
        >
          <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span>Settings</span>
        </Link>
        
        <div className="my-2 border-t border-white/10"></div>
        
        <button 
          onClick={handleSignOut}
          className="flex items-center gap-3 w-full px-4 py-3 text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-200 text-left"
          role="menuitem"
        >
          <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          <span>Sign Out</span>
        </button>
      </div>
    </div>,
    document.body
  )
}