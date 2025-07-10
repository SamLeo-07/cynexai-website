import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import HTMLFlipBook from 'react-pageflip'; // Import the flip-book library

const BrochurePage = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
        when: "beforeChildren",
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  // Define your brochure page image paths
  // Make sure these paths correctly point to images in your public/brochure_images folder
  const brochurePages = [
    '/brochure_images/page1.jpg', // Replace with your actual image file names
    '/brochure_images/page2.jpg',
    '/brochure_images/page3.jpg',
    '/brochure_images/page4.jpg',
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white pt-20 pb-10"> {/* Add some bottom padding */}
      <section className="relative py-12 md:py-16 bg-gradient-to-br from-gray-800 to-gray-950">
        <div className="container mx-auto px-4 relative z-10">
          <Link to="/" className="text-[#41c8df] hover:text-white flex items-center mb-6">
            <ArrowLeft className="w-5 h-5 mr-2" /> Back to Home
          </Link>
          <motion.div
            ref={ref}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={containerVariants}
            className="text-center"
          >
            <motion.h1
              variants={itemVariants}
              className="text-4xl md:text-5xl font-display font-bold text-white mb-4"
            >
              Our Comprehensive Program Brochure
            </motion.h1>
            <motion.p
              variants={itemVariants}
              className="text-gray-400 mb-8 max-w-2xl mx-auto"
            >
              Explore our detailed programs, curriculum, and career opportunities in this interactive brochure.
            </motion.p>

            {/* FLIPBOOK COMPONENT */}
            <motion.div
              variants={itemVariants}
              className="w-full flex justify-center items-center overflow-hidden"
              style={{ minHeight: '600px' }} // Ensure enough space for the flipbook
            >
              <HTMLFlipBook
                width={500} // Width of a single page (adjust as needed for your images/design)
                height={700} // Height of a single page (adjust as needed)
                showCover={true} // Show the first page as a cover
                flippingTime={800} // Speed of page flip animation in ms
                disableFlipByClick={false} // Allow clicking to flip
                maxShadowOpacity={0.5} // How dark the shadow is
                mobileScrollSupport={true} // Enable scrolling on mobile
                className="demo-book" // You can add custom CSS to this class if needed
              >
                {brochurePages.map((pageSrc, index) => (
                  <div key={index} className="page">
                    <img src={pageSrc} alt={`Brochure Page ${index + 1}`} className="w-full h-full object-contain" />
                  </div>
                ))}
              </HTMLFlipBook>
            </motion.div>
            {/* END FLIPBOOK COMPONENT */}

            <motion.p
              variants={itemVariants}
              className="text-gray-500 mt-8 text-sm"
            >
              (Interactive Brochure)
            </motion.p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default BrochurePage;