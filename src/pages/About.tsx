/**
 * About page providing information about CourseHub, mission, team, and values
 */
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  ArrowLeft, 
  BookOpen, 
  Users, 
  Award, 
  Target, 
  Lightbulb, 
  Heart, 
  Globe, 
  Star,
  CheckCircle,
  TrendingUp,
  Shield,
  Zap
} from 'lucide-react'

interface TeamMember {
  id: string
  name: string
  role: string
  bio: string
  image?: string
  expertise: string[]
}

interface Statistic {
  id: string
  value: string
  label: string
  icon: any
  color: string
}

interface Milestone {
  year: string
  title: string
  description: string
}

export default function About() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeTab, setActiveTab] = useState<'mission' | 'team' | 'values'>('mission')

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const teamMembers: TeamMember[] = [
    {
      id: '1',
      name: 'Dr. Sarah Johnson',
      role: 'CEO & Founder',
      bio: 'PhD in Computer Science with 15+ years of experience in educational technology. Passionate about making quality education accessible to everyone.',
      image: 'https://pub-cdn.sider.ai/u/U0Z6HZJGK2R/web-coder/68aee64d7b28bae49830d951/resource/3e244bf3-cfbc-4acc-afbb-813b85ce3cea.jpg',
      expertise: ['EdTech', 'Leadership', 'Curriculum Design']
    },
    {
      id: '2',
      name: 'Prof. Michael Chen',
      role: 'Head of Curriculum',
      bio: 'Former professor at MIT with expertise in machine learning and data science. Dedicated to creating cutting-edge course content.',
      image: 'https://pub-cdn.sider.ai/u/U0Z6HZJGK2R/web-coder/68aee64d7b28bae49830d951/resource/a69ea0f8-1d5b-4fef-af5a-0882289917f5.jpg',
      expertise: ['Machine Learning', 'Curriculum Development', 'Research']
    },
    {
      id: '3',
      name: 'Lisa Anderson',
      role: 'Marketing Director',
      bio: 'Digital marketing expert with 10+ years of experience in growing educational platforms. Focused on community building and brand awareness.',
      image: 'https://pub-cdn.sider.ai/u/U0Z6HZJGK2R/web-coder/68aee64d7b28bae49830d951/resource/86655cbc-d95a-4d3a-a296-e91252f3d04d.jpg',
      expertise: ['Digital Marketing', 'Growth Strategy', 'Community Management']
    },
    {
      id: '4',
      name: 'James Wilson',
      role: 'Lead Developer',
      bio: 'Full-stack developer with expertise in React, Node.js, and cloud technologies. Ensures smooth learning experience for all users.',
      image: 'https://pub-cdn.sider.ai/u/U0Z6HZJGK2R/web-coder/68aee64d7b28bae49830d951/resource/198a1d17-dc0c-4da2-804f-d72db6c7c6dc.jpg',
      expertise: ['Web Development', 'Cloud Architecture', 'UI/UX']
    }
  ]

  const statistics: Statistic[] = [
    {
      id: '1',
      value: '50,000+',
      label: 'Students Enrolled',
      icon: Users,
      color: 'text-blue-600'
    },
    {
      id: '2',
      value: '100+',
      label: 'Expert Instructors',
      icon: BookOpen,
      color: 'text-green-600'
    },
    {
      id: '3',
      value: '200+',
      label: 'Courses Available',
      icon: Target,
      color: 'text-purple-600'
    },
    {
      id: '4',
      value: '95%',
      label: 'Student Satisfaction',
      icon: Star,
      color: 'text-yellow-600'
    }
  ]

  const milestones: Milestone[] = [
    {
      year: '2020',
      title: 'Founded CourseHub',
      description: 'Started with a vision to make quality education accessible to everyone worldwide.'
    },
    {
      year: '2021',
      title: 'First 10,000 Students',
      description: 'Reached our first major milestone with students from over 50 countries.'
    },
    {
      year: '2022',
      title: 'Expanded Course Catalog',
      description: 'Added advanced courses in AI, Data Science, and Cloud Computing.'
    },
    {
      year: '2023',
      title: 'Mobile App Launch',
      description: 'Launched our mobile application for learning on-the-go.'
    },
    {
      year: '2024',
      title: 'Global Recognition',
      description: 'Received awards for excellence in online education and student satisfaction.'
    }
  ]

  const values = [
    {
      icon: Heart,
      title: 'Student-First Approach',
      description: 'We prioritize student success and design everything around their learning needs.',
      color: 'text-red-500'
    },
    {
      icon: Lightbulb,
      title: 'Innovation in Learning',
      description: 'Continuously evolving our teaching methods and technology for better education.',
      color: 'text-yellow-500'
    },
    {
      icon: Shield,
      title: 'Quality Assurance',
      description: 'Maintaining high standards in course content and instructor expertise.',
      color: 'text-blue-500'
    },
    {
      icon: Globe,
      title: 'Global Accessibility',
      description: 'Making education accessible to learners from all corners of the world.',
      color: 'text-green-500'
    },
    {
      icon: Zap,
      title: 'Practical Skills',
      description: 'Focus on real-world applications and job-ready skills.',
      color: 'text-purple-500'
    },
    {
      icon: Users,
      title: 'Community Building',
      description: 'Creating a supportive learning community for collaboration and growth.',
      color: 'text-indigo-500'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">

      <header className="bg-white/90 backdrop-blur-sm shadow-lg border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center py-6">
            <Button 
              variant="ghost" 
              onClick={() => window.history.back()}
              className="mr-4 transform transition-all duration-300 hover:scale-105"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back
            </Button>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              About NotesHub
            </h1>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white py-20 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-white rounded-full mix-blend-soft-light filter blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-300 rounded-full mix-blend-soft-light filter blur-3xl opacity-20 animate-pulse animation-delay-2000"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center animate-bounce">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Empowering Learners Worldwide
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              NotesHub is a leading online learning platform dedicated to providing high-quality education that transforms lives and careers.
            </p>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {statistics.map((stat, index) => (
              <div 
                key={stat.id}
                className={`text-center transform transition-all duration-700 hover:scale-105 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className={`w-8 h-8 ${stat.color}`} />
                </div>
                <h3 className="text-3xl font-bold text-gray-800 mb-2">{stat.value}</h3>
                <p className="text-gray-600 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center space-x-4">
            {[
              { key: 'mission', label: 'Our Mission' },
              { key: 'team', label: 'Our Team' },
              { key: 'values', label: 'Our Values' }
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 ${
                  activeTab === tab.key
                    ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-100 shadow-md'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Dynamic Content Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Mission Section */}
          {activeTab === 'mission' && (
            <div className={`space-y-12 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
              <div className="text-center mb-12">
                <h3 className="text-3xl font-bold text-gray-800 mb-4">Our Mission</h3>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  We believe that education should be accessible, affordable, and effective for everyone, regardless of their background or location.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-2xl">
                    <h4 className="text-2xl font-bold text-gray-800 mb-4">What We Stand For</h4>
                    <ul className="space-y-3">
                      {[
                        'Democratizing education for all',
                        'Bridging the skills gap in the job market',
                        'Supporting lifelong learning and growth',
                        'Building a global learning community',
                        'Innovating with cutting-edge technology'
                      ].map((item, index) => (
                        <li key={index} className="flex items-center space-x-3">
                          <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                          <span className="text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="space-y-6">
                  <h4 className="text-2xl font-bold text-gray-800 mb-4">Our Journey</h4>
                  <div className="space-y-4">
                    {milestones.map((milestone, index) => (
                      <div key={index} className="flex space-x-4 p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold">
                            {milestone.year}
                          </div>
                        </div>
                        <div>
                          <h5 className="font-semibold text-gray-800">{milestone.title}</h5>
                          <p className="text-gray-600 text-sm">{milestone.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Team Section */}
          {activeTab === 'team' && (
            <div className={`space-y-12 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
              <div className="text-center mb-12">
                <h3 className="text-3xl font-bold text-gray-800 mb-4">Meet Our Team</h3>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  Our team consists of passionate educators, industry experts, and technology innovators dedicated to your success.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {teamMembers.map((member, index) => (
                  <div 
                    key={member.id}
                    className={`transform transition-all duration-700 hover:scale-105 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <Card className="h-full bg-white/90 backdrop-blur-sm shadow-xl border-0 overflow-hidden hover:shadow-2xl transition-all duration-300">
                      <div className="h-48 overflow-hidden">
                        <img 
                          src={member.image} 
                          alt={member.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <CardContent className="p-6">
                        <h4 className="text-xl font-bold text-gray-800 mb-1">{member.name}</h4>
                        <Badge className="mb-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
                          {member.role}
                        </Badge>
                        <p className="text-gray-600 text-sm mb-4 leading-relaxed">{member.bio}</p>
                        <div className="space-y-2">
                          <h5 className="font-semibold text-gray-700 text-sm">Expertise:</h5>
                          <div className="flex flex-wrap gap-1">
                            {member.expertise.map((skill, skillIndex) => (
                              <span 
                                key={skillIndex}
                                className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Values Section */}
          {activeTab === 'values' && (
            <div className={`space-y-12 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
              <div className="text-center mb-12">
                <h3 className="text-3xl font-bold text-gray-800 mb-4">Our Core Values</h3>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  These principles guide every decision we make and every course we create.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {values.map((value, index) => (
                  <div 
                    key={index}
                    className={`transform transition-all duration-700 hover:scale-105 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <Card className="h-full bg-white/90 backdrop-blur-sm shadow-xl border-0 p-6 hover:shadow-2xl transition-all duration-300">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mb-4">
                        <value.icon className={`w-8 h-8 ${value.color}`} />
                      </div>
                      <h4 className="text-xl font-bold text-gray-800 mb-3">{value.title}</h4>
                      <p className="text-gray-600 leading-relaxed">{value.description}</p>
                    </Card>
                  </div>
                ))}
              </div>

              {/* Call to Action */}
              <div className="text-center mt-16">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 max-w-4xl mx-auto">
                  <h4 className="text-2xl font-bold text-gray-800 mb-4">Join Our Learning Community</h4>
                  <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                    Become part of a global community of learners and start your journey towards personal and professional growth today.
                  </p>
                  <div className="flex justify-center space-x-4">
                    <Button 
                      onClick={() => window.location.href = '/courses'}
                      className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300 transform hover:scale-105"
                    >
                      Explore Notes
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={() => window.location.href = '/contact'}
                      className="border-blue-500 text-blue-600 hover:bg-blue-50 font-semibold py-3 px-8 rounded-xl transition-all duration-300 transform hover:scale-105"
                    >
                      Contact Us
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
              <Award className="w-8 h-8 text-white" />
            </div>
          </div>
          <p className="text-lg mb-4">Building the Future of Education</p>
          <p className="text-gray-400">Together, we can achieve extraordinary things through learning.</p>
        </div>
      </footer>
      <style>{`
        @keyframes float-particle {
          0%, 100% { 
            transform: translateY(0px) translateX(0px); 
            opacity: 0.6;
          }
          25% { 
            transform: translateY(-20px) translateX(10px); 
            opacity: 1;
          }
          50% { 
            transform: translateY(-10px) translateX(-10px); 
            opacity: 0.8;
          }
          75% { 
            transform: translateY(-30px) translateX(5px); 
            opacity: 0.9;
          }
        }
        
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes fade-in-up {
          from { 
            opacity: 0; 
            transform: translateY(30px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
        
        .animate-float-particle {
          animation: float-particle 8s ease-in-out infinite;
        }
        
        .animate-gradient-shift {
          background-size: 200% 200%;
          animation: gradient-shift 6s ease infinite;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
        
        .animation-delay-300 {
          animation-delay: 0.3s;
          opacity: 0;
        }
        
        .animation-delay-500 {
          animation-delay: 0.5s;
        }
        
        .animation-delay-1000 {
          animation-delay: 1s;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>

    </div>
  )
}