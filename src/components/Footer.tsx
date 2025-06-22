import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  Mail,
  Phone,
  MapPin,
  ArrowUp
} from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const footerLinks = {
    courses: [
      { name: 'Data Science with AI', href: '/course/data-science-ai' },
      { name: 'Machine Learning', href: '/course/machine-learning' },
      { name: 'LLM Engineering', href: '/course/llm-engineering' },
      { name: 'Web Development', href: '/course/web-development' },
      { name: 'DevOps/AWS', href: '/course/devops-aws' },
    ],
    company: [
      { name: 'About Us', href: '#about' },
      { name: 'Our Team', href: '#team' },
      { name: 'Careers', href: '#careers' },
      { name: 'Contact', href: '#contact' },
      { name: 'Blog', href: '#blog' },
    ],
    support: [
      { name: 'Help Center', href: '#help' },
      { name: 'Student Portal', href: '#portal' },
      { name: 'Technical Support', href: '#support' },
      { name: 'FAQ', href: '#faq' },
    ],
  };

  // Social links will now default to gray and turn gold on hover
  const socialLinks = [
    { icon: Facebook, href: '#', hoverColor: 'hover:text-[#D4AC34]' },
    { icon: Twitter, href: '#', hoverColor: 'hover:text-[#D4AC34]' },
    { icon: Instagram, href: '#', hoverColor: 'hover:text-[#D4AC34]' },
    { icon: Linkedin, href: '#', hoverColor: 'hover:text-[#D4AC34]' },
    { icon: Youtube, href: '#', hoverColor: 'hover:text-[#D4AC34]' },
  ];

  return (
    <footer className="relative bg-black/80 border-t border-white/10 text-gray-300"> {/* Darker footer background, default text color */}
      {/* Background Elements - Changed to subtle gold tints */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-[#D4AC34]/5 rounded-full blur-3xl"></div> {/* Gold tint */}
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-[#D4AC34]/5 rounded-full blur-3xl"></div> {/* Gold tint */}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <Link to="/" className="flex items-center space-x-3 mb-6">
                <div className="relative">
                  <img
                    src="/CynexAI.in.svg"
                    alt="CynexAI"
                    className="h-10 w-auto object-contain" // Removed the problematic background div
                  />
                  {/* Removed: <div className="absolute inset-0 bg-background rounded-full opacity-20 animate-pulse-slow"></div> */}
                </div>
              </Link>

              <p className="text-gray-400 mb-6 leading-relaxed">
                Transforming careers through cutting-edge technology education.
                Join thousands of students who have successfully transitioned into
                high-paying tech roles with our industry-aligned programs.
              </p>

              <div className="space-y-3">
                <div className="flex items-center text-gray-400">
                  <Phone className="w-4 h-4 mr-3 text-[#D4AC34]" /> {/* Gold icon */}
                  <span>+91 9966639869</span>
                </div>
                <div className="flex items-center text-gray-400">
                  <Mail className="w-4 h-4 mr-3 text-[#D4AC34]" /> {/* Gold icon */}
                  <span>contact@Cynexai.in</span>
                </div>
                <div className="flex items-start text-gray-400">
                  <MapPin className="w-4 h-4 mr-3 mt-1 text-[#D4AC34] flex-shrink-0" /> {/* Gold icon */}
                  <span className="text-sm">
                    MIG-215, Rd Number 1, KPHB Phase I,
                    Kukatpally, Hyderabad, Telangana 500072
                  </span>
                </div>
              </div>
            </div>

            {/* Courses */}
            <div>
              <h3 className="text-white font-semibold mb-6">Popular Courses</h3>
              <ul className="space-y-3">
                {footerLinks.courses.map((link, index) => (
                  <li key={index}>
                    <Link
                      to={link.href}
                      className="text-gray-400 hover:text-[#D4AC34] transition-colors duration-200 text-sm" // Gold hover
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="text-white font-semibold mb-6">Company</h3>
              <ul className="space-y-3">
                {footerLinks.company.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-[#D4AC34] transition-colors duration-200 text-sm" // Gold hover
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="text-white font-semibold mb-6">Support</h3>
              <ul className="space-y-3">
                {footerLinks.support.map((link, index) => (
                  <li key={index}>
                    <Link
                      to={link.href}
                      className="text-gray-400 hover:text-[#D4AC34] transition-colors duration-200 text-sm" // Gold hover
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="py-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-white font-semibold mb-2">Stay Updated</h3>
              <p className="text-gray-400 text-sm">
                Get the latest updates on new courses and tech trends
              </p>
            </div>
            <div className="flex w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 md:w-64 px-4 py-3 bg-black/20 border border-[#D4AC34]/30 rounded-l-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#D4AC34] focus:ring-2 focus:ring-[#D4AC34]/20" // Gold border for input
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-[#D4AC34] text-black hover:bg-yellow-600 rounded-r-lg font-medium transition-all duration-300" // Gold button, black text
              >
                Subscribe
              </motion.button>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="py-6 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-gray-400 text-sm">
              © 2025 CynexAI. All rights reserved. | Privacy Policy | Terms of Service
            </div>

            <div className="flex items-center space-x-4">
              {socialLinks.map((social, index) => {
                const IconComponent = social.icon;
                return (
                  <motion.a
                    key={index}
                    href={social.href}
                    whileHover={{ scale: 1.2, y: -2 }}
                    className={`text-gray-400 ${social.hoverColor} transition-colors duration-200`} // Gold hover for social icons
                  >
                    <IconComponent className="w-5 h-5" />
                  </motion.a>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <motion.button
        onClick={scrollToTop}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        // Adjusted positioning and styling for better visibility and theme integration
        className="fixed bottom-4 right-4 z-50 bg-[#D4AC34] text-black p-3 rounded-full shadow-lg hover:bg-yellow-600 transition-colors duration-300"
      >
        <ArrowUp className="w-5 h-5" />
      </motion.button>
    </footer>
  );
};

export default Footer;