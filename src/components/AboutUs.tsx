import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Linkedin, Lightbulb, Rocket, Award, Code, Briefcase, Handshake } from 'lucide-react';

// ====================================================================
// The complete AboutUs page component
// ====================================================================
const AboutUs = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

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
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  // ====================================================================
  // Dummy data for team members, used by the integrated OurTeam section.
  // This is the data you provided.
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
      name: 'Sandeep',
      role: 'HR Manager',
      bio: 'Sandeep manages all human resources functions at CynexAI. His focus is on building a supportive and dynamic workplace culture, attracting top talent, and fostering professional growth for the team.',
      image: 'https://placehold.co/400x400/1C1C1C/white?text=Sandeep',
      socials: {
        linkedin: 'https://www.linkedin.com/in/sandeep-yellanki-8b80142b6'
      }
    },
    {
      name: 'Saileja',
      role: 'HR Recruiter',
      bio: 'Saileja is on the front lines of talent acquisition. As an HR Recruiter, she identifies and attracts brilliant minds to join the CynexAI team, playing a key role in building our innovative community.',
      image: 'https://placehold.co/400x400/1C1C1C/white?text=Saileja',
      socials: {
        linkedin: 'https://www.linkedin.com/in/sailaja-gampala-17408a345?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app'
      }
    }
  ];

  // Ref to the scrollable container element
  const scrollContainerRef = useRef(null);
  // Ref to hold the interval ID for cleanup
  const intervalRef = useRef(null);

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
    <div className="bg-white text-gray-900 font-inter pt-20">
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-white">
        <div className="container mx-auto text-center max-w-4xl">
          <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            <motion.h1 variants={itemVariants} className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
              About <span className="text-blue-600">CynexAI</span>
            </motion.h1>
            <motion.p variants={itemVariants} className="text-lg md:text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
              We are a leading provider of innovative AI training and upskilling programs,
              dedicated to empowering individuals and businesses to thrive in the digital age.
            </motion.p>
          </motion.div>
        </div>
      </section>
      <section id="mission" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto text-center">
          <motion.div
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            variants={containerVariants}
          >
            <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold mb-12">
              Our <span className="text-blue-600">Mission</span> and <span className="text-blue-600">Vision</span>
            </motion.h2>
            <div className="grid md:grid-cols-2 gap-12 text-left">
              <motion.div variants={itemVariants} className="bg-gray-50 p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="p-3 rounded-full bg-blue-600 text-white">
                    <Lightbulb className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-semibold">Our Mission</h3>
                </div>
                <p className="text-gray-700">
                  To provide accessible, high-quality, and hands-on training that equips students with the skills
                  needed to excel in a rapidly evolving technological landscape. We aim to bridge the gap between
                  academic knowledge and industry requirements.
                </p>
              </motion.div>
              <motion.div variants={itemVariants} className="bg-gray-50 p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="p-3 rounded-full bg-blue-600 text-white">
                    <Rocket className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-semibold">Our Vision</h3>
                </div>
                <p className="text-gray-700">
                  To become the global leader in AI and tech education, fostering a community of innovators and
                  problem-solvers who drive positive change and contribute to the advancement of technology.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-100">
        <div className="container mx-auto text-center">
          <motion.div
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            variants={containerVariants}
          >
            <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold mb-12">
              Why Choose <span className="text-blue-600">CynexAI?</span>
            </motion.h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <motion.div variants={itemVariants} className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow duration-300">
                <div className="mx-auto w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                  <Award className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Expert Instructors</h3>
                <p className="text-gray-600 text-sm">
                  Learn from seasoned professionals with extensive industry experience.
                </p>
              </motion.div>
              <motion.div variants={itemVariants} className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow duration-300">
                <div className="mx-auto w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                  <Code className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Hands-On Projects</h3>
                <p className="text-gray-600 text-sm">
                  Gain practical experience through real-world projects and case studies.
                </p>
              </motion.div>
              <motion.div variants={itemVariants} className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow duration-300">
                <div className="mx-auto w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                  <Briefcase className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">100% Placement Assistance</h3>
                <p className="text-gray-600 text-sm">
                  Our dedicated team helps you find the right career opportunity.
                </p>
              </motion.div>
              <motion.div variants={itemVariants} className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow duration-300">
                <div className="mx-auto w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                  <Handshake className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Supportive Community</h3>
                <p className="text-gray-600 text-sm">
                  Join a network of peers and mentors who support your learning journey.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* ==================================================================== */}
      {/* The full OurTeam component code, integrated directly into the page */}
      {/* ==================================================================== */}
      <section 
        className="bg-white text-gray-900 py-20 px-4 sm:px-6 lg:px-8 font-inter"
      >
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
            <motion.div variants={itemVariants} className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
                Meet Our <span className="text-blue-600">Team</span>
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Our team of expert instructors and mentors is dedicated to your success. Learn from the best in the industry.
              </p>
            </motion.div>

            <div ref={scrollContainerRef} className="flex overflow-x-auto space-x-8 pb-4 hide-scrollbar">
              {teamMembers.concat(teamMembers).map((member, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="flex-shrink-0 w-80 bg-gray-100 rounded-lg p-6 text-center shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105"
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

    </div>
  );
};

export default AboutUs;
