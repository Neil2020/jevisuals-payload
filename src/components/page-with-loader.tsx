'use client'
import React from 'react'
import InitialPageLoader from './initial-pageloader'

interface PageWithLoaderProps {
  children: React.ReactNode
  videoUrl?: string // Make optional
  showLoader?: boolean
}

const PageWithLoader: React.FC<PageWithLoaderProps> = ({
  children,
  videoUrl = "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4", // Default video
  showLoader = true,
}) => {
  const [loaderComplete, setLoaderComplete] = React.useState(!showLoader)

  // Debug logging
  React.useEffect(() => {
    console.log('PageWithLoader mounted with:', { videoUrl, showLoader, loaderComplete })
  }, [])

  const handleLoaderComplete = () => {
    setLoaderComplete(true)
  }

  return (
    <div className="relative w-full h-full">
      {/* Main content - always visible */}
      <div className="relative z-10">
        {children}
      </div>

      {/* Video loader overlay - positioned absolutely on top */}
      {showLoader && !loaderComplete && (
        <div className="fixed inset-0 z-[99999] pointer-events-none">
          <InitialPageLoader
            videoUrl={videoUrl}
            duration={8000} // 8 seconds of video playback
            splitDuration={4000} // 4 seconds for split animation
            onComplete={handleLoaderComplete}
          />
        </div>
      )}
    </div>
  )
}

export default PageWithLoader
