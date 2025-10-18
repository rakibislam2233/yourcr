'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Mail, Phone, MapPin, Calendar, Building, User } from 'lucide-react';

const ResumeDemo = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: 'easeOut' }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const resumeData = {
    profile: {
      name: 'John Doe',
      title: 'Senior Software Engineer',
      email: 'john.doe@example.com',
      phone: '+1 (555) 123-4567',
      location: 'San Francisco, CA',
      summary: 'Experienced software engineer with 8+ years of expertise in building scalable web applications using React, Node.js, and cloud technologies.'
    },
    experience: [
      {
        id: 1,
        company: 'Tech Innovations Inc.',
        position: 'Senior Frontend Engineer',
        period: 'Jan 2022 - Present',
        description: 'Led frontend development of company\'s flagship SaaS product, improving user engagement by 40% and reducing load times by 25%.'
      },
      {
        id: 2,
        company: 'Web Solutions LLC',
        position: 'Frontend Developer',
        period: 'Mar 2019 - Dec 2021',
        description: 'Developed responsive web applications using React and TypeScript, contributing to 15+ successful client projects.'
      },
      {
        id: 3,
        company: 'Digital Creations',
        position: 'Junior Developer',
        period: 'Jun 2018 - Feb 2019',
        description: 'Built and maintained client websites, gaining experience in modern web development practices.'
      }
    ],
    skills: [
      'React', 'TypeScript', 'Node.js', 'Tailwind CSS', 'Next.js',
      'GraphQL', 'AWS', 'CI/CD', 'Docker', 'Redux'
    ]
  };

  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4 md:p-8"
      initial="initial"
      animate="animate"
      variants={staggerContainer}
    >
      <div className="max-w-4xl mx-auto">
        <motion.div variants={fadeInUp} className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Resume Demo</h1>
          <p className="text-gray-600 dark:text-gray-300">
            This page demonstrates the integration of Framer Motion and shadCN UI components
          </p>
        </motion.div>

        {/* Profile Card */}
        <motion.div variants={fadeInUp}>
          <Card className="mb-8 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-24"></div>
            <CardHeader className="relative -mt-16 px-6 pt-6 pb-6">
              <div className="flex flex-col md:flex-row items-center md:items-end gap-6">
                <Avatar className="w-24 h-24 border-4 border-white dark:border-gray-800">
                  <AvatarImage src="/placeholder-avatar.jpg" alt={resumeData.profile.name} />
                  <AvatarFallback>
                    <User className="w-12 h-12" />
                  </AvatarFallback>
                </Avatar>
                <div className="text-center md:text-left mt-4 md:mt-0">
                  <CardTitle className="text-2xl mb-1">{resumeData.profile.name}</CardTitle>
                  <CardDescription className="text-lg text-gray-700 dark:text-gray-300">
                    {resumeData.profile.title}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="px-6 pb-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="flex items-center">
                  <Mail className="w-4 h-4 mr-2 text-gray-500" />
                  <span className="text-gray-700 dark:text-gray-300">{resumeData.profile.email}</span>
                </div>
                <div className="flex items-center">
                  <Phone className="w-4 h-4 mr-2 text-gray-500" />
                  <span className="text-gray-700 dark:text-gray-300">{resumeData.profile.phone}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2 text-gray-500" />
                  <span className="text-gray-700 dark:text-gray-300">{resumeData.profile.location}</span>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                {resumeData.profile.summary}
              </p>
              <div className="flex flex-wrap gap-2">
                {resumeData.skills.map((skill, index) => (
                  <Button key={index} variant="outline" size="sm" className="rounded-full">
                    {skill}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Experience Section */}
        <motion.div variants={fadeInUp}>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Experience</h2>
          <div className="space-y-6">
            {resumeData.experience.map((exp, index) => (
              <motion.div
                key={exp.id}
                variants={fadeInUp}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="border-l-4 border-l-blue-500">
                  <CardHeader>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div>
                        <CardTitle className="text-xl">{exp.position}</CardTitle>
                        <CardDescription className="text-lg mt-1">{exp.company}</CardDescription>
                      </div>
                      <div className="flex items-center mt-2 md:mt-0">
                        <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                        <span className="text-gray-600 dark:text-gray-300">{exp.period}</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-300">
                      {exp.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div 
          variants={fadeInUp}
          className="mt-12 text-center"
        >
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
            Download Resume
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ResumeDemo;