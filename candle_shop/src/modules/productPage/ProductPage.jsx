import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'


export default function ProductPage() {
    const { id } = useParams()
    const [p, setP] = useState(null)
    useEffect(() => { axios.get(import.meta.env.VITE_API_URL + '/products/' + id).then(r => setP(r.data)).catch(() => { }) }, [id])
    if (!p) return <div>Loading...</div>
    const img = p.images && p.images[0] ? import.meta.env.VITE_API_URL + '/uploads/' + p.images[0] : '/placeholder.jpg'
    const addToCart = () => {
        const cart = JSON.parse(localStorage.getItem('cart') || '[]')
        cart.push({ productId: p._id, title: p.title, qty: 1, price: p.price || 0 })
        localStorage.setItem('cart', JSON.stringify(cart))
        alert('Добавено в количката')
    }
    return (
        <div className="max-w-3xl mx-auto">
            <img src={img} alt={p.title} className="w-full h-80 object-cover rounded" />
            <h2 className="text-2xl font-bold mt-4">{p.title}</h2>
            <p className="mt-2 text-gray-700">{p.description}</p>
            <div className="mt-4">
                <button onClick={addToCart} className="button bg-pink-300">Добави в количката</button>
            </div>
        </div>
    )
}