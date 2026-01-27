import { Link } from "react-router-dom";
import { useState } from "react";
import "./header.css";

const Header = ({ lang, setLang }) => {
    const t = {
        en: {
            home: "Home",
            gallery: "Gallery",
            signIn: "Sign In",
            register: "Register",
            profile: "Profile",
            orders: "Orders",
            admin: "Admin",
            logout: "Logout",
        },
        bg: {
            home: "Начало",
            gallery: "Галерия",
            signIn: "Вход",
            register: "Регистрация",
            profile: "Профил",
            orders: "Поръчки",
            admin: "Админ",
            logout: "Изход",
        },
    };

    const user = JSON.parse(localStorage.getItem("user"));
    const [open, setOpen] = useState(false);

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "/";
    };

    return (
        <header className="header">
            <div className="header-left">
                <div className="logo-wrapper">
                    <div className="logo-circle">
                        <div className="logo-icon">🕯️</div>
                    </div>
                    <div className="logo-text">Sweet Candles</div>
                </div>
            </div>

            <nav className="header-center">
                <Link to="/" className="nav-item">{t[lang].home}</Link>
                <Link to="/gallery" className="nav-item">{t[lang].gallery}</Link>
            </nav>

            <div className="header-right">
                <div className="lang-switch">
                    <button
                        className={lang === "en" ? "active" : ""}
                        onClick={() => setLang("en")}
                    >
                        EN
                    </button>
                    <button
                        className={lang === "bg" ? "active" : ""}
                        onClick={() => setLang("bg")}
                    >
                        BG
                    </button>
                </div>

                {!user ? (
                    <>
                        <Link to="/login" className="sign-in">
                            {t[lang].signIn}
                        </Link>
                        <Link to="/register" className="sign-in">
                            {t[lang].register}
                        </Link>
                    </>
                ) : (
                    <div className="user-menu">
                        <div className="avatar" onClick={() => setOpen(!open)}>
                            {user.name?.charAt(0).toUpperCase()}
                        </div>

                        {open && (
                            <div className="dropdown">
                                <Link to="/profile">{t[lang].profile}</Link>
                                <Link to="/orders">{t[lang].orders}</Link>

                                {user.role === "admin" && (
                                    <Link to="/admin">{t[lang].admin}</Link>
                                )}

                                <button onClick={logout}>
                                    {t[lang].logout}
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;
