import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Phone, Mail, Globe, MapPin, Clock, Users } from 'lucide-react';

const Contact = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const contactInfo = [
    { icon: Phone, label: 'Phone', value: '+91 9966639869', href: 'tel:+919966639869' },
    { icon: Mail, label: 'Email', value: 'contact@Cynexai.in', href: 'mailto:contact@Cynexai.in' },
    { icon: Globe, label: 'Website', value: 'CynexAI.in', href: 'https://CynexAI.in' },
    { icon: MapPin, label: 'Location', value: 'KPHB Phase I, Kukatpally, Hyderabad', href: 'https://maps.app.goo.gl/cMq38RHfxHpgEDKn9' },
  ];

  const stats = [
    { icon: Users, value: '100+', label: 'Students Trained' },
    { icon: Clock, value: '24/7', label: 'Support Available' },
    { icon: Globe, value: '10+', label: 'Cities Reached' },
  ];

  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.2 } } };
  const itemVariants = { hidden: { y: 50, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: 'easeOut' } } };

  return (
    <section id="contact" className="py-20 relative bg-white text-gray-900">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-20 w-40 h-40 bg-[#72b8f8]/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 -right-20 w-60 h-60 bg-[#72b8f8]/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />
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
                      className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl border border-gray-200 hover:border-[#72b8f8] transition-colors duration-300"
                    >
                      <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-[#72b8f8] text-white">
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
                      className="p-6 bg-gray-50 rounded-lg border border-gray-200 text-center hover:border-[#72b8f8] transition-colors duration-300"
                    >
                      <Icon className="w-8 h-8 text-[#72b8f8] mx-auto mb-3" />
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
            <form className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-700 mb-2">First Name</label>
                  <input type="text" className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#72b8f8]" placeholder="John" />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-2">Last Name</label>
                  <input type="text" className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#72b8f8]" placeholder="Doe" />
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-2">Email</label>
                <input type="email" className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#72b8f8]" placeholder="john@example.com" />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-2">Phone</label>
                <input type="tel" className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#72b8f8]" placeholder="+91 9876543210" />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-2">Course Interest</label>
                <select className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#72b8f8]">
                  <option>Select a course</option>
                  <option>Data Science with AI</option>
                  <option>Machine Learning</option>
                  <option>LLM Engineering</option>
                  <option>Generative AI</option>
                  <option>JAVA/Python</option>
                  <option>DevOps/AWS</option>
                  <option>Web Development</option>
                  <option>Testing</option>
                  <option>SAP</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-2">Message</label>
                <textarea rows={4} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#72b8f8]" placeholder="Your message..." />
              </div>
              <button type="submit" className="w-full py-3 bg-[#72b8f8] text-white rounded-lg hover:bg-[#c09a2f] transition-colors duration-300">
                Send Message
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
