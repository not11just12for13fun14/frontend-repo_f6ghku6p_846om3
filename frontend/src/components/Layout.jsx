import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { ShoppingCart, PawPrint, Search, Phone, Menu } from 'lucide-react'

const nav = [
  { to: '/', label: 'Home' },
  { to: '/shop', label: 'Shop' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

export default function Layout({ children }) {
  const [open, setOpen] = React.useState(false)
  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-40 backdrop-blur bg-white/80 border-b border-gray-100">
        <div className="section py-3 flex items-center gap-4">
          <button className="md:hidden" onClick={() => setOpen(!open)}><Menu/></button>
          <Link to="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-primary text-white grid place-items-center shadow-soft"><PawPrint size={20}/></div>
            <div className="font-extrabold text-xl text-graybrand">Pet Boutique</div>
          </Link>
          <nav className="hidden md:flex items-center gap-6 ml-10">
            {nav.map(n => (
              <NavLink key={n.to} to={n.to} className={({isActive}) => `text-gray-600 hover:text-primary ${isActive?'text-primary font-semibold':''}`}>{n.label}</NavLink>
            ))}
          </nav>
          <div className="ml-auto flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl border bg-white shadow-inner">
              <Search size={18} className="text-gray-400"/>
              <input className="outline-none text-sm" placeholder="Search products..."/>
            </div>
            <Link to="/checkout" className="relative"><ShoppingCart/>
              <span className="absolute -top-2 -right-2 badge">Cart</span>
            </Link>
            <a href="tel:+1800123456" className="hidden sm:flex items-center gap-2 text-gray-600 hover:text-primary"><Phone size={18}/> Support</a>
          </div>
        </div>
        {open && (
          <div className="md:hidden p-4 space-y-2 border-t">
            {nav.map(n => (
              <NavLink key={n.to} to={n.to} onClick={()=>setOpen(false)} className={({isActive}) => `block py-2 ${isActive?'text-primary font-semibold':'text-gray-700'}`}>{n.label}</NavLink>
            ))}
          </div>
        )}
      </header>
      <main className="flex-1">{children}</main>
      <footer className="mt-16 border-t bg-gray-50">
        <div className="section py-10 grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-9 h-9 rounded-xl bg-primary text-white grid place-items-center shadow-soft"><PawPrint size={20}/></div>
              <div className="font-extrabold text-xl text-graybrand">Pet Boutique</div>
            </div>
            <p className="text-gray-600">Everything your pet loves — delivered to your door.</p>
          </div>
          <div>
            <div className="font-semibold mb-3">Shop</div>
            <ul className="space-y-2 text-gray-600">
              <li><Link to="/shop">All Products</Link></li>
              <li><Link to="/shop">Dogs</Link></li>
              <li><Link to="/shop">Cats</Link></li>
              <li><Link to="/shop">Birds</Link></li>
            </ul>
          </div>
          <div>
            <div className="font-semibold mb-3">Company</div>
            <ul className="space-y-2 text-gray-600">
              <li><Link to="/about">About</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><a href="#" onClick={e=>e.preventDefault()}>FAQs</a></li>
            </ul>
          </div>
          <div>
            <div className="font-semibold mb-3">Stay in touch</div>
            <div className="flex gap-2">
              <input placeholder="Email address" className="flex-1 px-3 py-2 rounded-xl border"/>
              <button className="btn-primary">Subscribe</button>
            </div>
          </div>
        </div>
        <div className="py-4 text-center text-sm text-gray-500">© 2025 Pet Boutique. All rights reserved.</div>
      </footer>
    </div>
  )
}
