'use client'

import React, { useRef, useEffect } from 'react'

interface VideoCardProps {
  videoUrl: string
  className?: string
  style?: React.CSSProperties
}

const VideoCard = ({ videoUrl, className = '', style }: VideoCardProps) => {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (videoRef.current) {
      // Auto-play the video when component mounts
      videoRef.current.play().catch((error) => {
        console.log('Auto-play failed:', error)
      })
    }
  }, [])

  return (
    <div 
      className={`relative bg-black rounded-lg overflow-hidden shadow-lg ${className}`}
      style={style}
    >
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
      {/* Hover overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center opacity-0 hover:opacity-100">
        <button className="bg-white bg-opacity-20 backdrop-blur-sm text-white px-4 py-2 rounded-full border border-white border-opacity-30 hover:bg-opacity-30 transition-all duration-300">
          View Project
        </button>
      </div>
    </div>
  )
}

export default VideoCard