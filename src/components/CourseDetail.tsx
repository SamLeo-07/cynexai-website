import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  ArrowLeft,
  Clock,
  Briefcase,
  Star,
  CheckCircle,
  Play,
  Download,
  Award,
  BookOpen,
  Target
} from 'lucide-react';

const CourseDetail = () => {
  const { courseId } = useParams();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const courseData = {
    /* full courseData object with all courses as previously defined */
  };
  
  const course = courseData[courseId as keyof typeof courseData];
  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white text-gray-900">
        <h2 className="text-2xl">Course Not Found</h2>
      </div>
    );
  }

  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
  const itemVariants = { hidden: { y: 50, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: 'easeOut' } } };

  return (
    <div className="min-h-screen pt-20 bg-white text-gray-900">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/70" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div ref={ref} variants={containerVariants} initial="hidden" animate={inView ? 'visible' : 'hidden'}>
            <motion.div variants={itemVariants} className="mb-6">
              <Link to="/" className="inline-flex items-center text-[#D4AC34] hover:text-[#c09a2f]">
                <ArrowLeft className="w-5 h-5 mr-2" /> Back to Courses
              </Link>
            </motion.div>

            <motion.h1 variants={itemVariants} className="text-4xl font-bold mb-4 text-gray-900">
              {course.title}
            </motion.h1>
            <motion.p variants={itemVariants} className="text-xl text-gray-700 mb-6">
              {course.subtitle}
            </motion.p>
            <motion.p variants={itemVariants} className="text-gray-600 mb-8">
              {course.description}
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-wrap gap-6 text-gray-700 mb-8">
              <div className="flex items-center">
                <Clock className="w-5 h-5 mr-2 text-gray-500" /> {course.duration}
              </div>
              <div className="flex items-center">
                <Briefcase className="w-5 h-5 mr-2 text-gray-500" /> Placement: {course.placement}
              </div>
              <div className="flex items-center">
                <Star className="w-5 h-5 mr-2 text-[#D4AC34]" /> {course.rating}
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="flex gap-4 mb-16">
              <Link to={`/apply/${courseId}`} className="px-6 py-3 bg-[#D4AC34] text-white rounded-lg hover:bg-[#c09a2f] transition">
                Join Course
              </Link>
              <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition">
                <Play className="w-5 h-5 mr-2 inline" /> Watch Preview
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* What You'll Learn */}
      <section className="py-20 bg-white text-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={containerVariants} initial="hidden" animate={inView ? 'visible' : 'hidden'}>
            <motion.h2 variants={itemVariants} className="text-3xl font-bold text-center text-[#D4AC34] mb-12">
              What You’ll Learn
            </motion.h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Learning Outcomes</h3>
                <ul className="space-y-3 text-gray-700">
                  {course.outcomes.map((outcome, idx) => (
                    <li key={idx} className="flex items-start">
                      <CheckCircle className="w-5 h-5 mt-1 mr-2 text-[#D4AC34]" />
                      {outcome}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Skills You’ll Gain</h3>
                <div className="flex flex-wrap gap-3">
                  {course.skills.map((skill, idx) => (
                    <span key={idx} className="px-3 py-1 bg-[#D4AC34]/10 text-[#D4AC34] rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Curriculum */}
      <section className="py-20 bg-gray-50 text-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={containerVariants} initial="hidden" animate={inView ? 'visible' : 'hidden'}>
            <motion.h2 variants={itemVariants} className="text-3xl font-bold text-center text-[#D4AC34] mb-12">
              Course Curriculum
            </motion.h2>
            <div className="space-y-4">
              {course.modules.map((mod, idx) => (
                <motion.div key={idx} variants={itemVariants} className="p-6 bg-white rounded-lg border border-gray-200 flex items-center">
                  <div className="w-10 h-10 bg-[#D4AC34] text-white rounded-full flex items-center justify-center mr-4">
                    {idx + 1}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{mod}</h4>
                    <p className="text-gray-600 text-sm">Module {idx + 1}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Prerequisites & Career */}
      <section className="py-20 bg-white text-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div variants={itemVariants} className="bg-gray-50 p-8 rounded-lg border border-gray-200">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Prerequisites</h3>
            <ul className="space-y-3 text-gray-700">
              {course.prerequisites.map((pre, idx) => (
                <li key={idx} className="flex items-start">
                  <CheckCircle className="w-5 h-5 mt-1 mr-2 text-[#D4AC34]" /> {pre}
                </li>
              ))}
            </ul>
          </motion.div>
          <motion.div variants={itemVariants} className="bg-gray-50 p-8 rounded-lg border border-gray-200">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Career Opportunities</h3>
            <ul className="space-y-3 text-gray-700">
              {course.career.map((role, idx) => (
                <li key={idx} className="">{role}</li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#D4AC34]/10 text-gray-900">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.h2 variants={itemVariants} className="text-3xl font-bold mb-4 text-[#D4AC34]">
            Ready to Transform Your Career?
          </motion.h2>
          <motion.p variants={itemVariants} className="text-gray-700 mb-8">
            Join thousands of successful graduates and take the first step towards your dream tech career.
          </motion.p>
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to={`/apply/${courseId}`} className="px-8 py-3 bg-[#D4AC34] text-white rounded-lg hover:bg-[#c09a2f] transition">
              Enroll Now
            </Link>
            <button className="px-8 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition">
              <Download className="w-5 h-5 mr-2 inline" /> Download Brochure
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default CourseDetail;
