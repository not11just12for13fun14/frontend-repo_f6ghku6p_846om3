import React from 'react'
import { Link } from 'react-router-dom'

export default function ProductCard({ product }){
  return (
    <Link to={`/product/${product._id || product.id || ''}`} className="card group">
      <div className="aspect-square overflow-hidden">
        <img src={product.image} alt={product.title} className="w-full h-full object-cover group-hover:scale-105 transition"/>
      </div>
      <div className="p-4">
        <div className="font-semibold text-graybrand mb-1">{product.title}</div>
        <div className="text-primary font-bold">₹{product.price}</div>
      </div>
    </Link>
  )
}
