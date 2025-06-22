import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, Users, Star } from 'lucide-react';

const Courses = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const courses = [
    {
      id: 'data-science-ai',
      title: 'Data Science with AI',
      description: 'Master data analysis, machine learning algorithms, and AI implementation for real-world applications.',
      image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800',
      duration: '6 months',
      students: '150+',
      rating: 4.9,
      level: 'Intermediate',
      skills: ['Python', 'TensorFlow', 'Pandas', 'Scikit-learn']
    },
    {
      id: 'machine-learning',
      title: 'Machine Learning',
      description: 'Deep dive into ML algorithms, neural networks, and predictive modeling techniques.',
      image: 'https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg?auto=compress&cs=tinysrgb&w=800',
      duration: '4 months',
      students: '200+',
      rating: 4.8,
      level: 'Advanced',
      skills: ['Python', 'PyTorch', 'Keras', 'OpenCV']
    },
    {
      id: 'llm-engineering',
      title: 'LLM Engineering',
      description: 'Build and deploy Large Language Models, understand transformers and modern NLP techniques.',
      image: 'https://images.pexels.com/photos/8386422/pexels-photo-8386422.jpeg?auto=compress&cs=tinysrgb&w=800',
      duration: '5 months',
      students: '80+',
      rating: 4.9,
      level: 'Expert',
      skills: ['Transformers', 'Hugging Face', 'BERT', 'GPT']
    },
    {
      id: 'generative-ai',
      title: 'Generative AI',
      description: 'Create AI systems that generate content, from text to images using cutting-edge techniques.',
      image: 'https://images.pexels.com/photos/8386427/pexels-photo-8386427.jpeg?auto=compress&cs=tinysrgb&w=800',
      duration: '4 months',
      students: '120+',
      rating: 4.7,
      level: 'Advanced',
      skills: ['GANs', 'VAEs', 'Diffusion Models', 'DALL-E']
    },
    {
      id: 'java-python',
      title: 'JAVA/Python',
      description: 'Master programming fundamentals with Java and Python for enterprise and AI development.',
      image: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=800',
      duration: '3 months',
      students: '300+',
      rating: 4.6,
      level: 'Beginner',
      skills: ['Java', 'Python', 'OOP', 'Data Structures']
    },
    {
      id: 'devops-aws',
      title: 'DevOps/AWS',
      description: 'Learn cloud infrastructure, CI/CD pipelines, and deployment strategies on AWS.',
      image: 'https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&w=800',
      duration: '5 months',
      students: '180+',
      rating: 4.8,
      level: 'Intermediate',
      skills: ['AWS', 'Docker', 'Kubernetes', 'Jenkins']
    },
    {
      id: 'web-development',
      title: 'Web Development',
      description: 'Build modern, responsive web applications using the latest frameworks and technologies.',
      image: 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=800',
      duration: '4 months',
      students: '250+',
      rating: 4.7,
      level: 'Beginner',
      skills: ['React', 'Node.js', 'MongoDB', 'TypeScript']
    },
    {
      id: 'testing',
      title: 'Testing',
      description: 'Master software testing methodologies, automation frameworks, and quality assurance.',
      image: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=800',
      duration: '3 months',
      students: '140+',
      rating: 4.5,
      level: 'Intermediate',
      skills: ['Selenium', 'Jest', 'Cypress', 'API Testing']
    },
    {
      id: 'sap',
      title: 'SAP',
      description: 'Enterprise resource planning with SAP modules and business process optimization.',
      image: 'https://images.pexels.com/photos/1181316/pexels-photo-1181316.jpeg?auto=compress&cs=tinysrgb&w=800',
      duration: '6 months',
      students: '90+',
      rating: 4.6,
      level: 'Professional',
      skills: ['SAP HANA', 'ABAP', 'Fiori', 'S/4HANA']
    }
  ];

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
    <section id="courses" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl font-display font-bold mb-6"
          >
            <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Transform Your Skills
            </span>
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-300 max-w-3xl mx-auto"
          >
            Choose from our comprehensive range of courses designed to prepare you for the future of technology
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {courses.map((course, index) => (
            <motion.div
              key={course.id}
              variants={itemVariants}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group bg-background-100 text-background rounded-2xl overflow-hidden border border-white/10 hover:border-purple-400/30 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/10"
            >
              <div className="relative overflow-hidden">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute top-4 right-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    course.level === 'Beginner' ? 'bg-green-500/20 text-green-300 border border-green-500/30' :
                    course.level === 'Intermediate' ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30' :
                    course.level === 'Advanced' ? 'bg-orange-500/20 text-orange-300 border border-orange-500/30' :
                    'bg-red-500/20 text-red-300 border border-red-500/30'
                  }`}>
                    {course.level}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-purple-300 transition-colors">
                  {course.title}
                </h3>
                <p className="text-gray-400 mb-4 line-clamp-2">
                  {course.description}
                </p>

                <div className="flex items-center justify-between mb-4 text-sm text-gray-400">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {course.duration}
                  </div>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-1" />
                    {course.students}
                  </div>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 mr-1 text-yellow-400" />
                    {course.rating}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  {course.skills.slice(0, 3).map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded-md text-xs border border-purple-500/30"
                    >
                      {skill}
                    </span>
                  ))}
                  {course.skills.length > 3 && (
                    <span className="px-2 py-1 bg-gray-500/20 text-gray-400 rounded-md text-xs">
                      +{course.skills.length - 3} more
                    </span>
                  )}
                </div>

                <Link
                  to={`/course/${course.id}`}
                  className="group/btn w-full bg-primary text-secondary hover:bg-primary-600 py-3 px-4 rounded-lg font-medium hover:from-purple-700 hover:to-cyan-700 transition-all duration-300 flex items-center justify-center"
                >
                  Learn More
                  <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
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