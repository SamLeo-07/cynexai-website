import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Phone, Mail, Globe, MapPin, Clock, Users } from 'lucide-react';

const Contact = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const contactInfo = [
    {
      icon: Phone,
      label: 'Phone',
      value: '+91 9494949494',
      href: 'tel:+919494949494',
      color: 'from-green-500 to-emerald-500',
    },
    {
      icon: Mail,
      label: 'Email',
      value: 'example@Cynexai.com',
      href: 'mailto:example@Cynexai.com',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Globe,
      label: 'Website',
      value: 'CynexAI.in',
      href: 'https://CynexAI.in',
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'KPHB Phase I, Kukatpally, Hyderabad',
      href: 'https://maps.app.goo.gl/cMq38RHfxHpgEDKn9',
      color: 'from-orange-500 to-red-500',
    },
  ];

  const stats = [
    { icon: Users, value: '100+', label: 'Students Trained' },
    { icon: Clock, value: '24/7', label: 'Support Available' },
    { icon: Globe, value: '10+', label: 'Cities Reached' },
  ];

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
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section id="contact" className="py-20 relative">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-20 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 -right-20 w-60 h-60 bg-cyan-500/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl font-display font-bold mb-6"
          >
            <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Get In Touch
            </span>
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-300 max-w-3xl mx-auto"
          >
            Ready to transform your career? Contact us today and take the first step towards your tech journey
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="space-y-8"
          >
            <motion.div variants={itemVariants}>
              <h3 className="text-2xl font-semibold text-white mb-6">Contact Information</h3>
              <div className="space-y-6">
                {contactInfo.map((item, index) => {
                  const IconComponent = item.icon;
                  return (
                    <motion.a
                      key={index}
                      href={item.href}
                      target={item.label === 'Website' || item.label === 'Location' ? '_blank' : undefined}
                      rel={item.label === 'Website' || item.label === 'Location' ? 'noopener noreferrer' : undefined}
                      whileHover={{ x: 10 }}
                      className="flex items-center space-x-4 p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:border-purple-400/30 transition-all duration-300 group"
                    >
                      <div className={`flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-r ${item.color} group-hover:scale-110 transition-transform duration-300`}>
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-400 mb-1">{item.label}</p>
                        <p className="text-white font-medium group-hover:text-purple-300 transition-colors">
                          {item.value}
                        </p>
                      </div>
                    </motion.a>
                  );
                })}
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div variants={itemVariants}>
              <h3 className="text-2xl font-semibold text-white mb-6">Why Choose Us</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {stats.map((stat, index) => {
                  const IconComponent = stat.icon;
                  return (
                    <div
                      key={index}
                      className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 text-center hover:border-purple-400/30 transition-all duration-300"
                    >
                      <IconComponent className="w-8 h-8 text-purple-400 mx-auto mb-3" />
                      <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                      <div className="text-sm text-gray-400">{stat.label}</div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
          >
            <h3 className="text-2xl font-semibold text-white mb-6">Send us a Message</h3>
            <form className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all duration-300"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all duration-300"
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all duration-300"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all duration-300"
                  placeholder="+91 9876543210"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Course Interest
                </label>
                <select className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all duration-300">
                  <option value="">Select a course</option>
                  <option value="data-science-ai">Data Science with AI</option>
                  <option value="machine-learning">Machine Learning</option>
                  <option value="llm-engineering">LLM Engineering</option>
                  <option value="generative-ai">Generative AI</option>
                  <option value="java-python">JAVA/Python</option>
                  <option value="devops-aws">DevOps/AWS</option>
                  <option value="web-development">Web Development</option>
                  <option value="testing">Testing</option>
                  <option value="sap">SAP</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Message
                </label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all duration-300 resize-none"
                  placeholder="Tell us about your goals and how we can help..."
                ></textarea>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 text-white py-4 px-6 rounded-lg font-semibold hover:from-purple-700 hover:to-cyan-700 transition-all duration-300 shadow-lg hover:shadow-purple-500/25"
              >
                Send Message
              </motion.button>
            </form>
          </motion.div>
        </div>

        {/* Map Section */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mt-16"
        >
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            <h3 className="text-2xl font-semibold text-white mb-6 text-center">Visit Our Campus</h3>
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <p className="text-gray-300 mb-4">
                MIG-215, Rd Number 1, opp. to METRO PARKING, KPHB Phase I, 
                Kukatpally Housing Board Colony, Kukatpally, Hyderabad, Telangana 500072
              </p>
              <motion.a
                href="https://maps.app.goo.gl/cMq38RHfxHpgEDKn9"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-cyan-600 text-white rounded-lg font-medium hover:from-purple-700 hover:to-cyan-700 transition-all duration-300"
              >
                <MapPin className="w-5 h-5 mr-2" />
                View on Google Maps
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;