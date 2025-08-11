"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { X, Calendar, MapPin, Users, Clock } from "lucide-react"
import GlassCard from "./glass-card"

interface EventModalProps {
  event: any
  onClose: () => void
}

export default function EventModal({ event, onClose }: EventModalProps) {
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
          className="w-full max-w-2xl max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <GlassCard className="p-0 overflow-hidden">
            <div className="aspect-video bg-gradient-to-r from-cyan-500/20 to-blue-500/20 relative">
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 text-white hover:bg-white/20"
                onClick={onClose}
              >
                <X className="h-5 w-5" />
              </Button>
              {event.featured && <Badge className="absolute top-4 left-4 bg-cyan-500 text-white">Featured</Badge>}
              <div className="absolute bottom-4 left-4 right-4">
                <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">{event.title}</h1>
                <div className="flex flex-wrap gap-4 text-white/80 text-sm">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {new Date(event.date).toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {event.location}
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    {event.attendees} attendees
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Badge variant="outline" className="border-cyan-400/50 text-cyan-400">
                  {event.category}
                </Badge>
                <div className="flex items-center gap-1 text-white/60 text-sm">
                  <Clock className="h-4 w-4" />2 hours
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">About This Event</h3>
                  <p className="text-white/80 leading-relaxed">{event.description}</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">What You'll Learn</h3>
                  <ul className="text-white/80 space-y-1">
                    <li>• Latest industry trends and best practices</li>
                    <li>• Hands-on experience with cutting-edge tools</li>
                    <li>• Networking opportunities with industry experts</li>
                    <li>• Practical insights for career development</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Prerequisites</h3>
                  <p className="text-white/80">Basic understanding of business concepts. All skill levels welcome!</p>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <Button className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white">
                  Register Now
                </Button>
                <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 bg-transparent">
                  Add to Calendar
                </Button>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
