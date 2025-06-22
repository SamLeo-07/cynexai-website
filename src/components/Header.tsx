// src/components/Header.tsx
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'Courses', href: '#courses' },
  { name: 'Skills', href: '#skills' },
  { name: 'Reviews', href: '#reviews' },
  { name: 'Contact', href: '#contact' }
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string, e: React.MouseEvent) => {
    e.preventDefault();
    setIsOpen(false); // Close mobile menu on click

    // Check if the current path is already the root ('/')
    // If it is, and the href is a hash link, use scrollIntoView directly
    if (location.pathname === '/' && href.startsWith('#')) {
      const element = document.getElementById(href.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (href.startsWith('#')) {
      // If not on the home page, navigate to home and then let the effect/layout handle scroll
      navigate(`/${href}`);
    } else {
      // For absolute paths
      navigate(href);
    }
  };


  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      // Changed to 'fixed' instead of 'sticky' for universal top-sticking
      // Added w-full for full width
      // Added z-50 to ensure it's always on top
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#D4AC34]/95 backdrop-blur-md border-b border-[#D4AC34]/20' // Gold background when scrolled
          : 'bg-transparent' // Transparent background when not scrolled
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-20">
          {/* Logo */}
          <a
            href="/"
            onClick={(e) => handleNavClick('/', e)}
            className="flex items-center space-x-3"
          >
            <img
              src="/CynexAI.in.svg"
              alt="CynexAI Logo"
              className="h-12 w-12 lg:h-16 lg:w-22 object-contain" // Made logo bigger
            />
            {/* Added the text logo back, using black when transparent, white when gold */}
            <span
                className={`font-display font-bold text-2xl lg:text-3xl transition-colors duration-200 ${
                    scrolled ? 'text-white' : 'text-black'
                }`}
            >
                CynexAI
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map(({ name, href }) => {
              // isActive logic for actual routes vs. hash links on home
              const isActive =
                href === '/'
                  ? location.pathname === '/' && location.hash === ''
                  : href.startsWith('#') // For hash links, check if we're on the home page and that hash is active
                    ? location.pathname === '/' && location.hash === href
                    : location.pathname === href; // For actual routes

              return (
                <a
                  key={name}
                  href={href}
                  onClick={(e) => handleNavClick(href, e)}
                  className={`relative font-medium transition-colors duration-200 group ${
                    scrolled
                      ? isActive ? 'text-white' : 'text-gray-100 hover:text-white' // White text when scrolled
                      : isActive ? 'text-black' : 'text-black hover:text-gray-700' // Black text when not scrolled, black for active
                  }`}
                >
                  {name}
                  {/* Active indicator (gold underline) */}
                  <span
                    className={`absolute -bottom-1 left-0 h-0.5 bg-[#D4AC34] transition-all duration-300 ${
                      isActive ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  />
                </a>
              );
            })}
          </nav>

          {/* Mobile toggle button - ALWAYS visible on smaller screens */}
          <button
            onClick={() => setIsOpen((o) => !o)}
            className={`lg:hidden p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D4AC34] ${
              scrolled ? 'text-white hover:text-gray-100' : 'text-black hover:text-gray-700' // Toggle color based on scroll
            }`}
            aria-label="Toggle navigation"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />} {/* Increased icon size for better tap target */}
          </button>
        </div>

        {/* Mobile menu content */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="lg:hidden overflow-hidden bg-white/95 backdrop-blur-md rounded-lg mt-2 shadow-lg" // White background for mobile menu
            >
              <div className="px-4 py-4 space-y-3">
                {navItems.map(({ name, href }) => (
                  <a
                    key={name}
                    href={href}
                    onClick={(e) => handleNavClick(href, e)}
                    className="block text-black hover:text-[#D4AC34] transition-colors duration-200 py-2 text-lg font-medium" // Black text, gold on hover for mobile
                  >
                    {name}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}