import React, { useEffect, useMemo, useState } from 'react'
import Layout from '../components/Layout'
import ProductCard from '../components/ProductCard'
import { listProducts } from '../lib/api'

export default function Shop(){
  const [products, setProducts] = useState([])
  const [filters, setFilters] = useState({ category:'', min_price:'', max_price:'', rating:0, sort:'pop-desc' })

  useEffect(() => { (async()=>{ setProducts(await listProducts({})) })() }, [])

  const filtered = useMemo(() => {
    let arr = [...products]
    if(filters.category) arr = arr.filter(p=>p.category===filters.category)
    if(filters.min_price) arr = arr.filter(p=>p.price >= Number(filters.min_price))
    if(filters.max_price) arr = arr.filter(p=>p.price <= Number(filters.max_price))
    if(filters.rating) arr = arr.filter(p=>p.rating >= Number(filters.rating))
    if(filters.sort==='pop-desc') arr.sort((a,b)=> (b.popularity||0)-(a.popularity||0))
    if(filters.sort==='price-asc') arr.sort((a,b)=> a.price-b.price)
    if(filters.sort==='price-desc') arr.sort((a,b)=> b.price-a.price)
    if(filters.sort==='rating-desc') arr.sort((a,b)=> b.rating-a.rating)
    return arr
  }, [products, filters])

  return (
    <Layout>
      <section className="section pt-10">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-extrabold text-graybrand">Shop</h1>
        </div>
        <div className="mt-6 grid lg:grid-cols-4 gap-8">
          <aside className="card p-4 h-fit lg:sticky lg:top-24">
            <div className="font-semibold mb-3">Filters</div>
            <div className="space-y-3 text-sm">
              <div>
                <label className="text-gray-500">Category</label>
                <select className="w-full mt-1 border rounded-xl px-3 py-2" value={filters.category} onChange={e=>setFilters({...filters, category:e.target.value})}>
                  <option value="">All</option>
                  <option>Dogs</option>
                  <option>Cats</option>
                  <option>Birds</option>
                  <option>Accessories</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-gray-500">Min Price</label>
                  <input type="number" className="w-full mt-1 border rounded-xl px-3 py-2" value={filters.min_price} onChange={e=>setFilters({...filters, min_price:e.target.value})}/>
                </div>
                <div>
                  <label className="text-gray-500">Max Price</label>
                  <input type="number" className="w-full mt-1 border rounded-xl px-3 py-2" value={filters.max_price} onChange={e=>setFilters({...filters, max_price:e.target.value})}/>
                </div>
              </div>
              <div>
                <label className="text-gray-500">Minimum Rating</label>
                <input type="range" min="0" max="5" step="0.5" value={filters.rating} onChange={e=>setFilters({...filters, rating:e.target.value})} className="w-full"/>
                <div className="text-xs text-gray-500">{filters.rating}★ & up</div>
              </div>
              <div>
                <label className="text-gray-500">Sort By</label>
                <select className="w-full mt-1 border rounded-xl px-3 py-2" value={filters.sort} onChange={e=>setFilters({...filters, sort:e.target.value})}>
                  <option value="pop-desc">Popularity</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating-desc">Rating</option>
                </select>
              </div>
            </div>
          </aside>
          <div className="lg:col-span-3 grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {filtered.map(p => <ProductCard key={p._id} product={p} />)}
          </div>
        </div>
      </section>
    </Layout>
  )
}
