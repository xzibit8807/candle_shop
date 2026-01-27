
import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
    return (
        <div className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-xl transition duration-300">
            <div className="h-56 w-full overflow-hidden">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover hover:scale-110 transition duration-300"
                />
            </div>

            <div className="p-4 space-y-2">
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p className="text-gray-600 truncate">{product.description}</p>

                <div className="flex justify-between items-center pt-2">
                    <p className="font-bold text-pink-600">{product.price} лв</p>

                    <Link
                        to={`/product/${product._id}`}
                        className="px-3 py-1 bg-pink-500 text-white text-sm rounded-lg hover:bg-pink-600 transition"
                    >
                        View
                    </Link>
                </div>
            </div>
        </div>
    );
}
// import { Link } from 'react-router-dom';
// export default function ProductCard({ product }) {
//     const img = product.images && product.images[0] ? import.meta.env.VITE_API_URL + '/uploads/' + product.images[0] : '/placeholder.jpg';
//     return (
//         <div className="shadow rounded-lg overflow-hidden bg-white">
//             <Link to={`/product/${product._id}`}>
//                 <img src={img} alt={product.title} className="w-full h-48 object-cover" />
//             </Link>
//             <div className="p-3">
//                 <h3 className="font-semibold">{product.title}</h3>
//                 <p className="text-sm text-gray-600">{product.description?.slice(0, 80)}...</p>
//             </div>
//         </div>
//     );
// }
