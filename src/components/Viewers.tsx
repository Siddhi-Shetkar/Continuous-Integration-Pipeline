import React, { useState } from 'react'
import type { GameItem } from '../types'
import { Play, Pause, ZoomIn } from 'lucide-react'
import { motion } from 'framer-motion'

interface ViewerProps {
  item: GameItem
}

export const ItemViewer: React.FC<ViewerProps> = ({ item }) => {
  switch (item.type) {
    case 'image':
      return <ImageViewer src={item.content} />
    case 'text':
      return <TextViewer text={item.content} />
    case 'code':
      return <CodeViewer code={item.content} />
    case 'voice':
      return <VoiceViewer url={item.content} />
    case 'artwork':
      return <ArtworkViewer src={item.content} />
    default:
      return <div>Unknown content type</div>
  }
}

const ImageViewer = ({ src }: { src: string }) => {
  return (
    <div className="relative group overflow-hidden rounded-xl bg-black/5 flex items-center justify-center min-h-[300px]">
      <img
        src={src}
        alt="Guess the source"
        className="object-cover max-h-[500px] w-full h-full transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute top-2 right-2 p-2 bg-black/50 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
        <ZoomIn size={20} />
      </div>
    </div>
  )
}

const ArtworkViewer = ({ src }: { src: string }) => {
  return (
    <div className="relative group overflow-hidden rounded-xl bg-black/5 flex items-center justify-center min-h-[400px] p-4 border-8 border-white dark:border-gray-800 shadow-2xl">
      <img
        src={src}
        alt="Artwork"
        className="object-contain max-h-[500px] w-full transition-transform duration-700 group-hover:scale-110"
      />
    </div>
  )
}

const TextViewer = ({ text }: { text: string }) => {
  return (
    <div className="p-8 rounded-xl bg-white dark:bg-gray-800 shadow-inner border border-gray-100 dark:border-gray-700 min-h-[300px] flex items-center">
      <p className="text-xl md:text-2xl font-medium leading-relaxed text-gray-800 dark:text-gray-200 text-center font-serif">
        "{text}"
      </p>
    </div>
  )
}

const CodeViewer = ({ code }: { code: string }) => {
  const lines = code.split('\n')
  return (
    <div className="rounded-xl overflow-hidden bg-[#1e1e1e] shadow-xl text-left font-mono text-sm sm:text-base border border-gray-800">
      <div className="bg-[#2d2d2d] px-4 py-2 flex gap-2 items-center">
        <div className="w-3 h-3 rounded-full bg-red-500"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
        <div className="w-3 h-3 rounded-full bg-green-500"></div>
        <span className="text-gray-400 text-xs ml-2">snippet.js</span>
      </div>
      <div className="p-4 overflow-x-auto">
        {lines.map((line, i) => (
          <div key={i} className="flex">
            <span className="text-gray-500 w-8 select-none text-right mr-4">
              {i + 1}
            </span>
            <span className="text-gray-300 whitespace-pre">{line}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

const VoiceViewer = ({ url: _url }: { url: string }) => {
  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <div className="p-8 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-xl flex flex-col items-center justify-center min-h-[300px] text-white">
      <div className="mb-8 relative">
        <div className="absolute inset-0 bg-white/20 rounded-full animate-ping"></div>
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="relative z-10 w-24 h-24 bg-white text-indigo-600 rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-transform"
        >
          {isPlaying ? (
            <Pause size={40} />
          ) : (
            <Play size={40} className="ml-2" />
          )}
        </button>
      </div>

      {/* Fake waveform */}
      <div className="flex items-center gap-1 h-12 w-full max-w-md">
        {Array.from({ length: 40 }).map((_, i) => (
          <motion.div
            key={i}
            className="flex-1 bg-white/80 rounded-full"
            animate={{
              height: isPlaying ? ['20%', '100%', '40%', '80%', '20%'] : '10%',
            }}
            transition={{
              repeat: Infinity,
              duration: 0.5 + (i % 10) * 0.05,
              ease: 'linear',
            }}
          />
        ))}
      </div>
      <p className="mt-4 font-medium opacity-80">
        Click to listen to the sample
      </p>
    </div>
  )
}
