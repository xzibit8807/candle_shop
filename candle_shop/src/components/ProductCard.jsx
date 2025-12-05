import { Link } from 'react-router-dom';
export default function ProductCard({ product }) {
    const img = product.images && product.images[0] ? import.meta.env.VITE_API_URL + '/uploads/' + product.images[0] : '/placeholder.jpg';
    return (
        <div className="shadow rounded-lg overflow-hidden bg-white">
            <Link to={`/product/${product._id}`}>
                <img src={img} alt={product.title} className="w-full h-48 object-cover" />
            </Link>
            <div className="p-3">
                <h3 className="font-semibold">{product.title}</h3>
                <p className="text-sm text-gray-600">{product.description?.slice(0, 80)}...</p>
            </div>
        </div>
    );
}