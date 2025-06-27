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
      { name: 'Data Science & Machine Learning', href: '/course/data-science-machine-learning' }, // Corrected ID
      { name: 'Artificial Intelligence & Generative AI', href: '/course/artificial-intelligence-generative-ai' }, // Corrected ID
      { name: 'Full Stack Java Development', href: '/course/full-stack-java-development' }, // Corrected ID
      { name: 'DevOps & Cloud Technologies', href: '/course/devops-cloud-technologies' }, // Corrected ID
      { name: 'Python Programming', href: '/course/python-programming' }, // Corrected ID
      { name: 'Software Testing (Manual + Automation)', href: '/course/software-testing-manual-automation' }, // Corrected ID
      { name: 'SAP (Data Processing)', href: '/course/sap-data-processing' }, // Corrected ID
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

  const socialLinks = [
    { icon: Facebook, href: '#', hoverColor: 'hover:text-[#41c8df]' },
    { icon: Twitter, href: '#', hoverColor: 'hover:text-[#41c8df]' },
    { icon: Instagram, href: '#', hoverColor: 'hover:text-[#41c8df]' },
    { icon: Linkedin, href: '#', hoverColor: 'hover:text-[#41c8df]' },
    { icon: Youtube, href: '#', hoverColor: 'hover:text-[#41c8df]' },
  ];

  return (
    <footer className="relative bg-white border-t border-gray-200 text-gray-700 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-[#41c8df]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-[#41c8df]/5 rounded-full blur-3xl"></div>
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
                    className="h-10 w-auto object-contain"
                  />
                </div>
              </Link>

              <p className="text-gray-600 mb-6 leading-relaxed">
                Transforming careers through cutting-edge technology education.
                Join thousands of students who have successfully transitioned into
                high-paying tech roles with our industry-aligned programs.
              </p>

              {/* Social Media Icons (Moved Here) */}
              <div className="flex items-center space-x-4 mb-6"> {/* Added mb-6 for spacing below icons */}
                {socialLinks.map((social, index) => {
                  const IconComponent = social.icon;
                  return (
                    <motion.a
                      key={index}
                      href={social.href}
                      whileHover={{ scale: 1.2, y: -2 }}
                      className={`text-gray-500 ${social.hoverColor} transition-colors duration-200`}
                    >
                      <IconComponent className="w-5 h-5" />
                    </motion.a>
                  );
                })}
              </div>

              <div className="space-y-3">
                <div className="flex items-center text-gray-600">
                  <Phone className="w-4 h-4 mr-3 text-[#41c8df]" />
                  <span>+91 9966639869</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Mail className="w-4 h-4 mr-3 text-[#41c8df]" />
                  <span>contact@Cynexai.in</span>
                </div>
                <div className="flex items-start text-gray-600">
                  <MapPin className="w-4 h-4 mr-3 mt-1 text-[#41c8df] flex-shrink-0" />
                  <span className="text-sm">
                    MIG-215, Rd Number 1, KPHB Phase I,
                    Kukatpally, Hyderabad, Telangana 500072
                  </span>
                </div>
              </div>
            </div>

            {/* Courses */}
            <div>
              <h3 className="text-black font-semibold mb-6">Popular Courses</h3>
              <ul className="space-y-3">
                {footerLinks.courses.map((link, index) => (
                  <li key={index}>
                    <Link
                      to={link.href}
                      className="text-gray-600 hover:text-[#41c8df] transition-colors duration-200 text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="text-black font-semibold mb-6">Company</h3>
              <ul className="space-y-3">
                {footerLinks.company.map((link, index) => (
                  <li key={index}>
                    {/* Using 'a' tag for external/hash links, 'Link' for internal routes */}
                    {link.href.startsWith('/') ? (
                      <Link
                        to={link.href}
                        className="text-gray-600 hover:text-[#41c8df] transition-colors duration-200 text-sm"
                      >
                        {link.name}
                      </Link>
                    ) : (
                      <a
                        href={link.href}
                        className="text-gray-600 hover:text-[#41c8df] transition-colors duration-200 text-sm"
                      >
                        {link.name}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="text-black font-semibold mb-6">Support</h3>
              <ul className="space-y-3">
                {footerLinks.support.map((link, index) => (
                  <li key={index}>
                    {/* Using 'a' tag for external/hash links, 'Link' for internal routes */}
                    {link.href.startsWith('/') ? (
                      <Link
                        to={link.href}
                        className="text-gray-600 hover:text-[#41c8df] transition-colors duration-200 text-sm"
                      >
                        {link.name}
                      </Link>
                    ) : (
                      <a
                        href={link.href}
                        className="text-gray-600 hover:text-[#41c8df] transition-colors duration-200 text-sm"
                      >
                        {link.name}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="py-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-black font-semibold mb-2">Stay Updated</h3>
              <p className="text-gray-600 text-sm">
                Get the latest updates on new courses and tech trends
              </p>
            </div>
            <div className="flex w-full md:w-auto flex-nowrap">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 min-w-0 px-4 py-3 bg-gray-100 border border-gray-300 rounded-l-lg text-black placeholder-gray-500 focus:outline-none focus:border-[#41c8df] focus:ring-2 focus:ring-[#41c8df]/20"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-[#41c8df] text-black hover:bg-yellow-600 rounded-r-lg font-medium transition-all duration-300 flex-shrink-0"
              >
                Subscribe
              </motion.button>
            </div>
          </div>
        </div>

        {/* Bottom Footer (Social icons removed from here) */}
        <div className="py-6 border-t border-gray-200">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-gray-600 text-sm text-center md:text-left">
              © 2025 CynexAI. All rights reserved. | Privacy Policy | Terms of Service
            </div>
            {/* Social media icons are no longer rendered here */}
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <motion.button
        onClick={scrollToTop}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-4 right-4 z-50 bg-[#41c8df] text-black p-3 rounded-full shadow-lg hover:bg-yellow-600 transition-colors duration-300"
      >
        <ArrowUp className="w-5 h-5" />
      </motion.button>
    </footer>
  );
};

export default Footer;