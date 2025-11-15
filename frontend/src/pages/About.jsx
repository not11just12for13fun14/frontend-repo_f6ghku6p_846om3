import React from 'react'
import Layout from '../components/Layout'

export default function About(){
  return (
    <Layout>
      <section className="section pt-10 max-w-3xl">
        <h1 className="text-3xl font-extrabold text-graybrand">About Us</h1>
        <p className="mt-4 text-gray-700">We started Pet Boutique with a simple promise: to make pet care easy, affordable, and joyful for every family. Our curated range focuses on safe materials, thoughtful design, and a warm, premium experience.</p>
        <div className="mt-8 grid sm:grid-cols-2 gap-6">
          <div className="card p-6">
            <div className="font-semibold">Mission</div>
            <p className="text-gray-600 mt-2">To make pet care easy, affordable, and joyful.</p>
          </div>
          <div className="card p-6">
            <div className="font-semibold">Vision</div>
            <p className="text-gray-600 mt-2">A world where every pet enjoys comfort, care, and love every single day.</p>
          </div>
        </div>
        <div className="mt-8 card p-6">
          <div className="font-semibold">Values</div>
          <ul className="text-gray-700 list-disc pl-5 mt-2 space-y-1">
            <li>Care</li>
            <li>Trust</li>
            <li>Love</li>
            <li>Quality</li>
          </ul>
        </div>
        <div className="mt-8 grid sm:grid-cols-3 gap-6">
          <div className="card p-6 text-center">
            <div className="text-3xl font-extrabold text-primary">50,000+</div>
            <div className="text-gray-600">Pets served</div>
          </div>
          <div className="card p-6 text-center">
            <div className="text-3xl font-extrabold text-primary">4.8★</div>
            <div className="text-gray-600">Average rating</div>
          </div>
          <div className="card p-6 text-center">
            <div className="text-3xl font-extrabold text-primary">1M+</div>
            <div className="text-gray-600">Deliveries</div>
          </div>
        </div>
        <div className="mt-8">
          <h2 className="text-xl font-bold text-graybrand mb-3">Meet the Team</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {["Aarav","Meera","Kabir","Zoya"].map(n => (
              <div key={n} className="card p-4 text-center">
                <div className="w-20 h-20 mx-auto rounded-full bg-primary/10"></div>
                <div className="mt-3 font-semibold">{n}</div>
                <div className="text-sm text-gray-600">Pet Care Specialist</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  )
}
