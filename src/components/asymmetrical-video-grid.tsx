'use client'

import React, { useEffect, useState } from 'react'
import VideoCard from './video-card'

interface VideoData {
  id: number
  videoUrl: string
  position: {
    top: string
    left: string
    width: string
    height: string
  }
}

const AsymmetricalVideoGrid = () => {
  const [videos, setVideos] = useState<VideoData[]>([])

  // Sample video URLs - you can replace these with actual video URLs
  const sampleVideos = [
    "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    "https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    "https://storage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
    "https://storage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4"
  ]

  const generateRandomPosition = (index: number, total: number) => {
    // Define margins (in percentage)
    const marginX = 10 // 10% margin on each side
    const marginY = 10 // 10% margin on top and bottom
    
    // Available space after margins
    const availableWidth = 100 - (marginX * 2)
    const availableHeight = 100 - (marginY * 2)
    
    // Random dimensions for each video
    const widthOptions = [25, 30, 35, 20, 28] // Different width percentages
    const heightOptions = [30, 25, 35, 40, 28] // Different height percentages
    
    const width = widthOptions[index % widthOptions.length]
    const height = heightOptions[index % heightOptions.length]
    
    // Calculate maximum positions to avoid overflow
    const maxLeft = availableWidth - width
    const maxTop = availableHeight - height
    
    // Generate random position within available space
    const left = Math.random() * maxLeft + marginX
    const top = Math.random() * maxTop + marginY
    
    return {
      top: `${top}%`,
      left: `${left}%`,
      width: `${width}%`,
      height: `${height}%`
    }
  }

  useEffect(() => {
    // Generate random positions for videos
    const videoData: VideoData[] = sampleVideos.slice(0, 6).map((url, index) => ({
      id: index,
      videoUrl: url,
      position: generateRandomPosition(index, 6)
    }))
    
    setVideos(videoData)
  }, [])

  const handleRandomize = () => {
    // Re-randomize positions
    const updatedVideos = videos.map((video, index) => ({
      ...video,
      position: generateRandomPosition(index, videos.length)
    }))
    setVideos(updatedVideos)
  }

  return (
    <section className="relative bg-red-600 min-h-screen py-16">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">Our Work</h2>
          <p className="text-white text-lg mb-6">
            Discover our creative video projects
          </p>
          <button
            onClick={handleRandomize}
            className="bg-white text-red-600 px-6 py-2 rounded-full hover:bg-gray-100 transition-colors duration-300 font-semibold"
          >
            Randomize Layout
          </button>
        </div>
        
        {/* Asymmetrical Video Grid */}
        <div className="relative h-[800px] w-full">
          {videos.map((video) => (
            <VideoCard
              key={video.id}
              videoUrl={video.videoUrl}
              className="absolute transition-all duration-500 ease-in-out"
              style={{
                top: video.position.top,
                left: video.position.left,
                width: video.position.width,
                height: video.position.height,
              }}
            />
          ))}
        </div>
        
        {/* Optional bottom section */}
        <div className="text-center mt-16">
          <h3 className="text-2xl font-semibold text-white mb-4">
            Ready to create something amazing?
          </h3>
          <button className="bg-white text-red-600 px-8 py-3 rounded-full hover:bg-gray-100 transition-colors duration-300 font-semibold">
            Get in Touch
          </button>
        </div>
      </div>
    </section>
  )
}

export default AsymmetricalVideoGrid