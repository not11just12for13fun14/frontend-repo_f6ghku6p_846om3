import React, { useEffect, useMemo, useState } from 'react'
import Layout from '../components/Layout'
import { checkout } from '../lib/api'

export default function Checkout(){
  const [cart, setCart] = useState([])
  const [discountCode, setDiscountCode] = useState('')
  const [payment, setPayment] = useState({ type:'card', provider:'Visa' })
  const [customer, setCustomer] = useState({ name:'', email:'', phone:'' })

  useEffect(()=>{ setCart(JSON.parse(localStorage.getItem('cart')||'[]')) },[])

  const subtotal = useMemo(()=> cart.reduce((s,i)=> s + (i.price*i.quantity), 0), [cart])
  const discount = useMemo(()=> (['WELCOME10','PETLOVE10'].includes(discountCode.toUpperCase()) ? subtotal*0.10 : 0), [discountCode, subtotal])
  const total = useMemo(()=> Math.max(subtotal - discount, 0), [subtotal, discount])

  const updateQty = (id, q) => {
    setCart(prev => prev.map(i=> i.product_id===id ? {...i, quantity: Math.max(1, q)} : i))
  }

  const complete = async () => {
    const payload = { items: cart.map(i=>({ product_id:i.product_id, quantity:i.quantity })), discount_code: discountCode, payment, customer }
    const res = await checkout(payload)
    alert('Order confirmed! Order ID: '+res.order_id)
    localStorage.removeItem('cart')
    setCart([])
  }

  return (
    <Layout>
      <section className="section pt-10 grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="card p-4">
            <div className="font-semibold mb-3">Cart Summary</div>
            {cart.length===0 && <div className="text-gray-600">Your cart is empty.</div>}
            <div className="space-y-3">
              {cart.map(item => (
                <div key={item.product_id} className="flex items-center gap-3">
                  <img src={item.image} className="w-16 h-16 rounded-xl object-cover"/>
                  <div className="flex-1">
                    <div className="font-semibold">{item.title}</div>
                    <div className="text-primary">₹{item.price}</div>
                  </div>
                  <input type="number" className="w-20 border rounded-xl px-3 py-2" value={item.quantity} onChange={e=>updateQty(item.product_id, Number(e.target.value))}/>
                </div>
              ))}
            </div>
          </div>

          <div className="card p-4">
            <div className="font-semibold mb-3">Payment</div>
            <div className="grid sm:grid-cols-2 gap-3">
              <select className="border rounded-xl px-3 py-2" value={payment.type} onChange={e=>setPayment({...payment, type:e.target.value})}>
                <option value="card">Credit/Debit Card</option>
                <option value="upi">UPI</option>
                <option value="netbanking">Net Banking</option>
                <option value="wallet">Wallets</option>
                <option value="cod">Cash on Delivery</option>
              </select>
              {payment.type==='card' && (
                <input placeholder="Card Last 4" className="border rounded-xl px-3 py-2" value={payment.last4||''} onChange={e=>setPayment({...payment, last4:e.target.value})}/>
              )}
              {payment.type==='upi' && (
                <input placeholder="UPI ID" className="border rounded-xl px-3 py-2" value={payment.upi_id||''} onChange={e=>setPayment({...payment, upi_id:e.target.value})}/>
              )}
              <input placeholder="Provider (Bank/Wallet)" className="border rounded-xl px-3 py-2 sm:col-span-2" value={payment.provider||''} onChange={e=>setPayment({...payment, provider:e.target.value})}/>
            </div>
          </div>

          <div className="card p-4">
            <div className="font-semibold mb-3">Customer Details</div>
            <div className="grid sm:grid-cols-3 gap-3">
              <input placeholder="Name" className="border rounded-xl px-3 py-2" value={customer.name} onChange={e=>setCustomer({...customer, name:e.target.value})}/>
              <input placeholder="Email" className="border rounded-xl px-3 py-2" value={customer.email} onChange={e=>setCustomer({...customer, email:e.target.value})}/>
              <input placeholder="Phone" className="border rounded-xl px-3 py-2" value={customer.phone} onChange={e=>setCustomer({...customer, phone:e.target.value})}/>
            </div>
          </div>
        </div>

        <aside className="space-y-6">
          <div className="card p-4">
            <div className="font-semibold mb-3">Order Total</div>
            <div className="flex items-center justify-between"><span>Subtotal</span><span>₹{subtotal.toFixed(2)}</span></div>
            <div className="flex items-center justify-between mt-1"><span>Discount</span><span className="text-primary">-₹{discount.toFixed(2)}</span></div>
            <div className="flex items-center justify-between mt-2 font-bold text-graybrand text-lg"><span>Total</span><span>₹{total.toFixed(2)}</span></div>
            <input placeholder="Discount code (WELCOME10)" className="border rounded-xl px-3 py-2 w-full mt-3" value={discountCode} onChange={e=>setDiscountCode(e.target.value)}/>
            <div className="mt-3 text-sm text-gray-600">Secure payment • SSL encrypted • Trusted partners</div>
            <button className="btn-primary w-full mt-4" onClick={complete}>Complete Purchase</button>
          </div>
        </aside>
      </section>
    </Layout>
  )
}
