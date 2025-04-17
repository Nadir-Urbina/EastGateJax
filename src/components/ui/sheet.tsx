import * as React from "react"

import { cn } from "@/lib/utils"
import * as DialogPrimitive from "@radix-ui/react-dialog"

const Sheet = ({ className, children, ...props }: React.ComponentProps<typeof DialogPrimitive.Root>) => {
  return (
    <DialogPrimitive.Root {...props} className={cn(className)}>
      {children}
    </DialogPrimitive.Root>
  )
}
Sheet.displayName = DialogPrimitive.Root.displayName

const SheetTrigger = ({ className, children, ...props }: React.ComponentProps<typeof DialogPrimitive.Trigger>) => {
  return (
    <DialogPrimitive.Trigger asChild {...props} className={cn(className)}>
      {children}
    </DialogPrimitive.Trigger>
  )
}
SheetTrigger.displayName = DialogPrimitive.Trigger.displayName

const SheetContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPrimitive.Portal>
    <DialogPrimitive.Overlay
      className={cn(
        "fixed inset-0 z-50 bg-background/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      )}
    />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed z-50 gap-4 bg-background p-6 shadow-lg rounded-lg border border-border top-0 right-0 h-screen w-3/4 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right-0 data-[state=open]:slide-in-from-right-0",
        className,
      )}
      {...props}
    >
      {children}
      <DialogPrimitive.Close className="absolute top-4 right-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary"></DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPrimitive.Portal>
))
SheetContent.displayName = DialogPrimitive.Content.displayName

export { Sheet, SheetTrigger, SheetContent }

