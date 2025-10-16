'use client'

import React, { useState, useEffect, useRef } from 'react'

interface InitialPageLoaderProps {
  videoUrl?: string // Make optional with default
  duration?: number // Duration in milliseconds (default: 8000ms = 8 seconds)
  splitDuration?: number // Duration for split animation (default: 4000ms = 4 seconds)
  onComplete?: () => void
}

const InitialPageLoader: React.FC<InitialPageLoaderProps> = ({
  videoUrl = "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4", // Default video
  duration = 8000,
  splitDuration = 4000,
  onComplete,
}) => {
  const [isVisible, setIsVisible] = useState(true)
  const [isSplitting, setIsSplitting] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const videoRef2 = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (!isVisible) return

    // Start the split animation after the specified duration
    const timer = setTimeout(() => {
      setIsSplitting(true)

      // Complete the animation and hide the overlay
      const completeTimer = setTimeout(() => {
        setIsVisible(false)
        onComplete?.()
      }, splitDuration)

      return () => clearTimeout(completeTimer)
    }, duration)

    return () => clearTimeout(timer)
  }, [duration, splitDuration, onComplete, isVisible])

  useEffect(() => {
    // Auto-play both videos when component mounts and sync them
    if (videoRef.current && videoRef2.current) {
      // Sync both videos to start at the same time
      const video1 = videoRef.current
      const video2 = videoRef2.current
      
      // Set both videos to the same current time
      video1.currentTime = 0
      video2.currentTime = 0
      
      // Play both videos simultaneously
      Promise.all([
        video1.play().catch((error) => {
          console.warn('Video 1 autoplay failed:', error)
        }),
        video2.play().catch((error) => {
          console.warn('Video 2 autoplay failed:', error)
        })
      ]).then(() => {
        console.log('Both videos started playing in sync')
      })
    }
  }, [])

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 z-[9999] overflow-hidden">
      {/* Top half - everything above center line */}
      <div
        className={`absolute inset-0 transition-transform ease-in-out bg-black flex items-center justify-center ${
          isSplitting ? '-translate-y-full' : 'translate-y-0'
        }`}
        style={{
          transitionDuration: `${splitDuration}ms`,
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 50%, 0% 50%)',
        }}
      >
        <div className="relative border-4 border-white shadow-2xl">
          <video
            ref={videoRef}
            className="object-cover"
            src={videoUrl}
            muted
            playsInline
            loop={false}
            preload="auto"
            onLoadedData={() => {
              // Sync video time when loaded
              if (videoRef2.current) {
                videoRef.current!.currentTime = videoRef2.current.currentTime
              }
            }}
            style={{
              width: '60vw',
              height: '50vh',
              objectFit: 'cover',
              objectPosition: 'center center',
            }}
          />
        </div>
      </div>

      {/* Bottom half - everything below center line */}
      <div
        className={`absolute inset-0 transition-transform ease-in-out bg-black flex items-center justify-center ${
          isSplitting ? 'translate-y-full' : 'translate-y-0'
        }`}
        style={{
          transitionDuration: `${splitDuration}ms`,
          clipPath: 'polygon(0% 50%, 100% 50%, 100% 100%, 0% 100%)',
        }}
      >
        <div className="relative border-4 border-white shadow-2xl">
          <video
            ref={videoRef2}
            className="object-cover"
            src={videoUrl}
            muted
            playsInline
            loop={false}
            preload="auto"
            onLoadedData={() => {
              // Sync video time when loaded
              if (videoRef.current) {
                videoRef2.current!.currentTime = videoRef.current.currentTime
              }
            }}
            style={{
              width: '60vw',
              height: '50vh',
              objectFit: 'cover',
              objectPosition: 'center center',
            }}
          />
        </div>
      </div>

      {/* Optional loading indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="flex space-x-1">
          <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
          <div
            className="w-2 h-2 bg-white rounded-full animate-pulse"
            style={{ animationDelay: '0.2s' }}
          ></div>
          <div
            className="w-2 h-2 bg-white rounded-full animate-pulse"
            style={{ animationDelay: '0.4s' }}
          ></div>
        </div>
      </div>
    </div>
  )
}

export default InitialPageLoader
