"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Users, Award, Target, Lightbulb, Calendar, MapPin, Mail, Phone, ShoppingCart } from "lucide-react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { useState } from "react"
import CartSidebar from "@/components/cart-sidebar"
import { useCart } from "@/components/cart-context"

const timeline = [
  {
    year: "1985",
    title: "Foundation of Excellence",
    description:
      "Chennai Public School was established with a vision to provide world-class education and nurture future leaders.",
    milestone: "School Founded",
  },
  {
    year: "1995",
    title: "Commerce Program Launch",
    description:
      "Launched our pioneering commerce education program, setting new standards in business education across Tamil Nadu.",
    milestone: "First Commerce Batch",
  },
  {
    year: "2005",
    title: "Technology Integration",
    description:
      "Became one of the first schools to integrate advanced technology in commerce education with smart classrooms.",
    milestone: "Digital Transformation",
  },
  {
    year: "2015",
    title: "Innovation Hub Establishment",
    description: "Established the Innovation Hub for student entrepreneurship and business incubation programs.",
    milestone: "Startup Incubator",
  },
  {
    year: "2020",
    title: "Digital Learning Revolution",
    description:
      "Successfully transitioned to hybrid learning models during the global pandemic, maintaining educational excellence.",
    milestone: "Hybrid Education",
  },
  {
    year: "2025",
    title: "Commerce Expo Launch",
    description:
      "Launched the annual Commerce Expo to showcase student innovations and strengthen industry partnerships.",
    milestone: "Expo Inauguration",
  },
]

const achievements = [
  { number: "40+", label: "Years of Excellence", icon: Calendar },
  { number: "15,000+", label: "Alumni Worldwide", icon: Users },
  { number: "200+", label: "Awards & Recognition", icon: Award },
  { number: "95%", label: "University Placement", icon: Target },
]

const team = [
  {
    name: "Dr. Rajesh Kumar",
    role: "Principal & Expo Director",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face",
    description: "Leading educational innovation for over 20 years with expertise in modern pedagogy",
    qualifications: "Ph.D. in Education, M.B.A.",
  },
  {
    name: "Prof. Meera Sharma",
    role: "Commerce Department Head",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&crop=face",
    description: "Expert in modern business education methodologies and curriculum development",
    qualifications: "M.Com, B.Ed, CPA",
  },
  {
    name: "Mr. Arjun Patel",
    role: "Technology Coordinator",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
    description: "Bridging technology and education for future-ready learning experiences",
    qualifications: "M.Tech, B.E. Computer Science",
  },
  {
    name: "Ms. Priya Reddy",
    role: "Student Innovation Lead",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face",
    description: "Mentoring the next generation of entrepreneurs and innovators",
    qualifications: "M.B.A., B.Tech",
  },
]

const facilities = [
  {
    name: "Innovation Lab",
    description: "State-of-the-art facility for student projects and research",
    image: "https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=400&h=300&fit=crop",
  },
  {
    name: "Digital Library",
    description: "Comprehensive collection of business and commerce resources",
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop",
  },
  {
    name: "Conference Center",
    description: "Modern venue for seminars, workshops, and industry interactions",
    image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=400&h=300&fit=crop",
  },
  {
    name: "Startup Incubator",
    description: "Dedicated space for nurturing student entrepreneurship",
    image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400&h=300&fit=crop",
  },
]

