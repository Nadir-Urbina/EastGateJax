import * as React from "react"

import { cn } from "@/lib/utils"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon"
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? "a" : "button"
    return (
      <Comp
        className={cn(
          "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background",
          variant == "default" && "bg-primary text-primary-foreground hover:bg-primary/90",
          variant == "destructive" && "bg-destructive text-destructive-foreground hover:bg-destructive/90",
          variant == "outline" && "bg-transparent border border-input hover:bg-accent hover:text-accent-foreground",
          variant == "secondary" && "bg-secondary text-secondary-foreground hover:bg-secondary/80",
          variant == "ghost" && "bg-transparent hover:bg-accent hover:text-accent-foreground",
          variant == "link" && "underline-offset-4 hover:underline",
          size == "default" && "h-10 py-2 px-4",
          size == "sm" && "h-9 px-3 rounded-md",
          size == "lg" && "h-11 px-8 rounded-md",
          size == "icon" && "h-10 w-10",
          className,
        )}
        ref={ref}
        {...props}
      />
    )
  },
)
Button.displayName = "Button"

export { Button }

