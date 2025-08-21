"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Menu } from "lucide-react"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      className={`sticky top-0 z-50 border-b border-gray-800 bg-[#20232a] backdrop-blur-sm transition-all ${
        isScrolled ? "shadow-md" : ""
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 15 }}
    >
      <div className="container flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/EGLogo-2gbFj8SUeZPgeVRsKFGNfKV2bC2iga.png"
            alt="East Gate Logo"
            width={40}
            height={40}
            className="h-10 w-10 object-contain"
          />
          <span className="hidden text-xl font-semibold text-gray-300 sm:inline-block">East Gate</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 md:flex">
          <Link href="/about-us" className="text-sm font-medium text-gray-300 hover:text-primary">
            About
          </Link>
          <Link href="/#ministries" className="text-sm font-medium text-gray-300 hover:text-primary">
            Ministries
          </Link>
          <Link href="/events" className="text-sm font-medium text-gray-300 hover:text-primary">
            Events
          </Link>
          <Link href="/blog" className="text-sm font-medium text-gray-300 hover:text-primary">
            Blog
          </Link>
          <Link href="https://give.tithe.ly/?formId=fc03799a-0541-44e4-91a9-d53c7f5fd9d3" target="_blank" rel="noopener noreferrer" className="inline-flex h-10 items-center justify-center rounded-md bg-amber-400 px-4 text-sm font-medium text-gray-900 transition-colors hover:bg-amber-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
            Donate
          </Link>
        </nav>

        {/* Mobile Navigation */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden text-gray-300 border-gray-700">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <div className="grid gap-4 py-4">
              <Link href="/about-us" className="text-sm font-medium hover:text-primary">
                About
              </Link>
              <Link href="/#ministries" className="text-sm font-medium hover:text-primary">
                Ministries
              </Link>
              <Link href="/events" className="text-sm font-medium hover:text-primary">
                Events
              </Link>
              <Link href="/blog" className="text-sm font-medium hover:text-primary">
                Blog
              </Link>
              <Link href="https://give.tithe.ly/?formId=fc03799a-0541-44e4-91a9-d53c7f5fd9d3" target="_blank" rel="noopener noreferrer" className="inline-flex h-10 w-full items-center justify-center rounded-md bg-amber-400 px-4 text-sm font-medium text-gray-900 transition-colors hover:bg-amber-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                Donate
              </Link>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </motion.header>
  );
} 