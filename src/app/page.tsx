import Link from 'next/link'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Win Prizes, Help Animals
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join our online raffles to win amazing prizes while supporting Ocean Acres Animal Shelter. Every ticket makes a difference.
          </p>
          <div className="space-x-4">
            <Link 
              href="/raffles" 
              className="bg-primary-500 text-white px-6 py-3 rounded-lg text-lg hover:bg-primary-600 transition"
            >
              View Raffles
            </Link>
            <Link 
              href="/about" 
              className="border-2 border-primary-500 text-primary-500 px-6 py-3 rounded-lg text-lg hover:bg-primary-50 transition"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-primary-500">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Choose a Raffle</h3>
              <p className="text-gray-600">Browse our selection of exciting prizes and pick your favorite raffle.</p>
            </div>
            <div className="text-center">
              <div className="bg-primary-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-primary-500">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Buy Tickets</h3>
              <p className="text-gray-600">Purchase tickets securely online. The more tickets, the better your chances!</p>
            </div>
            <div className="text-center">
              <div className="bg-primary-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-primary-500">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Support Animals</h3>
              <p className="text-gray-600">All proceeds go directly to Ocean Acres Animal Shelter to help animals in need.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-20 bg-primary-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Make a Difference</h2>
            <p className="text-gray-600 mb-12">
              Your participation helps provide essential care, medical treatment, and loving homes for animals in need.
              Together, we can make a real difference in their lives.
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="text-3xl font-bold text-primary-500 mb-2">500+</div>
                <div className="text-gray-600">Animals Helped</div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="text-3xl font-bold text-primary-500 mb-2">$50K+</div>
                <div className="text-gray-600">Funds Raised</div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="text-3xl font-bold text-primary-500 mb-2">1000+</div>
                <div className="text-gray-600">Happy Winners</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Make a Difference?</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Join our community of supporters and get a chance to win amazing prizes while helping animals in need.
          </p>
          <Link 
            href="/raffles" 
            className="bg-primary-500 text-white px-8 py-4 rounded-lg text-lg hover:bg-primary-600 transition inline-block"
          >
            View Current Raffles
          </Link>
        </div>
      </section>
    </div>
  )
}
