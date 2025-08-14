import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, easeOut, easeInOut } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';

const Reviews = () => {
  const [currentReview, setCurrentReview] = useState(0);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // ====================================================================
  // UPDATED: Reviews data based on the provided images
  // ====================================================================
  const reviews = [
    {
      name: 'Anil Kumar',
      role: 'Java Developer at BeamX Techlab',
      course: 'Full Stack Java',
      rating: 5,
      text: 'CynexAI gave me the skills and confidence I needed to land my first job in tech. The trainers are industry experts and the placement support is truly effective.',
      image: 'gallery_images/WhatsApp%20Image%202025-07-28%20at%2016.47.23_9abc2e80.jpg?version%3D1755168647258',
    },
    {
      name: 'Suresh Kumar',
      role: 'Python Developer at Wexl Edu Pvt Ltd',
      course: 'Full Stack Python',
      rating: 5,
      text: 'From day one, the learning experience was smooth, practical, and job-focused. I highly recommend CynexAI to anyone serious about starting a tech career.',
      image: 'public/gallery_images/WhatsApp Image 2025-07-28 at 16.48.15_34734bc2.jpg',
    },
    {
      name: 'Y. Bhavana',
      role: 'Web Developer at Zuper Pvt Ltd',
      course: 'Web development',
      rating: 5,
      text: 'The Web Development course at CynexAI helped me build real websites from scratch. HTML, CSS, JavaScript, and React were taught in a very easy-to-understand way.',
      image: 'public/gallery_images/WhatsApp Image 2025-07-28 at 17.01.27_a8763108.jpg',
    },
    {
      name: 'K. Pullaiah',
      role: 'Software Tester at Persistent Systems',
      course: 'Testing (Manual + Automation)',
      rating: 5,
      text: 'CynexAI\'s software testing course gave me a strong foundation in both manual and automation testing. The real-time projects and Selenium sessions helped me get placed quickly.',
      image: 'public/gallery_images/WhatsApp Image 2025-07-28 at 17.17.45_290e8232.jpg',
    },
    {
      name: 'Chandrashekar',
      role: 'Software Tester at Paramount Software',
      course: 'Testing (Auto + Manual)',
      rating: 5,
      text: 'CynexAI\'s software testing course gave me a strong foundation in both manual and automation testing. The real-time projects and Selenium sessions helped me get placed quickly',
      image: 'public/gallery_images/WhatsApp Image 2025-07-30 at 13.53.04_4aea19f7.jpg',
    },
    {
      name: 'Sai Nath',
      role: 'Web Developer at Cognizent',
      course: 'Full Stack',
      rating: 5,
      text: 'CynexAI\'s software testing course gave me a strong foundation in both manual and automation testing. The real-time projects and Selenium sessions helped me get placed quickly',
      image: 'public/gallery_images/WhatsApp Image 2025-07-30 at 13.53.04_4aea19f7.jpg',
    },
  ];

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentReview((prev) => (prev + 1) % reviews.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [reviews.length]);

  const nextReview = () => {
    setCurrentReview((prev) => (prev + 1) % reviews.length);
  };

  const prevReview = () => {
    setCurrentReview((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

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
        ease: easeOut,
      },
    },
  };

  return (
    <section id="reviews" className="py-20 relative overflow-hidden bg-white">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#41c8df]/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#41c8df]/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
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
            className="text-4xl md:text-5xl font-display font-bold mb-6 text-black"
          >
            <span className="text-[#41c8df]">
              Student Success Stories
            </span>
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-xl text-black/80 max-w-3xl mx-auto"
          >
            Hear from our graduates who have transformed their careers and achieved their dreams
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="relative"
        >
          {/* Main Review Display */}
          <div className="relative max-w-4xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentReview}
                initial={{ opacity: 0, x: '100%' }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: '-100%' }}
                transition={{ duration: 0.7, ease: [0.6, 0.05, 0.01, 0.9] }}
                className="bg-white rounded-3xl p-8 md:p-12 border border-[#41c8df]/30 shadow-xl transition-all duration-300"
              >
                <div className="flex flex-col md:flex-row items-center gap-8">
                  {/* Profile Image */}
                  <div className="relative flex-shrink-0">
                    <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-[#41c8df] p-1">
                      <img
                        src={reviews[currentReview].image}
                        alt={reviews[currentReview].name}
                        className="w-full h-full object-cover rounded-full"
                        // Added a fallback for images
                        onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/400x400/1C1C1C/white?text=User'; }}
                      />
                    </div>
                    <div className="absolute -top-2 -right-2 bg-[#41c8df] rounded-full p-2">
                      <Quote className="w-4 h-4 text-white" />
                    </div>
                  </div>

                  {/* Review Content */}
                  <div className="flex-1 text-center md:text-left">
                    {/* Stars */}
                    <div className="flex justify-center md:justify-start mb-4">
                      {[...Array(reviews[currentReview].rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                      ))}
                    </div>

                    {/* Review Text */}
                    <p className="text-lg md:text-xl text-gray-800 mb-6 leading-relaxed italic">
                      "{reviews[currentReview].text}"
                    </p>

                    {/* Reviewer Info */}
                    <div>
                      <h4 className="text-xl font-semibold text-black mb-1">
                        {reviews[currentReview].name}
                      </h4>
                      <p className="text-[#41c8df] font-medium mb-1">
                        {reviews[currentReview].role}
                      </p>
                      <p className="text-sm text-gray-600">
                        Graduate of {reviews[currentReview].course}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <button
              onClick={prevReview}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-[#41c8df]/10 hover:bg-[#41c8df]/20 backdrop-blur-sm rounded-full p-3 border border-[#41c8df]/20 hover:border-[#41c8df]/50 transition-all duration-300 group"
            >
              <ChevronLeft className="w-6 h-6 text-[#41c8df] group-hover:text-white" />
            </button>

            <button
              onClick={nextReview}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-[#41c8df]/10 hover:bg-[#41c8df]/20 backdrop-blur-sm rounded-full p-3 border border-[#41c8df]/20 hover:border-[#41c8df]/50 transition-all duration-300 group"
            >
              <ChevronRight className="w-6 h-6 text-[#41c8df] group-hover:text-white" />
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 space-x-3">
            {reviews.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentReview(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentReview
                    ? 'bg-[#41c8df] scale-125'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>

          {/* All Reviews Grid (Hidden on Mobile) */}
          <div className="hidden lg:grid grid-cols-3 gap-6 mt-16">
            {reviews.map((review, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                onClick={() => setCurrentReview(index)}
                className={`cursor-pointer bg-white rounded-xl p-4 border transition-all duration-300 shadow-sm ${
                  index === currentReview
                    ? 'border-[#41c8df] bg-[#41c8df]/10'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center space-x-3 mb-3">
                  <img
                    src={review.image}
                    alt={review.name}
                    className="w-10 h-10 rounded-full object-cover"
                    onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/400x400/1C1C1C/white?text=User'; }}
                  />
                  <div>
                    <h5 className="text-sm font-medium text-black">{review.name}</h5>
                    <p className="text-xs text-[#41c8df]">{review.role}</p>
                  </div>
                </div>
                <div className="flex mb-2">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-xs text-gray-700 line-clamp-3">{review.text}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Reviews;
