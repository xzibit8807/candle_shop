import { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from '../productCard/ProductCard'


export default function Gallery() {
    const [products, setProducts] = useState([]);
    useEffect(() => { axios.get(import.meta.env.VITE_API_URL + '/products').then(r => setProducts(r.data)); }, []);
    return (
        <div>
            <h1 className="text-3xl font-bold mb-4">Галерия</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {products.map(p => <ProductCard key={p._id} product={p} />)}
            </div>
        </div>
    );
}