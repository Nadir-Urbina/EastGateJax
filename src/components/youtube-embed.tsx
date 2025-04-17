import type React from "react"

interface YoutubeEmbedProps {
  videoId: string
  title: string
}

export const YoutubeEmbed: React.FC<YoutubeEmbedProps> = ({ videoId, title }) => {
  return (
    <div className="aspect-w-16 aspect-h-9">
      <iframe
        src={`https://www.youtube.com/embed/${videoId}`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title={title}
        className="h-full w-full"
      />
    </div>
  )
}

