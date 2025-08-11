"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Heart, Eye, Search, Star, ExternalLink } from "lucide-react"
import { useState } from "react"
import ParticleBackground from "@/components/particle-background"
import GlassCard from "@/components/glass-card"
import ProjectModal from "@/components/project-modal"

const projects = [
  {
    id: 1,
    title: "AI-Powered Inventory Management",
    student: "Arjun Sharma",
    description: "Revolutionary inventory system using machine learning to predict demand and optimize stock levels.",
    category: "Innovation",
    image: "/placeholder.svg?height=200&width=300",
    likes: 45,
    views: 230,
    rating: 4.8,
    featured: true,
    technologies: ["React", "Python", "TensorFlow", "MySQL"],
  },
  {
    id: 2,
    title: "Sustainable Fashion Marketplace",
    student: "Priya Patel",
    description: "E-commerce platform connecting eco-conscious consumers with sustainable fashion brands.",
    category: "Marketing",
    image: "/placeholder.svg?height=200&width=300",
    likes: 38,
    views: 180,
    rating: 4.6,
    featured: false,
    technologies: ["Next.js", "Stripe", "MongoDB", "Tailwind"],
  },
  {
    id: 3,
    title: "Blockchain Supply Chain Tracker",
    student: "Rahul Kumar",
    description: "Transparent supply chain tracking system using blockchain technology for food safety.",
    category: "Innovation",
    image: "/placeholder.svg?height=200&width=300",
    likes: 52,
    views: 310,
    rating: 4.9,
    featured: true,
    technologies: ["Solidity", "Web3", "React", "IPFS"],
  },
  {
    id: 4,
    title: "Social Media Analytics Dashboard",
    student: "Sneha Reddy",
    description: "Comprehensive analytics platform for businesses to track social media performance.",
    category: "Design",
    image: "/placeholder.svg?height=200&width=300",
    likes: 29,
    views: 150,
    rating: 4.4,
    featured: false,
    technologies: ["Vue.js", "D3.js", "Node.js", "PostgreSQL"],
  },
  {
    id: 5,
    title: "Virtual Reality Shopping Experience",
    student: "Karthik Nair",
    description: "Immersive VR shopping platform that revolutionizes online retail experience.",
    category: "Innovation",
    image: "/placeholder.svg?height=200&width=300",
    likes: 67,
    views: 420,
    rating: 4.7,
    featured: true,
    technologies: ["Unity", "C#", "WebXR", "Three.js"],
  },
  {
    id: 6,
    title: "Micro-Investment App for Students",
    student: "Ananya Singh",
    description: "Mobile app enabling students to start investing with small amounts and learn financial literacy.",
    category: "Marketing",
    image: "/placeholder.svg?height=200&width=300",
    likes: 41,
    views: 200,
    rating: 4.5,
    featured: false,
    technologies: ["React Native", "Firebase", "Plaid API", "Chart.js"],
  },
]

export default function ProjectsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedProject, setSelectedProject] = useState(null)

  const categories = ["All", "Innovation", "Marketing", "Design"]

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.student.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "All" || project.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleLike = (projectId) => {
    // In a real app, this would make an API call
    console.log(`Liked project ${projectId}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative">
      <ParticleBackground />

      {/* Header */}
      <div className="relative z-10 pt-20 pb-12 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <motion.h1
            className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Student Projects
          </motion.h1>
          <motion.p
            className="text-xl text-white/80 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Innovative solutions from tomorrow's business leaders
          </motion.p>
        </div>
      </div>

      {/* Filters */}
      <div className="relative z-10 px-6 mb-12">
        <div className="max-w-6xl mx-auto">
          <GlassCard className="p-6">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 h-4 w-4" />
                <Input
                  placeholder="Search projects or students..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50"
                />
              </div>
              <div className="flex gap-2 flex-wrap">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className={
                      selectedCategory === category
                        ? "bg-cyan-500 hover:bg-cyan-600"
                        : "border-white/20 text-white/80 hover:bg-white/10"
                    }
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
          </GlassCard>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="relative z-10 px-6 pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="cursor-pointer group"
                onClick={() => setSelectedProject(project)}
              >
                <GlassCard className="overflow-hidden h-full">
                  <div className="aspect-video bg-gradient-to-r from-cyan-500/20 to-purple-500/20 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    {project.featured && (
                      <Badge className="absolute top-3 left-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-semibold">
                        <Star className="h-3 w-3 mr-1" />
                        Featured
                      </Badge>
                    )}
                    <div className="absolute bottom-3 left-3 right-3">
                      <div className="flex items-center justify-between text-white text-sm">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              handleLike(project.id)
                            }}
                            className="flex items-center gap-1 hover:text-red-400 transition-colors"
                          >
                            <Heart className="h-4 w-4" />
                            {project.likes}
                          </button>
                          <div className="flex items-center gap-1">
                            <Eye className="h-4 w-4" />
                            {project.views}
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          {project.rating}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <Badge variant="outline" className="border-cyan-400/50 text-cyan-400">
                        {project.category}
                      </Badge>
                      <ExternalLink className="h-4 w-4 text-white/50 group-hover:text-cyan-400 transition-colors" />
                    </div>

                    <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                      {project.title}
                    </h3>

                    <p className="text-cyan-400 text-sm mb-2 font-medium">by {project.student}</p>

                    <p className="text-white/70 mb-4 line-clamp-3">{project.description}</p>

                    <div className="flex flex-wrap gap-1">
                      {project.technologies.slice(0, 3).map((tech) => (
                        <Badge key={tech} variant="secondary" className="text-xs bg-white/10 text-white/80">
                          {tech}
                        </Badge>
                      ))}
                      {project.technologies.length > 3 && (
                        <Badge variant="secondary" className="text-xs bg-white/10 text-white/80">
                          +{project.technologies.length - 3}
                        </Badge>
                      )}
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Project Modal */}
      {selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />}
    </div>
  )
}
