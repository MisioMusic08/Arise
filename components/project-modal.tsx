"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { X, Heart, Eye, Star, ExternalLink, Github, Play } from "lucide-react"
import GlassCard from "./glass-card"

interface ProjectModalProps {
  project: any
  onClose: () => void
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="w-full max-w-4xl max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <GlassCard className="p-0 overflow-hidden">
            <div className="aspect-video bg-gradient-to-r from-cyan-500/20 to-purple-500/20 relative">
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 text-white hover:bg-white/20"
                onClick={onClose}
              >
                <X className="h-5 w-5" />
              </Button>
              {project.featured && (
                <Badge className="absolute top-4 left-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-semibold">
                  <Star className="h-3 w-3 mr-1" />
                  Featured
                </Badge>
              )}
              <div className="absolute bottom-4 left-4 right-4">
                <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">{project.title}</h1>
                <p className="text-cyan-400 text-lg font-medium mb-3">by {project.student}</p>
                <div className="flex items-center gap-4 text-white/80 text-sm">
                  <div className="flex items-center gap-1">
                    <Heart className="h-4 w-4" />
                    {project.likes} likes
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye className="h-4 w-4" />
                    {project.views} views
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    {project.rating}/5
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="flex items-center gap-2 mb-6">
                <Badge variant="outline" className="border-cyan-400/50 text-cyan-400">
                  {project.category}
                </Badge>
                <div className="flex gap-2 ml-auto">
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-white/20 text-white hover:bg-white/10 bg-transparent"
                  >
                    <Github className="h-4 w-4 mr-1" />
                    Code
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-white/20 text-white hover:bg-white/10 bg-transparent"
                  >
                    <Play className="h-4 w-4 mr-1" />
                    Demo
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-white/20 text-white hover:bg-white/10 bg-transparent"
                  >
                    <ExternalLink className="h-4 w-4 mr-1" />
                    Live
                  </Button>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">Project Overview</h3>
                    <p className="text-white/80 leading-relaxed mb-4">{project.description}</p>
                    <p className="text-white/80 leading-relaxed">
                      This innovative project demonstrates the practical application of modern technology in solving
                      real-world business challenges. The solution incorporates industry best practices and cutting-edge
                      development methodologies to deliver a robust and scalable platform.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">Key Features</h3>
                    <ul className="text-white/80 space-y-2">
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span>Responsive and intuitive user interface design</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span>Real-time data processing and analytics</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span>Secure authentication and data protection</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span>Scalable architecture for future growth</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">Impact & Results</h3>
                    <p className="text-white/80 leading-relaxed">
                      The project has received positive feedback from industry experts and has the potential to be
                      implemented in real-world scenarios. It demonstrates innovative thinking and technical excellence
                      in addressing contemporary business needs.
                    </p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">Technologies Used</h3>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech: string) => (
                        <Badge key={tech} variant="secondary" className="bg-white/10 text-white/90 hover:bg-white/20">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">Project Stats</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-white/70">Development Time</span>
                        <span className="text-white font-medium">3 months</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-white/70">Team Size</span>
                        <span className="text-white font-medium">1 developer</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-white/70">Lines of Code</span>
                        <span className="text-white font-medium">~2,500</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-white/70">Status</span>
                        <Badge className="bg-green-500/20 text-green-400 border-green-400/30">Completed</Badge>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">Student Info</h3>
                    <div className="space-y-2">
                      <p className="text-white font-medium">{project.student}</p>
                      <p className="text-white/70 text-sm">Final Year Commerce Student</p>
                      <p className="text-white/70 text-sm">Specialization: Business Technology</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 mt-8 pt-6 border-t border-white/10">
                <Button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white">
                  <Heart className="h-4 w-4 mr-2" />
                  Like Project
                </Button>
                <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 bg-transparent">
                  Contact Student
                </Button>
                <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 bg-transparent">
                  Share Project
                </Button>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
