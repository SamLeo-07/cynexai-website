// src/components/Header.tsx
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const navItems = [
  { name: 'Home',    href: '/' },
  { name: 'Courses', href: '#courses' },
  { name: 'Skills',  href: '#skills' },
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
    setIsOpen(false);

    if (href === '/') {
      navigate('/');
    } else if (href.startsWith('#')) {
      // navigate to home with hash → ScrollToTop will scrollIntoView (assuming you have this setup)
      navigate(`/${href}`);
    } else {
      navigate(href);
    }
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
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
              className="h-12 w-12 lg:h-16 lg:w-16 object-contain" // Made logo bigger
            />
          </a>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map(({ name, href }) => {
              const isActive =
                href === '/'
                  ? location.pathname === '/'
                  : !href.startsWith('#') && location.pathname === href;

              return (
                <a
                  key={name}
                  href={href}
                  onClick={(e) => handleNavClick(href, e)}
                  className={`relative font-medium transition-colors duration-200 group ${
                    scrolled
                      ? isActive ? 'text-white' : 'text-gray-100 hover:text-white' // White text when scrolled
                      : isActive ? 'text-black' : 'text-gray-700 hover:text-black' // Black text when not scrolled
                  }`}
                >
                  {name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#D4AC34] transition-all duration-300 group-hover:w-full" /> {/* Gold underline */}
                </a>
              );
            })}
          </nav>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsOpen((o) => !o)}
            className={`lg:hidden p-2 ${
              scrolled ? 'text-white hover:text-gray-100' : 'text-black hover:text-gray-700' // Toggle color based on scroll
            }`}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden overflow-hidden bg-white/95 backdrop-blur-md rounded-lg mt-2 shadow-lg" // White background for mobile menu
            >
              <div className="px-4 py-4 space-y-3">
                {navItems.map(({ name, href }) => (
                  <a
                    key={name}
                    href={href}
                    onClick={(e) => handleNavClick(href, e)}
                    className="block text-black hover:text-[#D4AC34] transition-colors duration-200 py-2" // Black text, gold on hover for mobile
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