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

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Here you would typically send the data to your backend
    console.log('Application submitted:', {
      ...formData,
      courseId,
      courseName,
      submittedAt: new Date().toISOString()
    });

    setIsLoading(false);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="max-w-md mx-auto px-4"
        >
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <CheckCircle className="w-8 h-8 text-white" />
            </motion.div>
            
            <h1 className="text-2xl font-bold text-white mb-4">
              Thank You for Applying!
            </h1>
            
            <p className="text-gray-300 mb-6">
              Your application for <span className="text-purple-300 font-medium">{courseName}</span> has been submitted successfully. 
              Our team will review your application and contact you within 24-48 hours.
            </p>
            
            <div className="space-y-3 mb-8">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Application ID:</span>
                <span className="text-white font-mono">CX{Date.now().toString().slice(-6)}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Course:</span>
                <span className="text-white">{courseName}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Status:</span>
                <span className="text-green-400">Under Review</span>
              </div>
            </div>
            
            <div className="space-y-3">
              <Link
                to="/"
                className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 text-white py-3 px-4 rounded-lg font-medium hover:from-purple-700 hover:to-cyan-700 transition-all duration-300 block text-center"
              >
                Back to Home
              </Link>
              <Link
                to={`/course/${courseId}`}
                className="w-full border-2 border-purple-400 text-purple-300 py-3 px-4 rounded-lg font-medium hover:bg-purple-400/10 transition-all duration-300 block text-center"
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
    <div className="min-h-screen pt-20">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Link
            to={`/course/${courseId}`}
            className="inline-flex items-center text-purple-300 hover:text-purple-200 transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Course
          </Link>
          
          <h1 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
            Apply for <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              {courseName}
            </span>
          </h1>
          
          <p className="text-gray-300 text-lg">
            Take the first step towards transforming your career. Fill out the form below and our team will get in touch with you.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                <User className="w-4 h-4 inline mr-2" />
                Full Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all duration-300"
                placeholder="Enter your full name"
              />
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                <Mail className="w-4 h-4 inline mr-2" />
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all duration-300"
                placeholder="Enter your email address"
              />
            </div>

            {/* Phone Field */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                <Phone className="w-4 h-4 inline mr-2" />
                Phone Number *
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all duration-300"
                placeholder="Enter your phone number"
              />
            </div>

            {/* Type Field */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                <Briefcase className="w-4 h-4 inline mr-2" />
                Current Status *
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all duration-300"
              >
                <option value="student" className="bg-gray-800">Student</option>
                <option value="employed" className="bg-gray-800">Employed</option>
              </select>
            </div>

            {/* Course Info */}
            <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-white mb-2">Course Details</h3>
              <p className="text-purple-300">{courseName}</p>
              <p className="text-gray-400 text-sm mt-1">
                You are applying for this course. Our team will provide you with detailed information about the curriculum, schedule, and fees.
              </p>
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isLoading}
              whileHover={{ scale: isLoading ? 1 : 1.02 }}
              whileTap={{ scale: isLoading ? 1 : 0.98 }}
              className={`w-full py-4 px-6 rounded-lg font-semibold text-white transition-all duration-300 ${
                isLoading
                  ? 'bg-gray-600 cursor-not-allowed'
                  : 'bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 shadow-lg hover:shadow-purple-500/25'
              }`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                  Submitting Application...
                </div>
              ) : (
                'Apply Now'
              )}
            </motion.button>
          </form>

          {/* Additional Info */}
          <div className="mt-8 p-4 bg-white/5 rounded-lg border border-white/10">
            <h4 className="text-white font-medium mb-2">What happens next?</h4>
            <ul className="text-gray-400 text-sm space-y-1">
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