import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Sparkles,
  Code,
  Brain,
  Rocket,
  // Removed Users, Target, Handshake imports if you're NOT using Lucide for stats
} from 'lucide-react';

// Import your PNG image assets
// !! IMPORTANT: Make sure these paths correctly point to your PNG files !!
import studentsIcon from '../assets/students.png';
import jobPlacementIcon from '../assets/job-placement.png';
import partnersIcon from '../assets/partners.png';


const Hero = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
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
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Floating Icons (these still use Lucide as requested previously and are generally better as SVGs/Components) */}
      <div className="absolute inset-0 pointer-events-none">
        <Code className="absolute top-1/4 left-1/4 text-purple-400/30 w-8 h-8 animate-float" style={{ animationDelay: '1s' }} />
        <Brain className="absolute top-1/3 right-1/4 text-cyan-400/30 w-10 h-10 animate-float" style={{ animationDelay: '3s' }} />
        <Rocket className="absolute bottom-1/3 left-1/3 text-indigo-400/30 w-6 h-6 animate-float" style={{ animationDelay: '5s' }} />
        <Sparkles className="absolute bottom-1/4 right-1/3 text-purple-400/30 w-7 h-7 animate-float" style={{ animationDelay: '2s' }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center"
        >
          <motion.div variants={itemVariants} className="mb-8">
            <span className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border border-purple-500/30 text-purple-300 text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4 mr-2" />
              Transform Your Tech Career
            </span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-6xl lg:text-7xl font-display font-bold mb-6"
          >
            <span className="bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent">
              Master the Future of
            </span>
            <br />
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
              Technology
            </span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed"
          >
            Join CynexAI's cutting-edge programs and unlock your potential in AI, Machine Learning,
            and emerging technologies. Learn from industry experts and build the skills that matter.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/#courses"
                className="group bg-gradient-to-r from-purple-600 to-cyan-600 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 flex items-center"
              >
                Explore Courses
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group border-2 border-purple-400/50 text-purple-300 px-8 py-4 rounded-full font-semibold text-lg hover:bg-purple-400/10 transition-all duration-300"
            >
              Watch Demo
            </motion.button>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
          >
            {[
              // Stat data updated to use imported PNG paths
              { number: "500+", label: "Students Trained", icon: studentsIcon, alt: "Students icon" },
              { number: "95%", label: "Job Placement Rate", icon: jobPlacementIcon, alt: "Target icon" },
              { number: "50+", label: "Industry Partners", icon: partnersIcon, alt: "Handshake icon" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-purple-400/30 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/10"
              >
                {/* Render the image icon using <img> tag */}
                <div className="text-3xl mb-2 flex justify-center items-center">
                  {/*
                    The 'filter brightness-150' below attempts to lighten the PNG if it's too dark.
                    However, PNGs are raster graphics, so their color cannot be changed directly with CSS
                    like SVGs can (e.g., using 'text-purple-400').
                    You'll need to download/create PNGs in your desired color.
                  */}
                  <img src={stat.icon} alt={stat.alt} className="w-8 h-8 filter brightness-150" />
                </div>
                <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-1">
                  {stat.number}
                </div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-bounce"></div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;