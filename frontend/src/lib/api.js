const BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export async function api(path, opts){
  const res = await fetch(`${BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...opts
  })
  if(!res.ok){
    throw new Error(await res.text())
  }
  return res.json()
}

export const listProducts = (filters={}) => api('/products', { method:'POST', body: JSON.stringify(filters) })
export const getProduct = (id) => api(`/products/${id}`)
export const addReview = (payload) => api('/reviews', { method:'POST', body: JSON.stringify(payload) })
export const checkout = (payload) => api('/checkout', { method:'POST', body: JSON.stringify(payload) })
export const seed = () => api('/seed', { method:'POST' })
