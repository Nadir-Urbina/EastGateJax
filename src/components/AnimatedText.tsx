// Place this file in the components folder
"use client"

import React, { useEffect, useState } from "react"
import { motion, useAnimate } from "framer-motion"

interface AnimatedTextProps {
  text: string
  highlightWord?: string
  className?: string
  highlightClassName?: string
  typingSpeed?: number
  delayStart?: number
}

export function AnimatedText({
  text,
  highlightWord,
  className = "",
  highlightClassName = "text-primary relative",
  typingSpeed = 50,
  delayStart = 0,
}: AnimatedTextProps) {
  const [scope, animate] = useAnimate()
  const [displayedText, setDisplayedText] = useState("")
  const words = text.split(" ")
  const highlightIndex = highlightWord ? words.findIndex((word) => word === highlightWord) : -1

  useEffect(() => {
    let timeout: NodeJS.Timeout

    const startTyping = () => {
      let currentText = ""
      let currentIndex = 0

      const typeNextChar = () => {
        if (currentIndex < text.length) {
          currentText += text[currentIndex]
          setDisplayedText(currentText)
          currentIndex++
          timeout = setTimeout(typeNextChar, typingSpeed)
        } else if (highlightIndex !== -1) {
          // Start highlight animation after typing is complete
          animate(scope.current, { width: "100%" }, { duration: 0.3, ease: "easeOut" })
        }
      }

      timeout = setTimeout(typeNextChar, typingSpeed)
    }

    // Start typing after initial delay
    setTimeout(startTyping, delayStart)

    return () => clearTimeout(timeout)
  }, [text, typingSpeed, delayStart, animate, scope, highlightIndex])

  return (
    <span className={className}>
      {words.map((word, index) => (
        <React.Fragment key={index}>
          {word === highlightWord ? (
            <span className={highlightClassName}>
              {displayedText.includes(word) ? word : ""}
              <motion.span
                ref={scope}
                initial={{ width: 0 }}
                className="absolute bottom-0 left-0 h-[4px] bg-primary/30 rounded-full"
              />
            </span>
          ) : (
            displayedText.substring(text.indexOf(word), text.indexOf(word) + word.length)
          )}
          {index < words.length - 1 && displayedText.includes(word) ? " " : ""}
        </React.Fragment>
      ))}
    </span>
  )
}

