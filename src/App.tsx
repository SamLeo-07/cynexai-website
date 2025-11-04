import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Mock component imports to make the app runnable
import ScrollToTop from './utils/ScrollToTop';
import Header from './components/Header';
import Hero from './components/Hero';
import Courses from './components/Courses';
import Skills from './components/Skills';
import Reviews from './components/Reviews';
import OurTeam from './components/OurTeam';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CourseDetail from './components/CourseDetail';
import ApplicationForm from './components/ApplicationForm';
import WebinarPortal from './components/WebinarPortal';
import GalleryPage from './components/GalleryPage';
import AdminPanel from './components/AdminPanel';
import PaymentPage from './components/PaymentPage';
import BrochurePage from './components/BrochurePage';
import AboutUs from './components/AboutUs'; // <<<--- IMPORTED THE NEW COMPONENT

const HomePage = () => (
  <>
    <Hero />
    <Courses />
    <Skills />
    <Reviews />
    <Contact />
  </>
);

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-primary-900">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutUs />} /> {/* <<<--- ADDED THE NEW ROUTE */}
          <Route path="/course/:courseId" element={<CourseDetail />} />
          <Route path="/apply/:courseId" element={<ApplicationForm />} />
          <Route path="/webinar" element={<WebinarPortal />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/pay" element={<PaymentPage />} />
          <Route path="/brochure" element={<BrochurePage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}


export default App;
