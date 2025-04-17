import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export const metadata = {
  title: "About Us - East Gate Kingdom Fellowship",
  description: "Learn about our mission, vision, leadership team, and history at East Gate Kingdom Fellowship"
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
                  At East Gate Kingdom Fellowship, we are committed to building a community of believers who are 
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

        {/* Core Values */}
        <section className="py-16 bg-gray-100">
          <div className="container px-4 mx-auto">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="mb-6 text-3xl font-bold">Our Core Values</h2>
              <p className="text-lg text-gray-700">
                These principles guide our actions and decisions as we pursue our mission and vision.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <h3 className="mb-4 text-xl font-semibold">Biblical Truth</h3>
                <p className="text-gray-700">
                  We hold to the authority and sufficiency of God's Word as our foundation for life and ministry.
                </p>
              </div>
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <h3 className="mb-4 text-xl font-semibold">Authentic Worship</h3>
                <p className="text-gray-700">
                  We cultivate a lifestyle of heartfelt devotion to God, both corporately and individually.
                </p>
              </div>
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <h3 className="mb-4 text-xl font-semibold">Intentional Discipleship</h3>
                <p className="text-gray-700">
                  We commit to growing in Christ-likeness and helping others do the same through meaningful relationships.
                </p>
              </div>
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <h3 className="mb-4 text-xl font-semibold">Missional Living</h3>
                <p className="text-gray-700">
                  We embrace our calling to share Christ's love in word and deed, locally and globally.
                </p>
              </div>
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <h3 className="mb-4 text-xl font-semibold">Genuine Community</h3>
                <p className="text-gray-700">
                  We foster an environment of authentic relationships, mutual care, and loving accountability.
                </p>
              </div>
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <h3 className="mb-4 text-xl font-semibold">Spirit-Empowered Ministry</h3>
                <p className="text-gray-700">
                  We depend on the Holy Spirit's power and gifts to fulfill our mission with effectiveness.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Leadership Team */}
        <section className="py-16">
          <div className="container px-4 mx-auto">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="mb-6 text-3xl font-bold">Our Leadership Team</h2>
              <p className="text-lg text-gray-700">
                Meet the dedicated leaders who guide our church with vision, integrity, and compassion.
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              <div className="text-center">
                <div className="mb-4 overflow-hidden rounded-full inline-block">
                  <Image 
                    src="/images/placeholder-leader-1.jpg" 
                    alt="Pastor John Doe"
                    width={200}
                    height={200}
                    className="object-cover w-[200px] h-[200px]"
                  />
                </div>
                <h3 className="mb-1 text-xl font-semibold">Pastor John Doe</h3>
                <p className="mb-4 text-gray-600">Lead Pastor</p>
                <p className="text-gray-700">
                  Pastor John has been leading East Gate since its founding in 2010. His heart for discipleship and 
                  passion for God's Word has shaped our church's culture.
                </p>
              </div>
              <div className="text-center">
                <div className="mb-4 overflow-hidden rounded-full inline-block">
                  <Image 
                    src="/images/placeholder-leader-2.jpg" 
                    alt="Sarah Smith"
                    width={200}
                    height={200}
                    className="object-cover w-[200px] h-[200px]"
                  />
                </div>
                <h3 className="mb-1 text-xl font-semibold">Sarah Smith</h3>
                <p className="mb-4 text-gray-600">Worship Pastor</p>
                <p className="text-gray-700">
                  Sarah leads our worship ministry with creativity and depth, helping our congregation connect with God through music.
                </p>
              </div>
              <div className="text-center">
                <div className="mb-4 overflow-hidden rounded-full inline-block">
                  <Image 
                    src="/images/placeholder-leader-3.jpg" 
                    alt="Michael Johnson"
                    width={200}
                    height={200}
                    className="object-cover w-[200px] h-[200px]"
                  />
                </div>
                <h3 className="mb-1 text-xl font-semibold">Michael Johnson</h3>
                <p className="mb-4 text-gray-600">Missions Director</p>
                <p className="text-gray-700">
                  Michael oversees our local and global missions efforts, mobilizing our church to serve communities in need.
                </p>
              </div>
            </div>
            <div className="mt-12 text-center">
              <Link href="/contact" className="inline-block px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition-colors">
                Contact Our Team
              </Link>
            </div>
          </div>
        </section>

        {/* Our History */}
        <section className="py-16 bg-gray-100">
          <div className="container px-4 mx-auto">
            <div className="max-w-3xl mx-auto">
              <h2 className="mb-6 text-3xl font-bold text-center">Our History</h2>
              <div className="relative pl-8 border-l-2 border-primary">
                <div className="mb-10">
                  <div className="absolute w-4 h-4 bg-primary rounded-full -left-[9px]"></div>
                  <h3 className="text-xl font-semibold mb-2">2010 - Our Beginning</h3>
                  <p className="text-gray-700">
                    East Gate Kingdom Fellowship was founded by a small group of families committed to establishing a 
                    church centered on authentic worship and community impact.
                  </p>
                </div>
                <div className="mb-10">
                  <div className="absolute w-4 h-4 bg-primary rounded-full -left-[9px]"></div>
                  <h3 className="text-xl font-semibold mb-2">2013 - Growth and Expansion</h3>
                  <p className="text-gray-700">
                    As our congregation grew, we moved to a larger facility and launched our first ministry initiatives,
                    including our youth program and community outreach efforts.
                  </p>
                </div>
                <div className="mb-10">
                  <div className="absolute w-4 h-4 bg-primary rounded-full -left-[9px]"></div>
                  <h3 className="text-xl font-semibold mb-2">2016 - Missions Launch</h3>
                  <p className="text-gray-700">
                    We began our international missions program with our first team deployed to Central America,
                    establishing partnerships that continue to this day.
                  </p>
                </div>
                <div className="mb-10">
                  <div className="absolute w-4 h-4 bg-primary rounded-full -left-[9px]"></div>
                  <h3 className="text-xl font-semibold mb-2">2019 - Community Center</h3>
                  <p className="text-gray-700">
                    Opened our community center to serve local families through after-school programs, food distribution,
                    and various support services.
                  </p>
                </div>
                <div>
                  <div className="absolute w-4 h-4 bg-primary rounded-full -left-[9px]"></div>
                  <h3 className="text-xl font-semibold mb-2">Present Day</h3>
                  <p className="text-gray-700">
                    Today, East Gate continues to grow in its impact and influence, with multiple services, thriving ministries,
                    and a renewed vision for the future.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Join Us CTA */}
        <section className="py-16 bg-primary text-white">
          <div className="container px-4 mx-auto text-center">
            <h2 className="mb-6 text-3xl font-bold">Join Us This Sunday</h2>
            <p className="mb-8 text-lg max-w-2xl mx-auto">
              We'd love for you to experience East Gate Kingdom Fellowship. Our services are designed to help you 
              connect with God and our community in meaningful ways.
            </p>
            <div className="max-w-lg mx-auto mb-8 p-6 bg-white/10 rounded-lg">
              <h3 className="mb-4 text-xl font-semibold">Sunday Service</h3>
              <p className="mb-2">10:30 AM</p>
              <p className="mb-4">123 Church Street, City, State 12345</p>
              <p>Children's ministry available for all ages</p>
            </div>
            <Link href="/contact" className="inline-block px-6 py-3 bg-white text-primary font-medium rounded-lg hover:bg-gray-100 transition-colors">
              Get Directions
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
} 