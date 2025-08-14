import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Phone, Mail, Globe, MapPin, Clock, Users } from 'lucide-react';

const Contact = () => {
  // useInView hook to trigger animations when the component scrolls into view
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  // --- State for the form inputs and submission status ---
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    courseInterest: 'Select a course',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // null, 'success', 'error'
  const [statusMessage, setStatusMessage] = useState('');

  // --- Configuration ---
  // IMPORTANT: Replace this with the URL for your Google Apps Script.
  const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwx3j2nwzJWA1_OpjGPwTRGMvJA8aboye9V9YPuMHnBflsVyAmKHCaa9benkaQ7KcUZuQ/exec';

  // Define the contact information
  const contactInfo = [
    { icon: Phone, label: 'Phone', value: '+91 9966639869', href: 'tel:+919966639869' },
    { icon: Mail, label: 'Email', value: 'contact@Cynexai.in', href: 'mailto:contact@Cynexai.in' },
    { icon: Globe, label: 'Website', value: 'CynexAI.in', href: 'https://CynexAI.in' },
    { icon: MapPin, label: 'Location', value: 'KPHB Phase I, Kukatpally, Hyderabad', href: 'https://maps.app.goo.gl/cMq38RHfxHpgEDKn9' },
  ];

  // Define the stats
  const stats = [
    { icon: Users, value: '100+', label: 'Students Trained' },
    { icon: Clock, value: '24/7', label: 'Support Available' },
    { icon: Globe, value: '10+', label: 'Cities Reached' },
  ];

  // Define the courses for the dropdown
  const courses = [
    'Select a course',
    'Data Science with AI',
    'Machine Learning',
    'LLM Engineering',
    'Generative AI',
    'JAVA/Python',
    'DevOps/AWS',
    'Web Development',
    'Testing',
    'SAP'
  ];

  // Variants for framer-motion animations
  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.2 } } };
  const itemVariants = { hidden: { y: 50, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: 'easeOut' } } };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    setStatusMessage('');

    // Prepare data to send
    const dataToSend = new FormData();
    dataToSend.append('fullName', formData.fullName);
    dataToSend.append('email', formData.email);
    dataToSend.append('phone', formData.phone);
    dataToSend.append('courseInterest', formData.courseInterest);
    dataToSend.append('message', formData.message);
    dataToSend.append('sheetName', 'Messages');

    // Basic validation
    if (!formData.fullName || !formData.email || !formData.message) {
      setSubmitStatus('error');
      setStatusMessage('Please fill out all required fields.');
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch(SCRIPT_URL, {
        method: 'POST',
        body: dataToSend,
        // No 'Content-Type' header needed for FormData
      });

      if (response.ok) {
        setSubmitStatus('success');
        setStatusMessage('Your message has been sent successfully!');
        // Reset form data after successful submission
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          courseInterest: 'Select a course',
          message: '',
        });
      } else {
        setSubmitStatus('error');
        setStatusMessage('Failed to send message. Please try again later.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
      setStatusMessage('An error occurred. Please check your network and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 relative bg-white text-gray-900">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-20 w-40 h-40 bg-[#41c8df]/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 -right-20 w-60 h-60 bg-[#41c8df]/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-center mb-16"
        >
          <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-display font-bold mb-4">
            Get In Touch
          </motion.h2>
          <motion.p variants={itemVariants} className="text-lg text-gray-700">
            Ready to transform your career? Contact us today and take the first step towards your tech journey.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information & Stats */}
          <motion.div variants={containerVariants} initial="hidden" animate={inView ? 'visible' : 'hidden'} className="space-y-12">
            <div>
              <motion.h3 variants={itemVariants} className="text-2xl font-semibold mb-6">
                Contact Information
              </motion.h3>
              <div className="space-y-6">
                {contactInfo.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <motion.a
                      key={i}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ x: 10 }}
                      className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl border border-gray-200 hover:border-[#41c8df] transition-colors duration-300"
                    >
                      <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-[#41c8df] text-white">
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">{item.label}</p>
                        <p className="font-medium text-gray-900">{item.value}</p>
                      </div>
                    </motion.a>
                  );
                })}
              </div>
            </div>

            <div>
              <motion.h3 variants={itemVariants} className="text-2xl font-semibold mb-6">
                Why Choose Us
              </motion.h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {stats.map((stat, i) => {
                  const Icon = stat.icon;
                  return (
                    <motion.div
                      key={i}
                      variants={itemVariants}
                      className="p-6 bg-gray-50 rounded-lg border border-gray-200 text-center hover:border-[#41c8df] transition-colors duration-300"
                    >
                      <Icon className="w-8 h-8 text-[#41c8df] mx-auto mb-3" />
                      <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                      <div className="text-sm text-gray-600">{stat.label}</div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div variants={itemVariants} initial="hidden" animate={inView ? 'visible' : 'hidden'} className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">Send us a Message</h3>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label htmlFor="fullName" className="block text-sm text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#41c8df]"
                    placeholder="John Doe"
                    required
                  />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="block text-sm text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#41c8df]"
                  placeholder="john@example.com"
                  required
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm text-gray-700 mb-2">Phone</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#41c8df]"
                  placeholder="+91 9876543210"
                />
              </div>
              <div>
                <label htmlFor="courseInterest" className="block text-sm text-gray-700 mb-2">Course Interest</label>
                <select
                  id="courseInterest"
                  name="courseInterest"
                  value={formData.courseInterest}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#41c8df]"
                >
                  {courses.map((course, index) => (
                    <option key={index} value={course}>
                      {course}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm text-gray-700 mb-2">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#41c8df]"
                  placeholder="Your message..."
                  required
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3 text-white rounded-lg transition-colors duration-300 ${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#41c8df] hover:bg-[#c09a2f]'}`}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
            <AnimatePresence>
              {submitStatus && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className={`mt-4 p-4 rounded-lg text-center ${submitStatus === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}
                >
                  {statusMessage}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
