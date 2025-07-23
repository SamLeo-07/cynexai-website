import React, { useState, useEffect } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';

import { motion, AnimatePresence } from 'framer-motion';

import { Menu, X } from 'lucide-react';



const navItems = [

  { name: 'Home', href: '/' },

  { name: 'Courses', href: '#courses' },

  { name: 'Skills', href: '#skills' },

  { name: 'Reviews', href: '#reviews' },

  { name: 'Contact', href: '#contact' },
  { name: 'Gallery', href: '/gallery' },
   { name: 'Pay Now', href: '/pay' }

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

    e.preventDefault(); // Always prevent default, we're handling navigation

    setIsOpen(false); // Close mobile menu on click

    console.log(`[Header] Link clicked: ${href}`);

    console.log(`[Header] Current path: ${location.pathname}, Current hash: ${location.hash}`);



    if (href.startsWith('/')) { // It's a regular path like '/'

      navigate(href);

      console.log(`[Header] Navigating to path: ${href}`);

    } else if (href.startsWith('#')) { // It's a hash link like '#courses'

      const targetId = href.substring(1);



      if (location.pathname === '/') {

        // If we are already on the home page, just scroll to the element

        console.log(`[Header] On home page. Attempting to scroll to ID: ${targetId}`);

        const element = document.getElementById(targetId);



        if (element) {

          console.log(`[Header] FOUND element with ID: ${targetId}. Scheduling scroll.`);

          // --- ADDED setTimeout HERE ---

          setTimeout(() => {

            element.scrollIntoView({ behavior: 'smooth' });

            console.log(`[Header] Scrolled to element with ID: ${targetId} (after timeout).`);

          }, 300); // 300ms delay to allow menu animation to complete

        } else {

          console.warn(`[Header] Element with ID '${targetId}' NOT FOUND on the current (Home) page.`);

        }

      } else {

        // If we are on a different page, navigate to home and pass state to scroll there

        console.log(`[Header] Not on home page. Navigating to / with state: { scrollToId: '${targetId}' }`);

        navigate('/', { state: { scrollToId: targetId } });

      }

    }

  };





  return (

    <motion.header

      initial={{ y: -100 }}

      animate={{ y: 0 }}

      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${

        scrolled

          ? 'bg-[#41c8df]/95 backdrop-blur-md border-b border-[#41c8df]/20'

          : 'bg-transparent'

      }`}

    >

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* HEADER CONTAINER: Fixed height back to original compact size */}

        <div className="flex justify-between items-center h-16 lg:h-20"> {/* Original compact height */}

          {/* Logo */}

          <a

            href="/"

            onClick={(e) => handleNavClick('/', e)}

            className="flex items-center h-full"

          >

            <img

              src="/CynexAI Logo new (1).png"

              alt="CynexAI Logo"

              className="h-14 w-auto lg:h-19" // Adjusted to be a bit smaller than header's max height (lg:h-19 is a custom size, make sure it's defined or use h-16)

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

                  onClick={(e) => handleNavClick(href, e)} // IMPORTANT: For desktop, `handleNavClick` is still good

                  className={`relative font-medium transition-colors duration-200 group ${

                    scrolled

                      ? isActive ? 'text-white' : 'text-gray-100 hover:text-white'

                      : isActive ? 'text-black' : 'text-black hover:text-gray-700'

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

          </nav>



          {/* Mobile toggle */}

          <button

            onClick={() => setIsOpen((o) => !o)}

            className={`lg:hidden p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#41c8df] ${

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

                    onClick={(e) => handleNavClick(href, e)} // This onClick is critical for mobile

                    className="block text-black hover:text-[#41c8df] transition-colors duration-200 py-2 text-lg font-medium"

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