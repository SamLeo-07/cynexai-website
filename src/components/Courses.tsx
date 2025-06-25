import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, Users, Star } from 'lucide-react';

const Courses = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const courses = [
    {
      id: 'data-science-machine-learning',
      title: 'Data Science & Machine Learning',
      description: 'Master data analysis, machine learning algorithms, and AI implementation for real-world applications.',
      image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800',
      duration: '6 months',
      students: '150+',
      rating: 4.9,
      level: 'Intermediate',
      skills: ['Python', 'TensorFlow', 'Pandas', 'Scikit-learn']
    },
    {
      id: 'artificial-intelligence-generative-ai',
      title: 'Artificial Intelligence & Generative AI',
      description: 'Deep dive into ML algorithms, neural networks, and advanced generative modeling techniques.',
      image: 'https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg?auto=compress&cs=tinysrgb&w=800',
      duration: '4 months',
      students: '200+',
      rating: 4.8,
      level: 'Advanced',
      skills: ['Python', 'PyTorch', 'Keras', 'Transformers']
    },
    {
      id: 'full-stack-java-development',
      title: 'Full Stack Java Development',
      description: 'Build robust web applications from frontend to backend using Java frameworks like Spring Boot.',
      image: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=800', // Image adjusted to suit programming
      duration: '5 months',
      students: '120+',
      rating: 4.7,
      level: 'Intermediate',
      skills: ['Java', 'Spring Boot', 'React/Angular', 'SQL']
    },
    {
      id: 'devops-cloud-technologies',
      title: 'DevOps & Cloud Technologies',
      description: 'Learn cloud infrastructure, CI/CD pipelines, and deployment strategies on AWS, Azure, or GCP.',
      image: 'https://images.pexels.com/photos/8386422/pexels-photo-8386422.jpeg?auto=compress&cs=tinysrgb&w=800',
      duration: '5 months',
      students: '180+',
      rating: 4.8,
      level: 'Intermediate',
      skills: ['AWS', 'Docker', 'Kubernetes', 'Jenkins']
    },
    {
      id: 'python-programming',
      title: 'Python Programming',
      description: 'Master Python fundamentals for data analysis, web development, and automation.',
      image: 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=800',
      duration: '3 months',
      students: '250+',
      rating: 4.7,
      level: 'Beginner',
      skills: ['Python', 'OOP', 'Data Structures', 'Flask/Django']
    },
    {
      id: 'software-testing-manual-automation',
      title: 'Software Testing (Manual + Automation)',
      description: 'Master software testing methodologies, automation frameworks, and quality assurance for robust applications.',
      image: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=800', // Image adjusted to suit testing
      duration: '3 months',
      students: '140+',
      rating: 4.5,
      level: 'Intermediate',
      skills: ['Selenium', 'Jest', 'Cypress', 'API Testing']
    },
    {
      id: 'sap-data-processing',
      title: 'SAP (Systems, Applications, and Products in Data Processing)',
      description: 'Enterprise resource planning with SAP modules, business process optimization, and implementation strategies.',
      image: 'https://images.pexels.com/photos/1181316/pexels-photo-1181316.jpeg?auto=compress&cs=tinysrgb&w=800',
      duration: '6 months',
      students: '90+',
      rating: 4.6,
      level: 'Professional',
      skills: ['SAP HANA', 'ABAP', 'Fiori', 'S/4HANA']
    },
  ];

  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
  const itemVariants = { hidden: { y: 50, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: 'easeOut' } } };

  return (
    <section id="courses" className="py-20 bg-white text-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div ref={ref} variants={containerVariants} initial="hidden" animate={inView ? 'visible' : 'hidden'} className="text-center mb-16">
          <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-display font-bold mb-6">
            <span className="text-[#41c8df]">Transform Your Skills</span>
          </motion.h2>
          <motion.p variants={itemVariants} className="text-xl text-gray-700 max-w-3xl mx-auto">
            Choose from our comprehensive range of courses designed to prepare you for the future of technology
          </motion.p>
        </motion.div>

        <motion.div variants={containerVariants} initial="hidden" animate={inView ? 'visible' : 'hidden'} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <motion.div key={course.id} variants={itemVariants} whileHover={{ y: -10, scale: 1.02 }} className="group bg-gray-50 rounded-2xl overflow-hidden border border-gray-200 hover:border-[#41c8df] transition-all duration-300 shadow-sm">
              <div className="relative overflow-hidden">
                <img src={course.image} alt={course.title} className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3 transition-colors">
                  {course.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {course.description}
                </p>

                <div className="flex items-center justify-between mb-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1 text-gray-500" />{course.duration}
                  </div>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-1 text-gray-500" />{course.students}
                  </div>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 mr-1 text-[#41c8df]" />{course.rating}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  {course.skills.slice(0, 3).map((skill, skillIndex) => (
                    <span key={skillIndex} className="px-2 py-1 bg-[#41c8df]/10 text-[#41c8df] rounded-md text-xs border border-[#41c8df]/30">
                      {skill}
                    </span>
                  ))}
                  {course.skills.length > 3 && (
                    <span className="px-2 py-1 bg-gray-200 text-gray-600 rounded-md text-xs">
                      +{course.skills.length - 3} more
                    </span>
                  )}
                </div>

                <Link to={`/course/${course.id}`} className="w-full block bg-[#41c8df] text-white py-3 px-4 rounded-lg font-medium text-center hover:bg-[#c09a2f] transition-colors duration-300 flex items-center justify-center">
                  Learn More
                  <ArrowRight className="ml-2 w-4 h-4 transition-transform" />
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Courses;