// src/components/Header.tsx
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const navItems = [
  { name: 'Home',   href: '/' },
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
    window.addEventListener('scroll', () => setScrolled(window.scrollY > 50));
    return () => window.removeEventListener('scroll', () => {});
  }, []);

  const handleNavClick = (href: string, e: React.MouseEvent) => {
    e.preventDefault();
    setIsOpen(false);

    if (href === '/') {
      navigate('/');
    } else if (href.startsWith('#')) {
      // navigate to home with hash → ScrollToTop will scrollIntoView
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
          ? 'bg-[#D4AC34]/95 backdrop-blur-md border-b border-[#D4AC34]/20'
          : 'bg-transparent'
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
              className="h-10 w-10 lg:h-12 lg:w-12 object-contain"
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
                    isActive ? 'text-white' : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-cyan-400 transition-all duration-300 group-hover:w-full" />
                </a>
              );
            })}
          </nav>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsOpen((o) => !o)}
            className="lg:hidden text-gray-300 hover:text-white p-2"
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
              className="lg:hidden overflow-hidden bg-slate-800/95 backdrop-blur-md rounded-lg mt-2"
            >
              <div className="px-4 py-4 space-y-3">
                {navItems.map(({ name, href }) => (
                  <a
                    key={name}
                    href={href}
                    onClick={(e) => handleNavClick(href, e)}
                    className="block text-gray-300 hover:text-white transition-colors duration-200 py-2"
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
