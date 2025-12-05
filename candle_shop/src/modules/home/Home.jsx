import { Link } from 'react-router-dom'


export default function Home() {
    return (
        <div className="text-center py-12">
            <h1 className="text-4xl font-bold mb-4">Sweet Candles</h1>
            <p className="mb-6">Ръчно направени ароматни свещи — перфектен подарък и уют у дома.</p>
            <Link to="/gallery" className="button bg-gradient-to-r from-pink-300 to-yellow-100">Разгледай галерия</Link>
        </div>
    )
}