import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import { useParams, Link } from 'react-router-dom'
import { addReview, getProduct } from '../lib/api'

export default function Product(){
  const { id } = useParams()
  const [data, setData] = useState(null)
  const [qty, setQty] = useState(1)
  const [review, setReview] = useState({ name:'', rating:5, comment:'' })

  useEffect(() => { (async()=>{ setData(await getProduct(id)) })() }, [id])

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart')||'[]')
    const exists = cart.find(i=>i.product_id===id)
    if(exists) exists.quantity += qty
    else cart.push({ product_id:id, quantity:qty, title:data.product.title, price:data.product.price, image:data.product.image })
    localStorage.setItem('cart', JSON.stringify(cart))
    alert('Added to cart!')
  }

  const submitReview = async (e) => {
    e.preventDefault()
    await addReview({ ...review, product_id: id })
    alert('Thank you for your review!')
    setReview({ name:'', rating:5, comment:'' })
  }

  if(!data) return <Layout><div className="section py-20">Loading...</div></Layout>
  const p = data.product

  return (
    <Layout>
      <section className="section pt-10 grid lg:grid-cols-2 gap-10">
        <div className="card">
          <img src={p.image} alt={p.title} className="w-full object-cover"/>
        </div>
        <div>
          <h1 className="text-3xl font-extrabold text-graybrand">{p.title}</h1>
          <div className="mt-2 text-primary text-2xl font-bold">₹{p.price}</div>
          <div className="mt-3 text-gray-600">Rating: {p.rating}★ • Category: {p.category}</div>
          <ul className="mt-4 space-y-2 text-gray-700 list-disc pl-5">
            {(p.features||[]).map((f,i)=>(<li key={i}>{f}</li>))}
          </ul>
          <div className="mt-6 flex items-center gap-3">
            <label>Qty</label>
            <input type="number" min="1" value={qty} onChange={e=>setQty(Number(e.target.value))} className="w-20 border rounded-xl px-3 py-2"/>
            <button className="btn-primary" onClick={addToCart}>Add to Cart</button>
          </div>
          <div className="mt-6 text-sm text-gray-600 space-y-1">
            <div>Shipping: Free on orders over ₹499</div>
            <div>Returns: 7-day easy returns</div>
            <div>Secure Payments: 128-bit SSL</div>
          </div>
        </div>
      </section>

      <section className="section mt-16 grid lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2">
          <h2 className="text-xl font-bold text-graybrand mb-4">Customer Reviews</h2>
          <div className="space-y-4">
            {(data.reviews||[]).map((r,i)=>(
              <div key={i} className="card p-4">
                <div className="font-semibold">{r.name} • {r.rating}★</div>
                <p className="text-gray-600">{r.comment}</p>
              </div>
            ))}
          </div>
          <form onSubmit={submitReview} className="card p-4 mt-6 space-y-3">
            <div className="font-semibold">Write a Review</div>
            <input required placeholder="Your name" className="border rounded-xl px-3 py-2 w-full" value={review.name} onChange={e=>setReview({...review, name:e.target.value})}/>
            <select className="border rounded-xl px-3 py-2 w-full" value={review.rating} onChange={e=>setReview({...review, rating:Number(e.target.value)})}>
              {[5,4,3,2,1].map(v=> <option key={v} value={v}>{v} Stars</option>)}
            </select>
            <textarea required placeholder="Your review" className="border rounded-xl px-3 py-2 w-full" value={review.comment} onChange={e=>setReview({...review, comment:e.target.value})}/>
            <button className="btn-primary w-fit">Submit Review</button>
          </form>
        </div>
        <div>
          <h2 className="text-xl font-bold text-graybrand mb-4">Recommended</h2>
          <div className="grid gap-4">
            {(data.recommended||[]).map(r => (
              <Link to={`/product/${r._id}`} key={r._id} className="card p-3 flex items-center gap-3">
                <img src={r.image} className="w-20 h-20 rounded-xl object-cover"/>
                <div>
                  <div className="font-semibold">{r.title}</div>
                  <div className="text-primary font-bold">₹{r.price}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  )
}
