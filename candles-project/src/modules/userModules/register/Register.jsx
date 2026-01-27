import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


export default function Register() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const nav = useNavigate()
    const submit = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post(import.meta.env.VITE_API_URL + '/auth/register', { name, email, password })
            localStorage.setItem('token', res.data.token)
            localStorage.setItem('user', JSON.stringify(res.data.user))
            nav('/')
        } catch (e) { alert('Грешка при регистрация') }
    }
    return (
        <form onSubmit={submit} className="max-w-md mx-auto">
            <h2 className="text-xl mb-4">Регистрация</h2>
            <input value={name} onChange={e => setName(e.target.value)} placeholder="Име" className="w-full p-2 mb-2" />
            <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" className="w-full p-2 mb-2" />
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Парола" className="w-full p-2 mb-2" />
            <button className="button bg-green-400">Регистрирай се</button>
        </form>
    )
}