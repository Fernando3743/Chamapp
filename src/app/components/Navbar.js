'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Palette, LogIn, UserPlus } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t } = useLanguage();

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center text-2xl font-bold text-gray-900">
              <Palette className="w-8 h-8 mr-2 text-green-600" />
              ChameleonApp
            </Link>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link href="/" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                {t('home')}
              </Link>
              <Link href="/businesses" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                {t('businesses')}
              </Link>
              <Link href="/services" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                {t('services')}
              </Link>
              <Link href="/about" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                {t('about')}
              </Link>
              <Link href="/contact" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                {t('contact')}
              </Link>
            </div>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              <Link href="/login" className="flex items-center text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                <LogIn className="w-4 h-4 mr-1" />
                {t('login')}
              </Link>
              <Link href="/register" className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700">
                <UserPlus className="w-4 h-4 mr-1" />
                {t('SignUp')}
              </Link>
            </div>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-gray-900 focus:outline-none focus:text-gray-900"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
            <Link href="/" className="text-gray-600 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium">
              {t('home')}
            </Link>
            <Link href="/businesses" className="text-gray-600 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium">
              {t('businesses')}
            </Link>
            <Link href="/services" className="text-gray-600 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium">
              {t('services')}
            </Link>
            <Link href="/about" className="text-gray-600 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium">
              {t('about')}
            </Link>
            <Link href="/contact" className="text-gray-600 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium">
              {t('contact')}
            </Link>
            <Link href="/login" className="text-gray-600 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium">
              {t('login')}
            </Link>
            <Link href="/register" className="bg-blue-600 text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-700">
              {t('signup')}
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}