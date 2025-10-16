'use client'

import React, { useRef, useEffect } from 'react'

interface VideoHeroProps {
  videoUrl: string
}

const VideoHero = ({ videoUrl }: VideoHeroProps) => {
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
    <div className="relative w-full h-screen overflow-hidden">
      {/* Full-width background video */}
      <video
        ref={videoRef}
        className="absolute top-0 left-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      </div>
  )
}

export default VideoHero