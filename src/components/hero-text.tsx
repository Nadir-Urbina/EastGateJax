"use client"

import { AnimatedText } from "./animated-text"

export function HeroText() {
  return (
    <h1 className="text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
      <AnimatedText text="Learn from the top Azure experts!" highlightWord="Azure" typingSpeed={50} delayStart={500} />
    </h1>
  )
}

