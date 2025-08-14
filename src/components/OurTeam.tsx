import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Linkedin } from 'lucide-react';

// ====================================================================
// Dummy data for team members. The list is duplicated for the seamless loop effect.
// ====================================================================
const teamMembers = [
  {
    name: 'Lavanya Reddy',
    role: 'CEO & Director',
    bio: 'Lavanya is a visionary leader with a deep passion for technology and education. As the CEO, she steers CynexAI\'s strategic direction, ensuring the company remains at the forefront of AI innovation and talent development.',
    image: 'https://placehold.co/400x400/1C1C1C/white?text=Lavanya',
    socials: {
      linkedin: '#'
    }
  },
  {
    name: 'Siva Sai Datta',
    role: 'Vice President',
    bio: 'Siva Sai Datta drives operational excellence and growth as Vice President. With extensive experience in market expansion and strategic partnerships, he is instrumental in scaling CynexAI\'s reach and impact.',
    image: 'https://placehold.co/400x400/1C1C1C/white?text=Siva',
    socials: {
      linkedin: 'http://linkedin.com/in/ss-datta'
    }
  },
  {
    name: 'Durga Hari',
    role: 'General Manager',
    bio: 'Durga Hari is the driving force behind day-to-day operations. As General Manager, she ensures that all departments work seamlessly to deliver high-quality services and exceptional student experiences.',
    image: 'https://placehold.co/400x400/1C1C1C/white?text=Durga',
    socials: {
      linkedin: '#'
    }
  },
  {
    name: 'Sandeep Kumar',
    role: 'HR Manager',
    bio: 'Sandeep manages all human resources functions at CynexAI. His focus is on building a supportive and dynamic workplace culture, attracting top talent, and fostering professional growth for the team.',
    image: 'https://placehold.co/400x400/1C1C1C/white?text=Sandeep',
    socials: {
      linkedin: 'https://www.linkedin.com/in/sandeep-yellanki-8b80142b6'
    }
  },
  {
    name: 'Sailaja',
    role: 'HR Recruiter',
    bio: 'Saileja is on the front lines of talent acquisition. As an HR Recruiter, she identifies and attracts brilliant minds to join the CynexAI team, playing a key role in building our innovative community.',
    image: 'https://placehold.co/400x400/1C1C1C/white?text=Saileja',
    socials: {
      linkedin: 'https://www.linkedin.com/in/sailaja-gampala-17408a345?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app'
    }
  }
];

// ====================================================================
// The main OurTeam component with rotative auto-scrolling logic and hidden scrollbar
// ====================================================================
const OurTeam = () => {
  // Hook to trigger animations when the component comes into view
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  // Ref to the scrollable container element
  const scrollContainerRef = useRef(null);
  // Ref to hold the interval ID for cleanup
  const intervalRef = useRef(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  const startAutoScroll = () => {
    // Clear any existing interval to prevent duplicates
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = setInterval(() => {
      if (scrollContainerRef.current) {
        const container = scrollContainerRef.current;
        const scrollWidth = container.scrollWidth;
        const currentScrollLeft = container.scrollLeft;

        // Calculate the width of one card plus the gap (space-x-8 is 2rem = 32px)
        const cardWidth = container.children[0]?.offsetWidth + 32 || 352;
        
        // If we are at or past the end of the first set of cards,
        // instantly jump back to the beginning to create a seamless loop.
        // We do this by checking if the current scroll position is greater than
        // or equal to half the total scrollable width (the width of one full set of cards).
        if (currentScrollLeft >= scrollWidth / 2) {
          container.scrollLeft = 0;
        }

        // Now, perform the next smooth scroll
        const nextScrollPosition = container.scrollLeft + cardWidth;
        container.scrollTo({
          left: nextScrollPosition,
          behavior: 'smooth'
        });
      }
    }, 3000); // Scroll every 3 seconds
  };

  const stopAutoScroll = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  useEffect(() => {
    // Start the auto-scroll when the component is in view
    if (inView) {
      startAutoScroll();
    }

    // Cleanup function to clear the interval when the component unmounts or is not in view
    return () => stopAutoScroll();
  }, [inView]);

  return (
    <section 
      ref={ref} 
      className="bg-white text-gray-900 py-20 px-4 sm:px-6 lg:px-8 font-inter"
      // Removed onMouseEnter/onMouseLeave from the section
    >
      {/* This style block is added to hide the scrollbar.
        - For Webkit browsers (Chrome, Safari, etc.)
        - For Firefox
        - For IE and Edge
      */}
      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
      <div className="container mx-auto">
        <motion.div
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={containerVariants}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
              Meet Our <span className="text-blue-600">Team</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our team of expert instructors and mentors is dedicated to your success. Learn from the best in the industry.
            </p>
          </motion.div>

          {/* Single horizontal scroll section for all team members with hidden scrollbar */}
          <div ref={scrollContainerRef} className="flex overflow-x-auto space-x-8 pb-4 hide-scrollbar">
            {/* Render the team members twice to create the infinite loop effect */}
            {teamMembers.concat(teamMembers).map((member, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="flex-shrink-0 w-80 bg-gray-100 rounded-lg p-6 text-center shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105"
                // Added onMouseEnter and onMouseLeave to the individual card
                onMouseEnter={stopAutoScroll}
                onMouseLeave={startAutoScroll}
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-blue-600"
                  onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/400x400/1C1C1C/white?text=User'; }}
                />
                <h3 className="text-xl font-semibold mb-1 text-gray-900">
                  {member.name}
                </h3>
                <p className="text-blue-600 font-medium mb-4">
                  {member.role}
                </p>
                <p className="text-gray-700 text-sm mb-6">
                  {member.bio}
                </p>
                <div className="flex justify-center space-x-4">
                  {member.socials.linkedin && (
                    <a href={member.socials.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-600 transition-colors duration-300">
                      <Linkedin className="w-5 h-5" />
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default OurTeam;
