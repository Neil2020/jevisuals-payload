import React from 'react'
import './styles.css'
import Navbar from '@/components/navbar'
import VideoHero from '@/components/video-hero'
import AsymmetricalVideoGrid from '@/components/asymmetrical-video-grid'
import PageWithLoader from '@/components/page-with-loader'

export default async function HomePage() {
  const videoUrl = "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"

  return (
    <PageWithLoader 
      videoUrl={videoUrl}
      showLoader={true}
    >
      <main className="min-h-screen">
        {/* Fixed Navbar */}
        <Navbar />
        
        {/* Full-width Hero Video */}
        <VideoHero videoUrl={videoUrl} />
        
        {/* Asymmetrical Video Grid with Red Background */}
        <AsymmetricalVideoGrid />
      </main>
    </PageWithLoader>
  )
}
