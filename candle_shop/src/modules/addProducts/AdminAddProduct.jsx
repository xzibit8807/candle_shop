import { useState } from 'react'
import axios from 'axios'


export default function AdminAddProduct() {
    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')
    const [price, setPrice] = useState('')
    const [files, setFiles] = useState(null)


    const submit = async (e) => {
        e.preventDefault()
        const fd = new FormData()
        fd.append('title', title)
        fd.append('description', desc)
        fd.append('price', price)
        if (files) for (let f of files) fd.append('images', f)
        const token = localStorage.getItem('token')
        try {
            await axios.post(import.meta.env.VITE_API_URL + '/products', fd, { headers: { Authorization: 'Bearer ' + token, 'Content-Type': 'multipart/form-data' } })
            alert('Добавено')
        } catch (e) { alert('Грешка') }
    }


    return (
        <form onSubmit={submit} className="max-w-2xl mx-auto p-4">
            <h2 className="text-2xl mb-4">Добави продукт (Admin)</h2>
            <input required value={title} onChange={e => setTitle(e.target.value)} placeholder="Заглавие" className="w-full p-2 mb-2" />
            <textarea required value={desc} onChange={e => setDesc(e.target.value)} placeholder="Описание" className="w-full p-2 mb-2" />
            <input value={price} onChange={e => setPrice(e.target.value)} placeholder="Цена" className="w-full p-2 mb-2" />
            <input type="file" multiple onChange={e => setFiles(e.target.files)} className="mb-2" />
            <button className="px-4 py-2 bg-indigo-600 text-white rounded">Добави</button>
        </form>
    )
}