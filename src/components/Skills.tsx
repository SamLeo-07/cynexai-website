import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Brain, Lightbulb, Users, Target } from 'lucide-react';

const Skills = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const skills = [
    {
      icon: Brain,
      title: 'Critical Thinking',
      description: 'Develop analytical skills to solve complex problems and make data-driven decisions in technology.',
      // All color properties explicitly set to the gold theme
      color: 'from-[#300A6E] to-amber-500', // Gold gradient for icons
      bgColor: 'bg-white', // Card background
      borderColor: 'border-[#300A6E]/30', // Card border
      titleColor: 'text-black', // Title text color
      descriptionColor: 'text-gray-800', // Description text color
    },
    {
      icon: Target,
      title: 'Problem Solving',
      description: 'Master systematic approaches to identify, analyze, and resolve technical challenges efficiently.',
      color: 'from-[#300A6E] to-yellow-500',
      bgColor: 'bg-white',
      borderColor: 'border-[#300A6E]/30',
      titleColor: 'text-black',
      descriptionColor: 'text-gray-800',
    },
    {
      icon: Lightbulb,
      title: 'Creative Thinking',
      description: 'Foster innovation and creativity to develop unique solutions and breakthrough technologies.',
      color: 'from-[#300A6E] to-orange-500',
      bgColor: 'bg-white',
      borderColor: 'border-[#300A6E]/30',
      titleColor: 'text-black',
      descriptionColor: 'text-gray-800',
    },
    {
      icon: Users,
      title: 'Interpersonal Skills',
      description: 'Build strong communication and collaboration skills essential for team success in tech.',
      color: 'from-[#300A6E] to-yellow-600',
      bgColor: 'bg-white',
      borderColor: 'border-[#300A6E]/30',
      titleColor: 'text-black',
      descriptionColor: 'text-gray-800',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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
    <section id="skills" className="py-20 relative bg-white"> {/* Section background changed to white */}
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-20 w-40 h-40 bg-[#300A6E]/10 rounded-full blur-3xl"></div> {/* Gold tint */}
        <div className="absolute bottom-1/4 -right-20 w-60 h-60 bg-[#300A6E]/10 rounded-full blur-3xl"></div> {/* Gold tint */}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl font-display font-bold mb-6 text-black" // Heading text to black
          >
            <span className="text-[#300A6E]"> {/* Highlighted text to gold */}
              Essential Skills
            </span>
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-xl text-black/80 max-w-3xl mx-auto" // Paragraph text to black/80
          >
            Beyond technical expertise, we develop the core skills that make you a well-rounded technology professional
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {skills.map((skill, index) => {
            const IconComponent = skill.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -10, scale: 1.05 }}
                className={`group ${skill.bgColor} rounded-2xl p-8 border ${skill.borderColor} hover:border-[#300A6E]/60 transition-all duration-300 hover:shadow-xl text-center`} // Using skill.bgColor and skill.borderColor
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${skill.color} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <IconComponent className="w-8 h-8 text-white" />
                </div>
                
                <h3 className={`text-xl font-semibold ${skill.titleColor} mb-4 group-hover:text-[#300A6E] transition-colors`}> {/* Dynamic title color, gold on hover */}
                  {skill.title}
                </h3>
                
                <p className={`${skill.descriptionColor} leading-relaxed`}> {/* Dynamic description color */}
                  {skill.description}
                </p>

                {/* Decorative elements */}
                <div className="mt-6 flex justify-center space-x-2">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className={`w-2 h-2 rounded-full bg-gradient-to-r ${skill.color} opacity-50 group-hover:opacity-100 transition-opacity duration-300`}
                      style={{ animationDelay: `${i * 0.2}s` }}
                    ></div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Additional Skills Section */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mt-20 text-center"
        >
          <div className="bg-[#300A6E]/10 rounded-3xl p-8 border border-[#300A6E]/30 shadow-lg"> {/* Gold tinted background, gold border */}
            <h3 className="text-2xl font-semibold text-black mb-6"> {/* Text to black */}
              Why These Skills Matter
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
              <div>
                <h4 className="text-lg font-medium text-[#300A6E] mb-3">In the Workplace</h4> {/* Gold text */}
                <p className="text-gray-800"> {/* Darker gray text */}
                  These soft skills complement your technical abilities, making you a valuable team member 
                  who can communicate effectively, solve problems creatively, and adapt to changing requirements.
                </p>
              </div>
              <div>
                <h4 className="text-lg font-medium text-[#300A6E] mb-3">For Career Growth</h4> {/* Gold text */}
                <p className="text-gray-800"> {/* Darker gray text */}
                  Leadership positions require more than technical knowledge. These skills prepare you 
                  for management roles and help you become a well-rounded technology professional.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;