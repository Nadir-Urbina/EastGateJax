import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export const metadata = {
  title: "About Us - East Gate Jax",
  description: "Learn about our mission and vision at East Gate Jax"
};

export default function AboutUsPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative h-[400px] overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/newEGHeroimg-GJFwdnDP12Ycw5eU1ZnyDkZmTcGrKZ.png"
              alt="Church Community"
              width={1920}
              height={1080}
              className="object-cover w-full h-full"
              priority
            />
            <div className="absolute inset-0 bg-black/60" />
          </div>
          <div className="container relative z-10 flex h-full items-center px-4">
            <div className="max-w-3xl">
              <h1 className="mb-4 text-4xl font-bold text-white sm:text-5xl">About Us</h1>
              <p className="text-xl text-gray-200">
                A missional community living upon the basis of the eternal covenant of Jesus Christ
              </p>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-16">
          <div className="container px-4 mx-auto">
            <div className="grid gap-12 md:grid-cols-2">
              <div>
                <h2 className="mb-6 text-3xl font-bold">Our Mission</h2>
                <p className="mb-4 text-lg text-gray-700">
                  At East Gate Jax, we are committed to building a community of believers who are 
                  passionate about God's kingdom and dedicated to serving others through Christ's love.
                </p>
                <p className="mb-4 text-lg text-gray-700">
                  We believe in equipping and empowering each member to fulfill their God-given purpose, as we
                  collectively fulfill Christ's mission to reach our community and the nations with the Gospel.
                </p>
              </div>
              <div>
                <h2 className="mb-6 text-3xl font-bold">Our Vision</h2>
                <p className="mb-4 text-lg text-gray-700">
                  To be a thriving, diverse community of believers who embody the love and power of Jesus Christ in all
                  aspects of life. We envision a church that impacts generations through authentic worship, discipleship,
                  and mission.
                </p>
                <p className="mb-4 text-lg text-gray-700">
                  We aim to establish a presence in our community that reflects God's kingdom values and extends His influence
                  through acts of service, compassion, and bold proclamation of His truth.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Join Us CTA */}
        <section className="py-16 bg-gray-100 text-black">
          <div className="container px-4 mx-auto text-center">
            <h2 className="mb-6 text-3xl font-bold">Join Us This Sunday</h2>
            <p className="mb-8 text-lg max-w-2xl mx-auto">
              We'd love for you to experience East Gate Jax. Our services are designed to help you 
              connect with God and our community in meaningful ways.
            </p>
            <div className="max-w-lg mx-auto mb-8 p-6 bg-white rounded-lg shadow-sm border border-gray-200">
              <h3 className="mb-4 text-xl font-semibold">Sunday Service</h3>
              <p className="mb-2">10:00 AM</p>
              <p className="mb-4">605 Wells Rd, Orange Park, FL, 32073</p>
              <p>Children's ministry available for all ages</p>
            </div>
            <Link href="https://maps.app.goo.gl/cJdipcmxCFJN1MPb6" className="inline-block px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition-colors">
              Get Directions
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
} 