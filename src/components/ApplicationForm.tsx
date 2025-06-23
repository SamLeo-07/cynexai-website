import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle, User, Mail, Phone, Briefcase } from 'lucide-react';

const ApplicationForm = () => {
  const { courseId } = useParams();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    type: 'student'
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const courseNames = {
    'data-science-ai': 'Data Science with AI',
    'machine-learning': 'Machine Learning',
    'llm-engineering': 'LLM Engineering',
    'generative-ai': 'Generative AI',
    'java-python': 'JAVA/Python',
    'devops-aws': 'DevOps/AWS',
    'web-development': 'Web Development',
    'testing': 'Testing',
    'sap': 'SAP'
  };

  const courseName = courseNames[courseId as keyof typeof courseNames] || 'Unknown Course';

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log('Application submitted:', { ...formData, courseId, courseName, submittedAt: new Date().toISOString() });
    setIsLoading(false);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center bg-[#FFFFFF]">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="max-w-md mx-auto px-4"
        >
          <div className="bg-[#FFFFFF] text-[#010203] rounded-2xl p-8 border border-[#26abff]/20 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="w-16 h-16 bg-[#26abff] rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <CheckCircle className="w-8 h-8 text-white" />
            </motion.div>
            <h1 className="text-2xl font-bold mb-4">Thank You for Applying!</h1>
            <p className="text-[#010203]/80 mb-6">
              Your application for <span className="text-[#26abff] font-medium">{courseName}</span> has been submitted successfully. Our team will review your application and contact you within 24-48 hours.
            </p>
            <div className="space-y-3 mb-8 text-[#010203]/80">
              <div className="flex items-center justify-between text-sm">
                <span>Application ID:</span>
                <span className="font-mono">CX{Date.now().toString().slice(-6)}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>Course:</span>
                <span>{courseName}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>Status:</span>
                <span className="text-[#26abff] font-medium">Under Review</span>
              </div>
            </div>
            <div className="space-y-3">
              <Link
                to="/"
                className="w-full bg-[#26abff] text-white py-3 px-4 rounded-lg font-medium block text-center hover:bg-[#c09a2f] transition-colors duration-300"
              >
                Back to Home
              </Link>
              <Link
                to={`/course/${courseId}`}
                className="w-full border-2 border-[#26abff] text-[#010203] py-3 px-4 rounded-lg font-medium block text-center hover:bg-[#26abff]/10 transition-colors duration-300"
              >
                View Course Details
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 bg-[#FFFFFF]">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <Link
            to={`/course/${courseId}`}
            className="inline-flex items-center text-[#26abff] hover:text-[#a3852c] transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Course
          </Link>
          <h1 className="text-3xl md:text-4xl font-display font-bold text-[#010203] mb-4">
            Apply for <span className="text-[#26abff]">{courseName}</span>
          </h1>
          <p className="text-[#010203]/80 text-lg">
            Take the first step towards transforming your career. Fill out the form below and our team will get in touch with you.
          </p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-[#FFFFFF] text-[#010203] rounded-2xl p-8 border border-[#26abff]/20">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-[#010203] mb-2">
                <User className="w-4 h-4 inline mr-2" /> Full Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 bg-[#F5F5F5] border border-[#26abff]/20 rounded-lg text-[#010203] placeholder-[#010203]/50 focus:outline-none focus:ring-2 focus:ring-[#26abff]/20 transition-colors duration-300"
                placeholder="Enter your full name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#010203] mb-2">
                <Mail className="w-4 h-4 inline mr-2" /> Email Address *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 bg-[#F5F5F5] border border-[#26abff]/20 rounded-lg text-[#010203] placeholder-[#010203]/50 focus:outline-none focus:ring-2 focus:ring-[#26abff]/20 transition-colors duration-300"
                placeholder="Enter your email address"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#010203] mb-2">
                <Phone className="w-4 h-4 inline mr-2" /> Phone Number *
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 bg-[#F5F5F5] border border-[#26abff]/20 rounded-lg text-[#010203] placeholder-[#010203]/50 focus:outline-none focus:ring-2 focus:ring-[#26abff]/20 transition-colors duration-300"
                placeholder="Enter your phone number"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#010203] mb-2">
                <Briefcase className="w-4 h-4 inline mr-2" /> Current Status *
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 bg-[#F5F5F5] border border-[#26abff]/20 rounded-lg text-[#010203] focus:outline-none focus:ring-2 focus:ring-[#26abff]/20 transition-colors duration-300"
              >
                <option value="student" className="bg-[#FFFFFF]">Student</option>
                <option value="employed" className="bg-[#FFFFFF]">Employed</option>
              </select>
            </div>
            <div className="bg-[#26abff]/10 border border-[#26abff]/20 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-[#010203] mb-2">Course Details</h3>
              <p className="text-[#010203] font-medium">{courseName}</p>
              <p className="text-[#010203]/70 text-sm mt-1">
                You are applying for this course. Our team will provide you with detailed information about the curriculum, schedule, and fees.
              </p>
            </div>
            <motion.button
              type="submit"
              disabled={isLoading}
              whileHover={{ scale: isLoading ? 1 : 1.02 }}
              whileTap={{ scale: isLoading ? 1 : 0.98 }}
              className={`w-full py-4 px-6 rounded-lg font-semibold transition-colors duration-300 ${
                isLoading
                  ? 'bg-[#CCCCCC] cursor-not-allowed'
                  : 'bg-[#26abff] text-[#010203] hover:bg-[#c09a2f]'
              }`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-[#010203]/30 border-t-[#010203] rounded-full animate-spin mr-2"></div>
                  Submitting Application...
                </div>
              ) : (
                'Apply Now'
              )}
            </motion.button>
          </form>
          <div className="mt-8 p-4 bg-[#F5F5F5] rounded-lg border border-[#26abff]/20">
            <h4 className="text-[#010203] font-medium mb-2">What happens next?</h4>
            <ul className="text-[#010203]/70 text-sm space-y-1">
              <li>• Our team will review your application within 24-48 hours</li>
              <li>• You'll receive a call to discuss the course details and your goals</li>
              <li>• We'll provide information about batch schedules and payment options</li>
              <li>• Upon confirmation, you'll receive access to our learning platform</li>
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ApplicationForm;
