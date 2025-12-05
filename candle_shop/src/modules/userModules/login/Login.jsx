import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const nav = useNavigate()
    const submit = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post(import.meta.env.VITE_API_URL + '/auth/login', { email, password })
            localStorage.setItem('token', res.data.token)
            localStorage.setItem('user', JSON.stringify(res.data.user))
            nav('/')
        } catch (e) { alert('Грешни данни') }
    }
    return (
        <form onSubmit={submit} className="max-w-md mx-auto">
            <h2 className="text-xl mb-4">Вход</h2>
            <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" className="w-full p-2 mb-2" />
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Парола" className="w-full p-2 mb-2" />
            <button className="button bg-indigo-600 text-white">Влез</button>
        </form>
    )
}