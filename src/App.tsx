import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ScrollToTop from './utils/ScrollToTop';
import { motion } from 'framer-motion';
import Header from './components/Header';
import Hero from './components/Hero';
import Courses from './components/Courses';
import Skills from './components/Skills';
import Reviews from './components/Reviews';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CourseDetail from './components/CourseDetail';
import ApplicationForm from './components/ApplicationForm';
import WebinarPortal from './components/WebinarPortal';
import GalleryPage from './components/GalleryPage';
import AdminPanel from './components/AdminPanel';
import BrochurePage from './components/BrochurePage';

function HomePage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Hero />
      <Courses />
      <Skills />
      <Reviews />
      <Contact />
    </motion.div>
  );
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-primary-900">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/course/:courseId" element={<CourseDetail />} />
          <Route path="/apply/:courseId" element={<ApplicationForm />} />
          <Route path="/webinar" element={<WebinarPortal />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/brochure" element={<BrochurePage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;