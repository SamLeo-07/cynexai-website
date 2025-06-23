import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';

const Reviews = () => {
  const [currentReview, setCurrentReview] = useState(0);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const reviews = [
    {
      name: 'Priya Sharma',
      role: 'Data Scientist at TCS',
      course: 'Data Science with AI',
      rating: 5,
      text: 'CynexAI transformed my career completely. The hands-on approach and real-world projects gave me the confidence to transition from a non-tech background to becoming a data scientist at a top company.',
      image: 'https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=150',
    },
    {
      name: 'Rahul Kumar',
      role: 'ML Engineer at Flipkart',
      course: 'Machine Learning',
      rating: 5,
      text: 'The instructors at CynexAI are industry experts who bring real-world experience to the classroom. The curriculum is cutting-edge and perfectly aligned with industry requirements.',
      image: 'https://images.pexels.com/photos/3778876/pexels-photo-3778876.jpeg?auto=compress&cs=tinysrgb&w=150',
    },
    {
      name: 'Sneha Patel',
      role: 'Full Stack Developer at Infosys',
      course: 'Web Development',
      rating: 5,
      text: 'From zero coding knowledge to landing my dream job in just 4 months! The support system and mentorship at CynexAI is unparalleled. Highly recommend to anyone looking to break into tech.',
      image: 'https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=150',
    },
    {
      name: 'Arjun Reddy',
      role: 'DevOps Engineer at Amazon',
      course: 'DevOps/AWS',
      rating: 5,
      text: 'The practical labs and cloud projects were game-changers. I gained hands-on experience with AWS services that directly helped me in my interviews and current role. Worth every penny!',
      image: 'https://images.pexels.com/photos/3778874/pexels-photo-3778874.jpeg?auto=compress&cs=tinysrgb&w=150',
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
        ease: "easeOut",
      },
    },
  };

  return (
    <section id="reviews" className="py-20 relative overflow-hidden bg-white"> {/* Changed background to white */}
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#300A6E]/10 rounded-full blur-3xl animate-pulse-slow"></div> {/* Gold tint */}
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#300A6E]/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }}></div> {/* Gold tint */}
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
            className="text-4xl md:text-5xl font-display font-bold mb-6 text-black" // Changed text to black
          >
            <span className="text-[#300A6E]"> {/* Changed to gold text */}
              Student Success Stories
            </span>
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-xl text-black/80 max-w-3xl mx-auto" // Changed text to black/80
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
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-3xl p-8 md:p-12 border border-[#300A6E]/30 shadow-xl transition-all duration-300" // Changed background to white, border to gold
              >
                <div className="flex flex-col md:flex-row items-center gap-8">
                  {/* Profile Image */}
                  <div className="relative flex-shrink-0">
                    <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-[#300A6E] p-1"> {/* Solid gold border */}
                      <img
                        src={reviews[currentReview].image}
                        alt={reviews[currentReview].name}
                        className="w-full h-full object-cover rounded-full"
                      />
                    </div>
                    <div className="absolute -top-2 -right-2 bg-[#300A6E] rounded-full p-2"> {/* Gold quote bubble */}
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
                    <p className="text-lg md:text-xl text-gray-800 mb-6 leading-relaxed italic"> {/* Changed text to darker gray */}
                      "{reviews[currentReview].text}"
                    </p>

                    {/* Reviewer Info */}
                    <div>
                      <h4 className="text-xl font-semibold text-black mb-1"> {/* Changed text to black */}
                        {reviews[currentReview].name}
                      </h4>
                      <p className="text-[#300A6E] font-medium mb-1"> {/* Changed text to gold */}
                        {reviews[currentReview].role}
                      </p>
                      <p className="text-sm text-gray-600"> {/* Changed text to darker gray */}
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
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-[#300A6E]/10 hover:bg-[#300A6E]/20 backdrop-blur-sm rounded-full p-3 border border-[#300A6E]/20 hover:border-[#300A6E]/50 transition-all duration-300 group" // Gold tint/border
            >
              <ChevronLeft className="w-6 h-6 text-[#300A6E] group-hover:text-white" /> {/* Gold icon, white on hover */}
            </button>
            
            <button
              onClick={nextReview}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-[#300A6E]/10 hover:bg-[#300A6E]/20 backdrop-blur-sm rounded-full p-3 border border-[#300A6E]/20 hover:border-[#300A6E]/50 transition-all duration-300 group" // Gold tint/border
            >
              <ChevronRight className="w-6 h-6 text-[#300A6E] group-hover:text-white" /> {/* Gold icon, white on hover */}
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
                    ? 'bg-[#300A6E] scale-125' // Solid gold when active
                    : 'bg-gray-300 hover:bg-gray-400' // Darker gray when inactive
                }`}
              />
            ))}
          </div>

          {/* All Reviews Grid (Hidden on Mobile) */}
          <div className="hidden lg:grid grid-cols-4 gap-6 mt-16">
            {reviews.map((review, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                onClick={() => setCurrentReview(index)}
                className={`cursor-pointer bg-white rounded-xl p-4 border transition-all duration-300 shadow-sm ${ // White background
                  index === currentReview
                    ? 'border-[#300A6E] bg-[#300A6E]/10' // Gold border/tint when active
                    : 'border-gray-200 hover:border-gray-300' // Lighter gray border when inactive
                }`}
              >
                <div className="flex items-center space-x-3 mb-3">
                  <img
                    src={review.image}
                    alt={review.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <h5 className="text-sm font-medium text-black">{review.name}</h5> {/* Black text */}
                    <p className="text-xs text-[#300A6E]">{review.role}</p> {/* Gold text */}
                  </div>
                </div>
                <div className="flex mb-2">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-xs text-gray-700 line-clamp-3">{review.text}</p> {/* Darker gray text */}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Reviews;