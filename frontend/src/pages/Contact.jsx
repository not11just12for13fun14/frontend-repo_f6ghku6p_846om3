import React from 'react'
import Layout from '../components/Layout'
import { Mail, Phone, MapPin, Instagram, Facebook, Twitter } from 'lucide-react'

export default function Contact(){
  return (
    <Layout>
      <section className="section pt-10">
        <h1 className="text-3xl font-extrabold text-graybrand">Contact Us</h1>
        <div className="mt-6 grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 card p-6">
            <form className="grid sm:grid-cols-2 gap-4">
              <input placeholder="Name" className="border rounded-xl px-3 py-2"/>
              <input placeholder="Email" className="border rounded-xl px-3 py-2"/>
              <input placeholder="Phone" className="border rounded-xl px-3 py-2"/>
              <input placeholder="Subject" className="border rounded-xl px-3 py-2"/>
              <textarea placeholder="Message" className="sm:col-span-2 border rounded-xl px-3 py-2 min-h-[120px]"></textarea>
              <button className="btn-primary w-fit">Send Message</button>
            </form>
          </div>
          <aside className="space-y-4">
            <div className="card p-4">
              <div className="flex items-center gap-2"><Mail className="text-primary"/> support@petboutique.com</div>
              <div className="flex items-center gap-2 mt-2"><Phone className="text-primary"/> +91 80012 34567</div>
              <div className="flex items-center gap-2 mt-2"><MapPin className="text-primary"/> Mumbai, India</div>
            </div>
            <div className="card p-4">
              <div className="font-semibold mb-2">FAQs</div>
              <ul className="list-disc pl-5 text-gray-600 space-y-1 text-sm">
                <li>Shipping & delivery timelines</li>
                <li>Returns & refunds</li>
                <li>Payment methods we accept</li>
              </ul>
            </div>
            <div className="card p-4">
              <div className="font-semibold mb-2">Follow us</div>
              <div className="flex gap-3">
                {[Instagram, Facebook, Twitter].map((Icon, i)=> (
                  <a key={i} href="#" className="p-2 rounded-full bg-gray-100 hover:bg-primary hover:text-white transition"><Icon size={18}/></a>
                ))}
              </div>
            </div>
            <div className="card p-4 h-40 grid place-items-center text-gray-500">Map Placeholder</div>
          </aside>
        </div>
      </section>
    </Layout>
  )
}
