import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowLeft, Image as ImageIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

// IMPORTANT: The images from your request have been added here.
// These paths assume the images are located in the `public/gallery_images` folder.
const galleryImages = [
  // IMPORTANT: Replace these with the actual paths to your images
  // These paths are relative to your 'public' folder
  '/gallery_images/DSC03485.jpg',
  '/gallery_images/DSC03284.jpgg',
  '/gallery_images/DSC03290.jpg',
  '/gallery_images/DSC03456.jpg',
  '/gallery_images/DSC03467.jpg',
  '/gallery_images/DSC03471.jpg',
  // Add more image paths as needed
];

const GalleryPage = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  // Variants for framer-motion animations
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

  return (
    // Main container with a white background and a bit of padding
    <div className="min-h-screen bg-white text-gray-900 pt-16 pb-10">
      <section className="relative py-12 md:py-16">
        <div className="container mx-auto px-4 relative z-10">
          {/* Back button to return to the home page */}
          <Link to="/" className="text-[#41c8df] hover:text-gray-600 flex items-center mb-6 transition-colors duration-200">
            <ArrowLeft className="w-5 h-5 mr-2" /> Back to Home
          </Link>

          {/* Page header section with animations */}
          <motion.div
            ref={ref}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={containerVariants}
            className="text-center"
          >
            <motion.h1
              variants={itemVariants}
              className="text-4xl md:text-5xl font-display font-bold text-gray-800 mb-4"
            >
              Our Photo Gallery
            </motion.h1>
            <motion.p
              variants={itemVariants}
              className="text-gray-600 mb-8 max-w-2xl mx-auto"
            >
              Explore moments from our classes, events, and student life.
            </motion.p>
          </motion.div>

          {/* Gallery Grid with a masonry-like layout */}
          {/* The `columns` CSS property creates a responsive, non-uniform grid */}
          <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-6 space-y-6">
            {galleryImages.map((imageSrc, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                className="relative overflow-hidden rounded-lg shadow-md group cursor-pointer break-inside-avoid"
              >
                <img
                  src={imageSrc}
                  alt={`Gallery Image ${index + 1}`}
                  className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <ImageIcon className="w-10 h-10 text-white" />
                </div>
              </motion.div>
            ))}
          </div>
          {/* End Gallery Grid */}

          <motion.p
            variants={itemVariants}
            className="text-gray-500 mt-8 text-sm text-center"
          >
            (More photos coming soon!)
          </motion.p>
        </div>
      </section>
    </div>
  );
};

export default GalleryPage;


























































































