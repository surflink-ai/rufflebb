import React from 'react'

export default function AboutPage() {
  return (
    <div className="pt-20">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center mb-8">About Ruffle</h1>
        
        <div className="max-w-3xl mx-auto space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
            <p className="text-gray-600 leading-relaxed">
              Ruffle was created with a simple yet powerful mission: to make fundraising for animal welfare both fun and effective. 
              By combining the excitement of raffles with the cause of animal welfare, we've created a platform where everyone wins 
              – participants have the chance to win amazing prizes while helping animals in need.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Ocean Acres Animal Shelter</h2>
            <p className="text-gray-600 leading-relaxed">
              All proceeds from our raffles go directly to Ocean Acres Animal Shelter, a dedicated facility committed to rescuing, 
              rehabilitating, and rehoming animals in need. The shelter provides essential services including medical care, 
              shelter, and love to hundreds of animals each year.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">How Your Support Helps</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-primary-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-2">Medical Care</h3>
                <p className="text-gray-600">
                  Your raffle tickets help fund veterinary care, medications, and surgical procedures for animals in need.
                </p>
              </div>
              <div className="bg-primary-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-2">Food & Shelter</h3>
                <p className="text-gray-600">
                  Contributions provide nutritious food, comfortable bedding, and safe shelter for rescued animals.
                </p>
              </div>
              <div className="bg-primary-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-2">Rehabilitation</h3>
                <p className="text-gray-600">
                  Support helps fund behavioral training and rehabilitation programs for traumatized animals.
                </p>
              </div>
              <div className="bg-primary-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-2">Adoption Programs</h3>
                <p className="text-gray-600">
                  Your participation helps fund adoption events and programs to find forever homes for shelter animals.
                </p>
              </div>
            </div>
          </section>

          <section className="bg-primary-500 text-white p-8 rounded-xl">
            <h2 className="text-2xl font-semibold mb-4">Our Impact</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">500+</div>
                <div className="text-primary-50">Animals Helped</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">$50K+</div>
                <div className="text-primary-50">Funds Raised</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">1000+</div>
                <div className="text-primary-50">Happy Winners</div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Transparency</h2>
            <p className="text-gray-600 leading-relaxed">
              We believe in complete transparency. Regular updates are provided on how funds are used, and detailed reports 
              are available showing the impact of your contributions. Every ticket purchased makes a real difference in the 
              lives of animals at Ocean Acres Animal Shelter.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
