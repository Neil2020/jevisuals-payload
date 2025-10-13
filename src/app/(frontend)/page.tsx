import { headers as getHeaders } from 'next/headers.js'
import Image from 'next/image'
import { getPayload } from 'payload'
import React from 'react'
import { fileURLToPath } from 'url'
import config from '@/payload.config'
import './styles.css'
import PageWithLoader from '@/components/page-with-loader'


export default async function HomePage() {
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { user } = await payload.auth({ headers })

  const fileURL = `vscode://file/${fileURLToPath(import.meta.url)}`

  // Function to generate home content props
  const getHomeContentProps = () => {
    return {
      user,
      payloadConfig,
      fileURL,
      logoSrc: "https://raw.githubusercontent.com/payloadcms/payload/main/packages/ui/src/assets/payload-favicon.svg"
    }
  }

  // Function to render home content
  const HomeContent = ({ user, payloadConfig, fileURL, logoSrc }: {
    user: any
    payloadConfig: any
    fileURL: string
    logoSrc: string
  }) => (
    <div className="flex flex-col justify-between items-center h-screen p-12 max-w-4xl mx-auto overflow-hidden sm:p-6">
      <div className="flex flex-col items-center justify-center flex-grow">
        <picture className="mb-6">
          <source srcSet={logoSrc} />
          <Image
            alt="Payload Logo"
            height={65}
            src={logoSrc}
            width={65}
            className="max-w-full h-auto block"
          />
        </picture>
        {!user && (
          <h1 className="text-center my-10 text-6xl leading-tight font-bold lg:my-6 lg:text-5xl lg:leading-tight md:text-4xl md:leading-10 sm:text-3xl sm:leading-8">
            JEVISUALS
          </h1>
        )}
        {user && (
          <h1 className="text-center my-10 text-6xl leading-tight font-bold lg:my-6 lg:text-5xl lg:leading-tight md:text-4xl md:leading-10 sm:text-3xl sm:leading-8">
            Welcome back, {user.email}
          </h1>
        )}
        <div className="flex items-center gap-3">
          <a
            className="py-1 px-2 rounded text-black bg-white border border-black hover:opacity-80 focus:opacity-80 focus:outline-none active:opacity-70"
            style={{ textDecoration: 'none' }}
            href={payloadConfig.routes.admin}
            rel="noopener noreferrer"
            target="_blank"
          >
            Go to admin panel
          </a>
          <a
            className="py-1 px-2 rounded text-white bg-black border border-white hover:opacity-80 focus:opacity-80 focus:outline-none active:opacity-70"
            style={{ textDecoration: 'none' }}
            href="https://payloadcms.com/docs"
            rel="noopener noreferrer"
            target="_blank"
          >
            Documentation
          </a>
        </div>
      </div>
      <div className="flex items-center gap-2 lg:flex-col lg:gap-1.5">
        <p className="m-0 my-6 lg:my-3">Update this page by editing</p>
        <a className="px-2 bg-gray-600 rounded hover:opacity-80 focus:opacity-80 focus:outline-none active:opacity-70" style={{ textDecoration: 'none' }} href={fileURL}>
          <code className="font-mono">app/(frontend)/page.tsx</code>
        </a>
      </div>
    </div>
  )

  const homeProps = getHomeContentProps()

  return (
    <PageWithLoader 
      videoUrl="https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
    >
      <HomeContent {...homeProps} />
    </PageWithLoader>
  )
}
