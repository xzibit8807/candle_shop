import { Link } from 'react-router-dom'


export default function Header() {
    const user = JSON.parse(localStorage.getItem('user') || 'null')
    return (
        <header className="py-4 px-6 flex items-center justify-between">
            <Link to="/" className="header-logo text-xl">Sweet Candles</Link>
            <nav className="space-x-4">
                <Link to="/gallery">Галерия</Link>
                {user ? (
                    <>
                        <Link to="/">Заявки</Link>
                        {user.role === 'admin' && <Link to="/admin/add">Добави</Link>}
                        <button onClick={() => { localStorage.removeItem('token'); localStorage.removeItem('user'); window.location = '/'; }}>Изход</button>
                    </>
                ) : (
                    <>
                        <Link to="/login">Вход</Link>
                        <Link to="/register">Регистрация</Link>
                    </>
                )}
            </nav>
        </header>
    )
}