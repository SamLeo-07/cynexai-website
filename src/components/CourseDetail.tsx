import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  ArrowLeft, 
  Clock, 
  Users, 
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
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Course data (in a real app, this would come from an API)
  const courseData = {
    'data-science-ai': {
      title: 'Data Science with AI',
      subtitle: 'Master the Art of Data-Driven Decision Making',
      description: 'Comprehensive program covering statistical analysis, machine learning algorithms, and AI implementation for real-world business applications.',
      image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1200',
      duration: '6 months',
      students: '150+',
      rating: 4.9,
      level: 'Intermediate',
      price: '₹89,999',
      originalPrice: '₹1,20,000',
      modules: [
        'Python Programming Fundamentals',
        'Statistics and Probability',
        'Data Manipulation with Pandas',
        'Data Visualization with Matplotlib & Seaborn',
        'Machine Learning Algorithms',
        'Deep Learning with TensorFlow',
        'Natural Language Processing',
        'Computer Vision',
        'MLOps and Model Deployment',
        'Capstone Project'
      ],
      skills: ['Python', 'TensorFlow', 'Pandas', 'Scikit-learn', 'NumPy', 'Matplotlib', 'Jupyter', 'SQL'],
      outcomes: [
        'Build end-to-end machine learning pipelines',
        'Implement deep learning models for various applications',
        'Create interactive data visualizations',
        'Deploy ML models to production environments',
        'Work with big data technologies',
        'Apply AI solutions to business problems'
      ],
      prerequisites: [
        'Basic programming knowledge (any language)',
        'High school mathematics',
        'Curiosity about data and technology'
      ],
      career: [
        'Data Scientist',
        'Machine Learning Engineer',
        'AI Research Scientist',
        'Business Intelligence Analyst',
        'Data Analytics Manager'
      ]
    },
    'machine-learning': {
      title: 'Machine Learning',
      subtitle: 'Deep Dive into Intelligent Systems',
      description: 'Advanced machine learning course covering supervised, unsupervised learning, neural networks, and cutting-edge ML techniques.',
      image: 'https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg?auto=compress&cs=tinysrgb&w=1200',
      duration: '4 months',
      students: '200+',
      rating: 4.8,
      level: 'Advanced',
      price: '₹79,999',
      originalPrice: '₹1,00,000',
      modules: [
        'ML Fundamentals and Mathematics',
        'Supervised Learning Algorithms',
        'Unsupervised Learning Techniques',
        'Neural Networks and Deep Learning',
        'Reinforcement Learning',
        'Ensemble Methods',
        'Feature Engineering',
        'Model Evaluation and Selection',
        'Advanced Optimization Techniques',
        'Industry Projects'
      ],
      skills: ['Python', 'PyTorch', 'Keras', 'OpenCV', 'Scikit-learn', 'XGBoost', 'CUDA', 'Docker'],
      outcomes: [
        'Design and implement complex ML algorithms',
        'Build neural networks from scratch',
        'Optimize model performance and efficiency',
        'Handle large-scale datasets',
        'Implement reinforcement learning systems',
        'Deploy models in production environments'
      ],
      prerequisites: [
        'Strong programming background in Python',
        'Linear algebra and calculus knowledge',
        'Statistics and probability understanding'
      ],
      career: [
        'Machine Learning Engineer',
        'Deep Learning Specialist',
        'AI Research Engineer',
        'Computer Vision Engineer',
        'NLP Engineer'
      ]
    },
    // Add more courses as needed...
  };

  const course = courseData[courseId as keyof typeof courseData];

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Course Not Found</h1>
          <Link to="/" className="text-purple-400 hover:text-purple-300">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={course.image}
            alt={course.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/80"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            <motion.div variants={itemVariants} className="mb-6">
              <Link
                to="/"
                className="inline-flex items-center text-purple-300 hover:text-purple-200 transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Courses
              </Link>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <motion.div variants={itemVariants} className="mb-4">
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                    course.level === 'Beginner' ? 'bg-green-500/20 text-green-300 border border-green-500/30' :
                    course.level === 'Intermediate' ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30' :
                    course.level === 'Advanced' ? 'bg-orange-500/20 text-orange-300 border border-orange-500/30' :
                    'bg-red-500/20 text-red-300 border border-red-500/30'
                  }`}>
                    {course.level}
                  </span>
                </motion.div>

                <motion.h1
                  variants={itemVariants}
                  className="text-4xl md:text-5xl font-display font-bold text-white mb-4"
                >
                  {course.title}
                </motion.h1>

                <motion.p
                  variants={itemVariants}
                  className="text-xl text-purple-200 mb-6"
                >
                  {course.subtitle}
                </motion.p>

                <motion.p
                  variants={itemVariants}
                  className="text-gray-300 mb-8 leading-relaxed"
                >
                  {course.description}
                </motion.p>

                <motion.div
                  variants={itemVariants}
                  className="flex flex-wrap items-center gap-6 mb-8"
                >
                  <div className="flex items-center text-gray-300">
                    <Clock className="w-5 h-5 mr-2 text-purple-400" />
                    {course.duration}
                  </div>
                  <div className="flex items-center text-gray-300">
                    <Users className="w-5 h-5 mr-2 text-purple-400" />
                    {course.students} enrolled
                  </div>
                  <div className="flex items-center text-gray-300">
                    <Star className="w-5 h-5 mr-2 text-yellow-400" />
                    {course.rating} rating
                  </div>
                </motion.div>

                <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
                  <Link
                    to={`/apply/${courseId}`}
                    className="bg-gradient-to-r from-purple-600 to-cyan-600 text-white px-8 py-4 rounded-lg font-semibold text-center hover:from-purple-700 hover:to-cyan-700 transition-all duration-300"
                  >
                    Join the Course
                  </Link>
                  <button className="border-2 border-purple-400 text-purple-300 px-8 py-4 rounded-lg font-semibold hover:bg-purple-400/10 transition-all duration-300 flex items-center justify-center">
                    <Play className="w-5 h-5 mr-2" />
                    Watch Preview
                  </button>
                </motion.div>
              </div>

              <motion.div
                variants={itemVariants}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20"
              >
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-white mb-2">
                    {course.price}
                  </div>
                  <div className="text-gray-400 line-through text-lg">
                    {course.originalPrice}
                  </div>
                  <div className="text-green-400 font-medium">
                    Save {Math.round((1 - parseInt(course.price.replace(/[₹,]/g, '')) / parseInt(course.originalPrice.replace(/[₹,]/g, ''))) * 100)}%
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Duration</span>
                    <span className="text-white font-medium">{course.duration}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Level</span>
                    <span className="text-white font-medium">{course.level}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Students</span>
                    <span className="text-white font-medium">{course.students}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Certificate</span>
                    <span className="text-white font-medium">Yes</span>
                  </div>
                </div>

                <Link
                  to={`/apply/${courseId}`}
                  className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 text-white py-4 px-6 rounded-lg font-semibold text-center block hover:from-purple-700 hover:to-cyan-700 transition-all duration-300"
                >
                  Enroll Now
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* What You'll Learn Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            <motion.h2
              variants={itemVariants}
              className="text-3xl md:text-4xl font-display font-bold text-center mb-16"
            >
              <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                What You'll Learn
              </span>
            </motion.h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Learning Outcomes */}
              <motion.div variants={itemVariants}>
                <h3 className="text-2xl font-semibold text-white mb-6 flex items-center">
                  <Target className="w-6 h-6 mr-3 text-purple-400" />
                  Learning Outcomes
                </h3>
                <div className="space-y-4">
                  {course.outcomes.map((outcome, index) => (
                    <div key={index} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-400 mr-3 mt-1 flex-shrink-0" />
                      <span className="text-gray-300">{outcome}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Skills You'll Gain */}
              <motion.div variants={itemVariants}>
                <h3 className="text-2xl font-semibold text-white mb-6 flex items-center">
                  <Award className="w-6 h-6 mr-3 text-cyan-400" />
                  Skills You'll Gain
                </h3>
                <div className="flex flex-wrap gap-3">
                  {course.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 text-purple-300 rounded-lg border border-purple-500/30 font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Course Modules */}
      <section className="py-20 bg-black/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            <motion.h2
              variants={itemVariants}
              className="text-3xl md:text-4xl font-display font-bold text-center mb-16"
            >
              <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Course Curriculum
              </span>
            </motion.h2>

            <motion.div variants={itemVariants} className="max-w-4xl mx-auto">
              <div className="space-y-4">
                {course.modules.map((module, index) => (
                  <div
                    key={index}
                    className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10 hover:border-purple-400/30 transition-all duration-300"
                  >
                    <div className="flex items-center">
                      <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full text-white font-bold mr-4">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-white mb-1">{module}</h4>
                        <p className="text-gray-400 text-sm">Module {index + 1}</p>
                      </div>
                      <BookOpen className="w-5 h-5 text-purple-400" />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Prerequisites & Career Paths */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Prerequisites */}
            <motion.div
              variants={itemVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
            >
              <h3 className="text-2xl font-semibold text-white mb-6">Prerequisites</h3>
              <div className="space-y-4">
                {course.prerequisites.map((prereq, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-purple-400 mr-3 mt-1 flex-shrink-0" />
                    <span className="text-gray-300">{prereq}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Career Paths */}
            <motion.div
              variants={itemVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
            >
              <h3 className="text-2xl font-semibold text-white mb-6">Career Opportunities</h3>
              <div className="space-y-3">
                {course.career.map((role, index) => (
                  <div
                    key={index}
                    className="px-4 py-3 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 rounded-lg border border-purple-500/20"
                  >
                    <span className="text-white font-medium">{role}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-900/50 to-cyan-900/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            <motion.h2
              variants={itemVariants}
              className="text-3xl md:text-4xl font-display font-bold text-white mb-6"
            >
              Ready to Transform Your Career?
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-xl text-gray-300 mb-8"
            >
              Join thousands of successful graduates and take the first step towards your dream tech career.
            </motion.p>
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link
                to={`/apply/${courseId}`}
                className="bg-gradient-to-r from-purple-600 to-cyan-600 text-white px-8 py-4 rounded-lg font-semibold hover:from-purple-700 hover:to-cyan-700 transition-all duration-300"
              >
                Enroll Now
              </Link>
              <button className="border-2 border-purple-400 text-purple-300 px-8 py-4 rounded-lg font-semibold hover:bg-purple-400/10 transition-all duration-300 flex items-center justify-center">
                <Download className="w-5 h-5 mr-2" />
                Download Brochure
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default CourseDetail;