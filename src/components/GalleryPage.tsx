import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowLeft, Image as ImageIcon } from 'lucide-react'; // Renamed Image to ImageIcon to avoid conflict
import { Link } from 'react-router-dom';

const galleryImages = [
  // IMPORTANT: Replace these with the actual paths to your images
  // These paths are relative to your 'public' folder
  '/gallery_images/image1.jpg',
  '/gallery_images/image2.png',
  '/gallery_images/image3.jpeg',
  '/gallery_images/image4.jpg',
  '/gallery_images/image5.png',
  '/gallery_images/image6.jpeg',
  // Add more image paths as needed
];

const GalleryPage = () => {
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

  return (
    <div className="min-h-screen bg-gray-900 text-white pt-20 pb-10"> {/* pt-20 for header space */}
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
              Our Photo Gallery
            </motion.h1>
            <motion.p
              variants={itemVariants}
              className="text-gray-400 mb-8 max-w-2xl mx-auto"
            >
              Explore moments from our classes, events, and student life.
            </motion.p>

            {/* Gallery Grid */}
            <motion.div
              variants={containerVariants} // Use container variants for grid items
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
            >
              {galleryImages.map((imageSrc, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants} // Apply item variants to each image card
                  whileHover={{ scale: 1.05, boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.15)' }}
                  className="relative overflow-hidden rounded-lg shadow-xl group cursor-pointer"
                >
                  <img
                    src={imageSrc}
                    alt={`Gallery Image ${index + 1}`}
                    className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <ImageIcon className="w-10 h-10 text-white" />
                  </div>
                </motion.div>
              ))}
            </motion.div>
            {/* End Gallery Grid */}

            <motion.p
              variants={itemVariants}
              className="text-gray-500 mt-8 text-sm"
            >
              (More photos coming soon!)
            </motion.p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default GalleryPage;