export default function AboutPage() {
  const router = useRouter()
  const [isCartOpen, setIsCartOpen] = useState(false)
  const { items } = useCart()

  const handleBack = () => {
    router.push("/")
  }

  const handleContact = () => {
    alert("Contact form coming soon! Please call +91-44-1234-5678 for immediate assistance.")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50"
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Button onClick={handleBack} variant="ghost" className="text-gray-600 hover:text-gray-900 hover:bg-gray-100">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>

          <div className="flex items-center gap-3">
            <Image src="/cps-logo.png" alt="Chennai Public School Logo" width={32} height={32} className="rounded" />
            <span className="font-bold text-gray-900">About CPS</span>
          </div>

          <Button
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white relative"
            onClick={() => setIsCartOpen(true)}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Cart ({items.length})
            {items.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                {items.length}
              </span>
            )}
          </Button>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 text-white">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-7xl mx-auto px-6 py-20 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto">
            <div className="mb-8">
              <Image
                src="/cps-logo.png"
                alt="Chennai Public School Logo"
                width={120}
                height={120}
                className="mx-auto rounded-2xl mb-6"
              />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              About Chennai Public School
              <span className="block text-2xl md:text-3xl text-blue-300 font-normal mt-2">
                Excellence • Innovation • Leadership
              </span>
            </h1>
            <p className="text-lg md:text-xl mb-8 opacity-90 max-w-3xl mx-auto">
              Empowering the next generation of business leaders through innovation, technology, and excellence in
              education since 1985
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
        >
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.label}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <achievement.icon className="h-6 w-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">{achievement.number}</div>
              <div className="text-gray-600 text-sm font-medium">{achievement.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Mission & Vision */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Our Mission & Vision</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-6">
                <Target className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                To nurture innovative minds and create future business leaders who will drive positive change in the
                global economy. We believe in combining traditional values with cutting-edge technology to provide
                holistic education that prepares students for the challenges of tomorrow.
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-blue-100 text-blue-800 border-blue-200">Innovation</Badge>
                <Badge className="bg-purple-100 text-purple-800 border-purple-200">Excellence</Badge>
                <Badge className="bg-green-100 text-green-800 border-green-200">Leadership</Badge>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6">
                <Lightbulb className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                To be recognized as the premier institution for commerce education, fostering creativity, critical
                thinking, and entrepreneurial spirit among students while maintaining the highest standards of academic
                excellence and social responsibility.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-gray-700">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Global perspective in education</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span>Technology-driven learning</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Industry-ready graduates</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Our Journey Through Time</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Four decades of educational excellence and continuous innovation in commerce education
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>

            {timeline.map((item, index) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className={`relative flex items-center mb-12 ${index % 2 === 0 ? "justify-start" : "justify-end"}`}
              >
                <div className={`w-full md:w-5/12 ${index % 2 === 0 ? "pr-8" : "pl-8"}`}>
                  <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                    <div className="flex items-center gap-3 mb-3">
                      <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold px-4 py-2">
                        {item.year}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {item.milestone}
                      </Badge>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </div>

                <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full border-4 border-white shadow-lg"></div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Team */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Meet Our Leadership Team</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Dedicated educators and innovators working together to shape the future of commerce education
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center"
              >
                <div className="relative mb-6">
                  <Image
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    width={120}
                    height={120}
                    className="w-24 h-24 rounded-full mx-auto object-cover"
                  />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-blue-600 text-sm font-medium mb-2">{member.role}</p>
                <p className="text-gray-600 text-sm mb-3">{member.description}</p>
                <Badge variant="outline" className="text-xs">
                  {member.qualifications}
                </Badge>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Facilities */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">World-Class Facilities</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              State-of-the-art infrastructure designed to foster learning, innovation, and growth
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {facilities.map((facility, index) => (
              <motion.div
                key={facility.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100"
              >
                <div className="aspect-video overflow-hidden">
                  <Image
                    src={facility.image || "/placeholder.svg"}
                    alt={facility.name}
                    width={600}
                    height={400}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{facility.name}</h3>
                  <p className="text-gray-600">{facility.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Contact Information */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl p-8 border border-blue-200"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Get in Touch</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Ready to join our community? Contact us to learn more about our programs and admission process.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Address</h3>
              <p className="text-gray-600 text-sm">
                123 Education Street
                <br />
                T. Nagar, Chennai - 600017
                <br />
                Tamil Nadu, India
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Phone className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Phone</h3>
              <p className="text-gray-600 text-sm">
                +91-44-1234-5678
                <br />
                +91-44-8765-4321
                <br />
                Toll Free: 1800-123-4567
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Mail className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Email</h3>
              <p className="text-gray-600 text-sm">
                info@cps.edu.in
                <br />
                admissions@cps.edu.in
                <br />
                expo@cps.edu.in
              </p>
            </div>
          </div>

          <div className="text-center">
            <Button
              onClick={handleContact}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-8 py-3"
            >
              Contact Us Today
            </Button>
          </div>
        </motion.div>
      </div>
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  )
}
