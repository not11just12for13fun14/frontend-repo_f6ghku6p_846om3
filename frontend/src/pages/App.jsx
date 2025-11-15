import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import { Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { listProducts, seed } from '../lib/api'

const partners = ['PetBuddy', 'PawPlanet', 'FurryCo', 'BirdNest Supplies']
const categories = [
  { name: 'Dogs', img: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b' },
  { name: 'Cats', img: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131' },
  { name: 'Birds', img: 'https://images.unsplash.com/photo-1498534928137-473e2843ebd7' },
  { name: 'Accessories', img: 'https://images.unsplash.com/photo-1583336663277-620dc1996580' },
]

export default function App(){
  const [featured, setFeatured] = useState([])
  const [bestsellers, setBestsellers] = useState([])

  useEffect(() => {
    (async () => {
      try { await seed() } catch(e) {}
      const all = await listProducts({})
      setFeatured(all.slice(0,4))
      setBestsellers(all.slice(4,8))
    })()
  }, [])

  return (
    <Layout>
      <section className="section pt-10">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div>
            <div className="inline-flex items-center gap-2 badge mb-4">Trusted by pet parents</div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-graybrand leading-tight">Everything Your Pet Loves — Delivered to Your Door</h1>
            <p className="mt-4 text-gray-600">A warm, friendly, high-quality pet store with premium essentials for dogs, cats, and birds. Soft textures, safe materials, and lots of love.</p>
            <div className="mt-6 flex gap-3">
              <Link to="/shop" className="btn-primary">Shop Now</Link>
              <a href="#categories" className="btn-secondary">Explore Categories</a>
            </div>
            <div className="mt-8 flex gap-6 items-center text-gray-500">
              {partners.map(p => (<div key={p} className="opacity-80 hover:opacity-100 transition">{p}</div>))}
            </div>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-soft">
            <img src="https://images.unsplash.com/photo-1543852786-1cf6624b9987" alt="Pets" className="w-full h-full object-cover"/>
          </div>
        </div>
      </section>

      <section className="section mt-16" id="categories">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-graybrand">Shop by Category</h2>
          <Link to="/shop" className="text-primary">View all</Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map(c => (
            <Link key={c.name} to={`/shop?category=${c.name}`} className="card group">
              <div className="aspect-video overflow-hidden"><img src={c.img} className="w-full h-full object-cover group-hover:scale-105 transition"/></div>
              <div className="p-4 flex items-center justify-between">
                <div className="font-semibold">{c.name}</div>
                <span className="text-primary">→</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="section mt-16">
        <h2 className="text-2xl font-bold text-graybrand mb-6">Featured Products</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map(p => <ProductCard key={p._id} product={p} />)}
        </div>
      </section>

      <section className="section mt-16">
        <h2 className="text-2xl font-bold text-graybrand mb-6">Bestsellers</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestsellers.map(p => <ProductCard key={p._id} product={p} />)}
        </div>
      </section>

      <section className="section mt-16">
        <h2 className="text-2xl font-bold text-graybrand mb-6">What Customers Say</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[1,2,3].map(i => (
            <div key={i} className="card p-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 grid place-items-center text-primary font-bold">{i}</div>
                <div className="font-semibold">Happy Pet Parent</div>
              </div>
              <p className="mt-3 text-gray-600">Loved the quality and quick delivery! My pets are over the moon.</p>
            </div>
          ))}
        </div>
      </section>

    </Layout>
  )
}
