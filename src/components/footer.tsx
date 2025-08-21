import Link from "next/link"
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">About Us</h3>
            <p className="mb-4">
            At East Gate, we are committed to building a community of believers who are passionate about God's kingdom and dedicated to serving others through Christ's love.
              message to all.
            </p>
            <div className="flex space-x-4">
              <Link href="https://www.facebook.com/eastgatejax" className="hover:text-primary">
                <Facebook size={20} />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="https://www.youtube.com/@EastGateJax" className="hover:text-primary">
                <Youtube size={20} />
                <span className="sr-only">YouTube</span>
              </Link>
            </div>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about-us" className="hover:text-primary">
                  About
                </Link>
              </li>
              <li>
                <Link href="/#ministries" className="hover:text-primary">
                  Ministries
                </Link>
              </li>
              <li>
                <Link href="/events" className="hover:text-primary">
                  Events
                </Link>
              </li>
              <li>
                <Link href="/sermons" className="hover:text-primary">
                  Sermons
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-primary">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">Service Times</h3>
            <ul className="space-y-2">
              <li>Sunday Service: 10:00 AM</li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">Contact Us</h3>
            <ul className="space-y-2">
              <li>605 Wells Rd</li>
              <li>Orange Park, FL 32073</li>
              <li>Email: admin@eastgatejax.com</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-8 text-center">
          <p>&copy; {new Date().getFullYear()} East Gate Jax. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

