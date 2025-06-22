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

    if (location.pathname === '/' && href.startsWith('#')) {
      const element = document.getElementById(href.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (href.startsWith('#')) {
      navigate(`/${href}`);
    } else {
      navigate(href);
    }
  };


  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#D4AC34]/95 backdrop-blur-md border-b border-[#D4AC34]/20'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Adjusted header height to accommodate larger logo */}
        {/* Using h-20 for default and h-24 for large screens */}
        <div className="flex justify-between items-center h-20 lg:h-24"> {/* Changed to h-20 lg:h-24 */}
          {/* Logo */}
          <a
            href="/"
            onClick={(e) => handleNavClick('/', e)}
            className="flex items-center space-x-3"
          >
            <img
              src="/CynexAI.in.svg"
              alt="CynexAI Logo"
              // Increased logo image size here: h-16 w-16 lg:h-20 lg:w-20
              className="h-16 w-16 lg:h-20 lg:w-20 object-contain"
            />
            <span
                // Increased font size for the text logo: text-3xl lg:text-4xl
                className={`font-display font-bold text-3xl lg:text-4xl transition-colors duration-200 ${
                    scrolled ? 'text-white' : 'text-black'
                }`}
            >
                CynexAI
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map(({ name, href }) => {
              const isActive =
                href === '/'
                  ? location.pathname === '/' && location.hash === ''
                  : href.startsWith('#')
                    ? location.pathname === '/' && location.hash === href
                    : location.pathname === href;

              return (
                <a
                  key={name}
                  href={href}
                  onClick={(e) => handleNavClick(href, e)}
                  className={`relative font-medium transition-colors duration-200 group ${
                    scrolled
                      ? isActive ? 'text-white' : 'text-gray-100 hover:text-white'
                      : isActive ? 'text-black' : 'text-black hover:text-gray-700'
                  }`}
                >
                  {name}
                  <span
                    className={`absolute -bottom-1 left-0 h-0.5 bg-[#D4AC34] transition-all duration-300 ${
                      isActive ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  />
                </a>
              );
            })}
          </nav>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsOpen((o) => !o)}
            className={`lg:hidden p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D4AC34] ${
              scrolled ? 'text-white hover:text-gray-100' : 'text-black hover:text-gray-700'
            }`}
            aria-label="Toggle navigation"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="lg:hidden overflow-hidden bg-white/95 backdrop-blur-md rounded-lg mt-2 shadow-lg"
            >
              <div className="px-4 py-4 space-y-3">
                {navItems.map(({ name, href }) => (
                  <a
                    key={name}
                    href={href}
                    onClick={(e) => handleNavClick(href, e)}
                    className="block text-black hover:text-[#D4AC34] transition-colors duration-200 py-2 text-lg font-medium"
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