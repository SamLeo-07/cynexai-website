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
      placement: '100%',
      rating: 4.9,
      level: 'Intermediate',
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
      placement: '100%',
      rating: 4.8,
      level: 'Advanced',
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
    'llm-engineering': {
      title: 'LLM Engineering',
      subtitle: 'Building the Future with Large Language Models',
      description: 'Explore the cutting edge of AI with our LLM Engineering course. Learn to design, develop, and deploy powerful applications leveraging large language models like GPT and BERT.',
      image: 'https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=1200', // Placeholder image
      duration: '5 months',
      placement: '100%',
      rating: 4.7,
      level: 'Advanced',
      modules: [
        'Introduction to Large Language Models',
        'Transformer Architecture Deep Dive',
        'Fine-tuning and Prompt Engineering',
        'Retrieval-Augmented Generation (RAG)',
        'Deployment of LLMs',
        'Ethical Considerations in LLMs',
        'LLM Security and Privacy',
        'Building LLM-powered Applications',
        'Evaluation Metrics for LLMs',
        'Capstone Project: LLM Application Development'
      ],
      skills: ['Python', 'PyTorch', 'TensorFlow', 'Hugging Face Transformers', 'LangChain', 'Faiss', 'Docker', 'AWS'],
      outcomes: [
        'Design and implement applications using state-of-the-art LLMs',
        'Master prompt engineering for optimal LLM performance',
        'Develop and deploy custom fine-tuned LLMs',
        'Integrate LLMs with various data sources',
        'Understand and mitigate ethical biases in AI models',
        'Build scalable and robust LLM solutions'
      ],
      prerequisites: [
        'Solid Python programming skills',
        'Basic understanding of machine learning concepts',
        'Familiarity with neural networks is a plus'
      ],
      career: [
        'LLM Engineer',
        'AI/ML Engineer',
        'Prompt Engineer',
        'Applied AI Scientist',
        'Natural Language Processing Engineer'
      ]
    },
    'generative-ai': {
      title: 'Generative AI',
      subtitle: 'Unleash Creativity with AI-Powered Content Creation',
      description: 'Dive into the world of Generative AI, covering GANs, VAEs, and Diffusion Models. Learn to create realistic images, text, and other media using advanced AI techniques.',
      image: 'https://images.pexels.com/photos/8410226/pexels-photo-8410226.jpeg?auto=compress&cs=tinysrgb&w=1200', // Placeholder image
      duration: '4 months',
      placement: '100%',
      rating: 4.8,
      level: 'Intermediate',
      modules: [
        'Introduction to Generative Models',
        'Generative Adversarial Networks (GANs)',
        'Variational Autoencoders (VAEs)',
        'Diffusion Models for Image Generation',
        'Text Generation with Transformers',
        'Music and Art Generation',
        'Ethical Implications of Generative AI',
        'Evaluating Generative Models',
        'Deployment Strategies for Generative AI',
        'Final Project: Generative AI Application'
      ],
      skills: ['Python', 'TensorFlow', 'PyTorch', 'Keras', 'OpenAI API', 'Midjourney', 'Stable Diffusion'],
      outcomes: [
        'Understand the core principles of various generative models',
        'Generate high-quality images, text, and other creative content',
        'Implement and fine-tune generative models',
        'Apply generative AI to real-world creative and design problems',
        'Evaluate the quality and diversity of generated outputs',
        'Explore the ethical landscape of AI creativity'
      ],
      prerequisites: [
        'Intermediate Python programming',
        'Basic understanding of neural networks and deep learning',
        'Familiarity with linear algebra'
      ],
      career: [
        'Generative AI Engineer',
        'Creative AI Developer',
        'AI Artist',
        'Machine Learning Researcher (Generative Focus)',
        'Content Automation Specialist'
      ]
    },
    'java-python': {
      title: 'Full Stack Development with Java & Python',
      subtitle: 'Build Robust Web Applications from Frontend to Backend',
      description: 'A comprehensive program to master both Java and Python for full-stack web development, covering popular frameworks, databases, and deployment strategies.',
      image: 'https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=1200', // Placeholder image
      duration: '7 months',
      placement: '100%',
      rating: 4.9,
      level: 'Intermediate',
      modules: [
        'Core Java Programming',
        'Spring Boot Framework',
        'RESTful APIs with Java',
        'Python Fundamentals',
        'Django/Flask Web Frameworks',
        'Database Management (SQL & NoSQL)',
        'Frontend Development (React/Angular)',
        'Cloud Deployment (AWS/Azure)',
        'Microservices Architecture',
        'Version Control with Git',
        'Project: E-commerce Application'
      ],
      skills: ['Java', 'Python', 'Spring Boot', 'Django', 'Flask', 'React', 'Angular', 'SQL', 'MongoDB', 'REST APIs', 'Git', 'Docker'],
      outcomes: [
        'Develop robust and scalable backend systems with Java and Python',
        'Create dynamic and interactive frontends',
        'Design and manage relational and non-relational databases',
        'Deploy applications to cloud platforms',
        'Understand and implement microservices architecture',
        'Collaborate effectively using version control systems'
      ],
      prerequisites: [
        'Basic programming logic',
        'Understanding of web concepts (HTML, CSS)',
        'No prior Java or Python experience required'
      ],
      career: [
        'Full Stack Developer (Java/Python)',
        'Backend Developer',
        'Frontend Developer',
        'Software Engineer',
        'DevOps Engineer (related)'
      ]
    },
    'devops-aws': {
      title: 'DevOps & AWS Cloud Engineering',
      subtitle: 'Automate, Deploy, and Scale Applications on the Cloud',
      description: 'Master the essential tools and practices for DevOps and cloud computing with a focus on Amazon Web Services (AWS). Learn CI/CD, infrastructure as code, and cloud security.',
      image: 'https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&w=1200', // Placeholder image
      duration: '5 months',
      placement: '100%',
      rating: 4.7,
      level: 'Intermediate',
      modules: [
        'Introduction to DevOps Principles',
        'Linux Fundamentals',
        'Version Control with Git',
        'AWS Cloud Fundamentals',
        'Infrastructure as Code (Terraform/CloudFormation)',
        'CI/CD with Jenkins/GitLab CI',
        'Docker and Containerization',
        'Kubernetes for Orchestration',
        'Monitoring and Logging (Prometheus, Grafana)',
        'Cloud Security Best Practices',
        'Project: Automated CI/CD Pipeline on AWS'
      ],
      skills: ['AWS', 'Docker', 'Kubernetes', 'Terraform', 'Jenkins', 'GitLab CI', 'Ansible', 'Python', 'Bash', 'Linux', 'Monitoring'],
      outcomes: [
        'Design and implement robust CI/CD pipelines',
        'Automate infrastructure provisioning and management',
        'Deploy and scale applications efficiently on AWS',
        'Understand containerization and orchestration',
        'Implement monitoring and logging solutions',
        'Ensure cloud security best practices'
      ],
      prerequisites: [
        'Basic understanding of operating systems',
        'Familiarity with command-line interface',
        'No prior cloud experience necessary'
      ],
      career: [
        'DevOps Engineer',
        'Cloud Engineer (AWS)',
        'Site Reliability Engineer (SRE)',
        'Automation Engineer',
        'Cloud Architect (Associate)'
      ]
    },
    'web-development': {
      title: 'Full Stack Web Development',
      subtitle: 'Become a Modern Web Developer from Scratch',
      description: 'Learn to build dynamic and responsive web applications using HTML, CSS, JavaScript, React, Node.js, and databases. Covers both frontend and backend technologies.',
      image: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1200', // Placeholder image
      duration: '6 months',
      placement: '100%',
      rating: 4.8,
      level: 'Beginner',
      modules: [
        'HTML5 & CSS3 Essentials',
        'Modern JavaScript (ES6+)',
        'Responsive Web Design',
        'Frontend Frameworks (React.js)',
        'Node.js & Express.js',
        'Database Integration (MongoDB/SQL)',
        'Authentication and Authorization',
        'API Development',
        'Deployment to Cloud Platforms',
        'Version Control with Git',
        'Portfolio Project'
      ],
      skills: ['HTML', 'CSS', 'JavaScript', 'React.js', 'Node.js', 'Express.js', 'MongoDB', 'SQL', 'Git', 'REST APIs', 'Responsive Design'],
      outcomes: [
        'Build interactive and user-friendly web interfaces',
        'Develop powerful backend APIs',
        'Manage and interact with databases effectively',
        'Deploy web applications to live servers',
        'Create a professional development portfolio',
        'Understand and apply modern web development best practices'
      ],
      prerequisites: [
        'Basic computer literacy',
        'No prior coding experience required',
        'A passion for building web applications'
      ],
      career: [
        'Full Stack Web Developer',
        'Frontend Developer',
        'Backend Developer',
        'JavaScript Developer',
        'UI/UX Developer'
      ]
    },
    'testing': {
      title: 'Software Testing & QA Automation',
      subtitle: 'Ensure Quality with Advanced Testing Techniques',
      description: 'Master the principles of software testing, quality assurance, and automation using industry-leading tools and methodologies. Prepare for a career in QA.',
      image: 'https://images.pexels.com/photos/3184325/pexels-photo-3184325.jpeg?auto=compress&cs=tinysrgb&w=1200', // Placeholder image
      duration: '4 months',
      placement: '100%',
      rating: 4.6,
      level: 'Beginner',
      modules: [
        'Fundamentals of Software Testing',
        'Manual Testing Techniques',
        'Test Case Design and Execution',
        'Introduction to Automation Testing',
        'Selenium WebDriver with Java/Python',
        'API Testing (Postman/Rest Assured)',
        'Performance Testing (JMeter)',
        'Mobile App Testing',
        'Database Testing',
        'Agile Testing Methodologies',
        'Project: Automated Test Suite Development'
      ],
      skills: ['Manual Testing', 'Automation Testing', 'Selenium', 'Java', 'Python', 'JMeter', 'Postman', 'SQL', 'Jira', 'Agile'],
      outcomes: [
        'Conduct various types of software testing efficiently',
        'Design and execute comprehensive test plans',
        'Automate web and API tests using popular frameworks',
        'Identify and report defects effectively',
        'Work collaboratively in Agile development environments',
        'Ensure high-quality software delivery'
      ],
      prerequisites: [
        'Basic computer knowledge',
        'Attention to detail',
        'No prior testing experience necessary'
      ],
      career: [
        'QA Engineer',
        'Automation Test Engineer',
        'Software Tester',
        'Test Analyst',
        'Performance Test Engineer'
      ]
    },
    'sap': {
      title: 'SAP Consulting & Implementation',
      subtitle: 'Become an Expert in Enterprise Resource Planning',
      description: 'Learn to implement, configure, and manage SAP modules, gaining essential skills for a career in SAP consulting. Covers key areas like ECC, S/4HANA, and specific modules.',
      image: 'https://images.pexels.com/photos/669617/pexels-photo-669617.jpeg?auto=compress&cs=tinysrgb&w=1200', // Placeholder image
      duration: '6 months',
      placement: '100%',
      rating: 4.5,
      level: 'Intermediate',
      modules: [
        'Introduction to SAP ERP',
        'SAP NetWeaver Fundamentals',
        'SAP ECC Overview',
        'Introduction to SAP S/4HANA',
        'SAP Financial Accounting (FI)',
        'SAP Controlling (CO)',
        'SAP Sales and Distribution (SD)',
        'SAP Materials Management (MM)',
        'SAP Human Capital Management (HCM)',
        'SAP ABAP Programming (Basics)',
        'SAP Project Implementation Methodologies'
      ],
      skills: ['SAP ERP', 'SAP S/4HANA', 'FI/CO', 'SD', 'MM', 'HCM', 'ABAP', 'SAP Activate', 'Business Process Management', 'Consulting'],
      outcomes: [
        'Understand the core architecture and modules of SAP',
        'Configure and customize SAP systems to business needs',
        'Perform data migration and integration in SAP',
        'Troubleshoot common SAP issues',
        'Work as an effective SAP consultant or end-user',
        'Prepare for SAP certification exams'
      ],
      prerequisites: [
        'Basic understanding of business processes',
        'Familiarity with enterprise software concepts',
        'No prior SAP experience is strictly required'
      ],
      career: [
        'SAP Consultant (Functional/Technical)',
        'SAP Analyst',
        'SAP FICO Consultant',
        'SAP MM Consultant',
        'SAP ABAP Developer'
      ]
    },
  };

  const course = courseData[courseId as keyof typeof courseData];

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20 bg-white"> {/* Changed background */}
        <div className="text-center">
          <h1 className="text-2xl font-bold text-black mb-4">Course Not Found</h1> {/* Changed text color */}
          <Link to="/" className="text-[#D4AC34] hover:text-yellow-600"> {/* Changed text color */}
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
    <div className="min-h-screen pt-20 bg-white text-black"> {/* Overall background and default text color */}
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={course.image}
            alt={course.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/80"></div> {/* Solid black overlay */}
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
                className="inline-flex items-center text-[#D4AC34] hover:text-yellow-600 transition-colors" // Gold link
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Courses
              </Link>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <motion.div variants={itemVariants} className="mb-4">
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium border
                    ${course.level === 'Beginner' ? 'bg-[#D4AC34]/20 text-[#D4AC34] border-[#D4AC34]/30' : // Gold for Beginner
                    course.level === 'Intermediate' ? 'bg-[#D4AC34]/20 text-[#D4AC34] border-[#D4AC34]/30' : // Gold for Intermediate
                    course.level === 'Advanced' ? 'bg-[#D4AC34]/20 text-[#D4AC34] border-[#D4AC34]/30' : // Gold for Advanced
                    'bg-[#D4AC34]/20 text-[#D4AC34] border-[#D4AC34]/30' // Default to gold
                    }`}>
                    {course.level}
                  </span>
                </motion.div>

                <motion.h1
                  variants={itemVariants}
                  className="text-4xl md:text-5xl font-display font-bold text-white mb-4" // Main title remains white for contrast
                >
                  {course.title}
                </motion.h1>

                <motion.p
                  variants={itemVariants}
                  className="text-gray-300 mb-6" // Subtitle slightly lighter gray
                >
                  {course.subtitle}
                </motion.p>

                <motion.p
                  variants={itemVariants}
                  className="text-gray-400 mb-8 leading-relaxed" // Description a bit lighter gray
                >
                  {course.description}
                </motion.p>

                <motion.div
                  variants={itemVariants}
                  className="flex flex-wrap items-center gap-6 mb-8"
                >
                  <div className="flex items-center text-gray-300">
                    <Clock className="w-5 h-5 mr-2 text-[#D4AC34]" /> {/* Gold icon */}
                    {course.duration}
                  </div>
                  <div className="flex items-center text-gray-300">
                    <Briefcase className="w-5 h-5 mr-2 text-[#D4AC34]" /> {/* Gold icon */}
                    Job/Internship Placement: {course.placement}
                  </div>
                  <div className="flex items-center text-gray-300">
                    <Star className="w-5 h-5 mr-2 text-yellow-400" /> {/* Stars usually remain yellow */}
                    {course.rating} rating
                  </div>
                </motion.div>

                <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
                  <Link
                    to={`/apply/${courseId}`}
                    className="bg-[#D4AC34] text-black hover:bg-yellow-600 px-8 py-4 rounded-lg font-semibold text-center transition-all duration-300" // Gold background, black text
                  >
                    Join the Course
                  </Link>
                  <button className="border-2 border-[#D4AC34] text-[#D4AC34] px-8 py-4 rounded-lg font-semibold hover:bg-[#D4AC34]/10 transition-all duration-300 flex items-center justify-center"> {/* Gold border, gold text */}
                    <Play className="w-5 h-5 mr-2" />
                    Watch Preview
                  </button>
                </motion.div>
              </div>

              {/* Course Info Card */}
              <motion.div
                variants={itemVariants}
                className="bg-black/50 backdrop-blur-sm rounded-2xl p-8 border border-white/20" // Darker card for contrast
              >
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-white mb-2">
                    Start Your Journey Today!
                  </div>
                  <div className="text-gray-400 text-lg">
                    Invest in your future with our industry-leading program.
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
                    <span className="text-gray-300">Job/Internship Placement</span>
                    <span className="text-white font-medium">{course.placement}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Certificate</span>
                    <span className="text-white font-medium">Yes</span>
                  </div>
                </div>

                <Link
                  to={`/apply/${courseId}`}
                  className="w-full bg-[#D4AC34] text-black hover:bg-yellow-600 py-4 px-6 rounded-lg font-semibold text-center block transition-all duration-300" // Gold background, black text
                >
                  Enroll Now
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* What You'll Learn Section */}
      <section className="py-20 bg-white"> {/* Section background changed to white */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            <motion.h2
              variants={itemVariants}
              className="text-3xl md:text-4xl font-display font-bold text-center mb-16 text-black" // Heading text to black
            >
              <span className="text-[#D4AC34]"> {/* Highlighted text to gold */}
                What You'll Learn
              </span>
            </motion.h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Learning Outcomes */}
              <motion.div variants={itemVariants}>
                <h3 className="text-2xl font-semibold text-black mb-6 flex items-center"> {/* Heading text to black */}
                  <Target className="w-6 h-6 mr-3 text-[#D4AC34]" /> {/* Gold icon */}
                  Learning Outcomes
                </h3>
                <div className="space-y-4">
                  {course.outcomes.map((outcome, index) => (
                    <div key={index} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-[#D4AC34] mr-3 mt-1 flex-shrink-0" /> {/* Gold icon */}
                      <span className="text-gray-800">{outcome}</span> {/* Text to darker gray */}
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Skills You'll Gain */}
              <motion.div variants={itemVariants}>
                <h3 className="text-2xl font-semibold text-black mb-6 flex items-center"> {/* Heading text to black */}
                  <Award className="w-6 h-6 mr-3 text-[#D4AC34]" /> {/* Gold icon */}
                  Skills You'll Gain
                </h3>
                <div className="flex flex-wrap gap-3">
                  {course.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-[#D4AC34]/10 text-black rounded-lg border border-[#D4AC34]/30 font-medium" // Gold tint background, gold border, black text
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
      <section className="py-20 bg-gray-100"> {/* Changed background to a light gray */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            <motion.h2
              variants={itemVariants}
              className="text-3xl md:text-4xl font-display font-bold text-center mb-16 text-black" // Heading text to black
            >
              <span className="text-[#D4AC34]"> {/* Highlighted text to gold */}
                Course Curriculum
              </span>
            </motion.h2>

            <motion.div variants={itemVariants} className="max-w-4xl mx-auto">
              <div className="space-y-4">
                {course.modules.map((module, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg p-6 border border-gray-200 hover:border-[#D4AC34]/50 transition-all duration-300" // White background, light gray border, gold hover
                  >
                    <div className="flex items-center">
                      <div className="flex items-center justify-center w-10 h-10 bg-[#D4AC34] rounded-full text-white font-bold mr-4"> {/* Gold circle */}
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-black mb-1">{module}</h4> {/* Black text */}
                        <p className="text-gray-600 text-sm">Module {index + 1}</p> {/* Darker gray text */}
                      </div>
                      <BookOpen className="w-5 h-5 text-[#D4AC34]" /> {/* Gold icon */}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Prerequisites & Career Paths */}
      <section className="py-20 bg-white"> {/* Section background changed to white */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Prerequisites */}
            <motion.div
              variants={itemVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="bg-gray-50 rounded-2xl p-8 border border-gray-200" // Light gray background, light gray border
            >
              <h3 className="text-2xl font-semibold text-black mb-6">Prerequisites</h3> {/* Black text */}
              <div className="space-y-4">
                {course.prerequisites.map((prereq, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-[#D4AC34] mr-3 mt-1 flex-shrink-0" /> {/* Gold icon */}
                    <span className="text-gray-800">{prereq}</span> {/* Darker gray text */}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Career Paths */}
            <motion.div
              variants={itemVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="bg-gray-50 rounded-2xl p-8 border border-gray-200" // Light gray background, light gray border
            >
              <h3 className="text-2xl font-semibold text-black mb-6">Career Opportunities</h3> {/* Black text */}
              <div className="space-y-3">
                {course.career.map((role, index) => (
                  <div
                    key={index}
                    className="px-4 py-3 bg-[#D4AC34]/10 rounded-lg border border-[#D4AC34]/20" // Gold tint background, gold border
                  >
                    <span className="text-black font-medium">{role}</span> {/* Black text */}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-black via-gray-900 to-black"> {/* Dark gradient */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            <motion.h2
              variants={itemVariants}
              className="text-3xl md:text-4xl font-display font-bold text-white mb-6" // Title remains white
            >
              Ready to Transform Your Career?
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-gray-300 mb-8" // Text remains gray-300
            >
              Join thousands of successful graduates and take the first step towards your dream tech career.
            </motion.p>
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link
                to={`/apply/${courseId}`}
                className="bg-[#D4AC34] text-black hover:bg-yellow-600 px-8 py-4 rounded-lg font-semibold transition-all duration-300" // Gold background, black text
              >
                Enroll Now
              </Link>
              <button className="border-2 border-[#D4AC34] text-[#D4AC34] px-8 py-4 rounded-lg font-semibold hover:bg-[#D4AC34]/10 transition-all duration-300 flex items-center justify-center"> {/* Gold border, gold text */}
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