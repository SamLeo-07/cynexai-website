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
  const [scrolled, setScrolled] = useState(false); // Tracks if page is scrolled (for non-brochure pages)
  const location = useLocation();
  const navigate = useNavigate();

  // Determine if the current page is the brochure page
  const isBrochurePage = location.pathname === '/brochure';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50); // Update scrolled state based on scroll position
    };

    if (isBrochurePage) {
      // If it's the brochure page, force 'scrolled' to true to make header white
      setScrolled(true);
      // Remove scroll listener as it's always white on this page
      window.removeEventListener('scroll', handleScroll);
    } else {
      // On other pages, listen to scroll events for transparent/white behavior
      setScrolled(window.scrollY > 50); // Initial check on page load
      window.addEventListener('scroll', handleScroll);
    }

    // Cleanup function for the effect
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isBrochurePage]); // Re-run effect if isBrochurePage changes

  // Determine header background and text color based on scroll and page
  const headerBgClass = isBrochurePage || scrolled
    ? 'bg-white text-gray-900 shadow-md' // White background, dark text for brochure or when scrolled
    : 'bg-transparent text-white'; // Transparent background, white text when not scrolled (on other pages)

  // --- IMPORTANT: Using only one logo file ---
  // This logo (CynexAI Logo new (1).png) is assumed to be dark-colored.
  // It will be visible on white backgrounds (brochure page, or scrolled on other pages).
  // It will be difficult or impossible to see on transparent backgrounds (home page, not scrolled).
  const logoSrc = "/CynexAI Logo new (1).png"; // Path to your single logo file

  // Determine nav link text color based on header background
  const navLinkTextColorClass = isBrochurePage || scrolled
    ? 'text-gray-700 hover:text-[#41c8df]' // Dark text on white header
    : 'text-white hover:text-yellow-400'; // Light text on transparent header

  const handleNavClick = (href: string, e: React.MouseEvent) => {
    e.preventDefault(); // Always prevent default, we're handling navigation
    setIsOpen(false); // Close mobile menu on click
    // console.log(`[Header] Link clicked: ${href}`);
    // console.log(`[Header] Current path: ${location.pathname}, Current hash: ${location.hash}`);

    if (href.startsWith('/')) { // It's a regular path like '/' or '/brochure'
      navigate(href);
      // console.log(`[Header] Navigating to path: ${href}`);
    } else if (href.startsWith('#')) { // It's a hash link like '#courses'
      const targetId = href.substring(1);

      if (location.pathname === '/') {
        // If we are already on the home page, just scroll to the element
        // console.log(`[Header] On home page. Attempting to scroll to ID: ${targetId}`);
        const element = document.getElementById(targetId);

        if (element) {
          // console.log(`[Header] FOUND element with ID: ${targetId}. Scheduling scroll.`);
          setTimeout(() => {
            element.scrollIntoView({ behavior: 'smooth' });
            // console.log(`[Header] Scrolled to element with ID: ${targetId} (after timeout).`);
          }, 300); // 300ms delay to allow menu animation to complete
        } else {
          console.warn(`[Header] Element with ID '${targetId}' NOT FOUND on the current (Home) page.`);
        }
      } else {
        // If we are on a different page, navigate to home and pass state to scroll there
        // console.log(`[Header] Not on home page. Navigating to / with state: { scrollToId: '${targetId}' }`);
        navigate('/', { state: { scrollToId: targetId } });
      }
    }
  };


  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${headerBgClass}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-20">
          {/* Logo */}
          <a
            href="/"
            onClick={(e) => handleNavClick('/', e)}
            className="flex items-center h-full"
          >
            <img
              src={logoSrc} // Using the single logo source
              alt="CynexAI Logo"
              className="h-14 w-auto" // Adjusted to a standard Tailwind class if lg:h-19 is custom
            />
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
                  className={`relative font-medium transition-colors duration-200 group ${navLinkTextColorClass} ${
                    isActive ? 'font-bold' : ''
                  }`}
                >
                  {name}
                  <span
                    className={`absolute -bottom-1 left-0 h-0.5 bg-[#41c8df] transition-all duration-300 ${
                      isActive ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  />
                </a>
              );
            })}
            {/* Add Brochure link here for desktop nav */}
            <Link
              to="/brochure"
              className={`relative font-medium transition-colors duration-200 group ${navLinkTextColorClass} ${
                location.pathname === '/brochure' ? 'font-bold' : ''
              }`}
            >
              Brochure
              <span
                className={`absolute -bottom-1 left-0 h-0.5 bg-[#41c8df] transition-all duration-300 ${
                  location.pathname === '/brochure' ? 'w-full' : 'w-0 group-hover:w-full'
                }`}
              />
            </Link>
          </nav>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsOpen((o) => !o)}
            className={`lg:hidden p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#41c8df] ${
              isBrochurePage || scrolled ? 'text-gray-900' : 'text-white' // Toggle color for hamburger icon
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
                    className="block text-gray-900 hover:text-[#41c8df] transition-colors duration-200 py-2 text-lg font-medium" // Mobile menu links always dark
                  >
                    {name}
                  </a>
                ))}
                {/* Add Brochure link here for mobile nav */}
                <Link
                  to="/brochure"
                  onClick={() => setIsOpen(false)} // Close menu on click
                  className="block text-gray-900 hover:text-[#41c8df] transition-colors duration-200 py-2 text-lg font-medium"
                >
                  Brochure
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
 