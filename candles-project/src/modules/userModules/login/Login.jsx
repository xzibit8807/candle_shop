import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./login.css";

export default function Login({ lang }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const nav = useNavigate();

    const t = {
        en: {
            title: "Sign In",
            subtitle: "Sign in to place orders and track your purchases",
            email: "Email",
            password: "Password",
            button: "Sign In",
            noAccount: "Don't have an account?",
            register: "Register",
            error: "Invalid credentials",
        },
        bg: {
            title: "Вход",
            subtitle: "Влезте, за да поръчвате и следите покупките си",
            email: "Имейл",
            password: "Парола",
            button: "Вход",
            noAccount: "Нямате акаунт?",
            register: "Регистрация",
            error: "Грешни данни",
        },
    };

    const submit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(
                import.meta.env.VITE_API_URL + "/auth/login",
                { email, password }
            );

            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data.user));

            nav("/");
        } catch (err) {
            alert(t[lang].error);
        }
    };

    return (
        <div className="login-page">
            <div className="login-card">
                <div className="logo-wrapper">
                    <div className="login-logo">
                        <span className="logo-icon-logo">🕯️</span>
                    </div>
                </div>

                <h1>{t[lang].title}</h1>
                <p className="subtitle">{t[lang].subtitle}</p>

                <form className="login-form" onSubmit={submit}>
                    <label>{t[lang].email}</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        required
                    />

                    <label>{t[lang].password}</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        required
                    />

                    <button type="submit" className="login-btn">
                        {t[lang].button}
                    </button>
                </form>

                <p className="register-text">
                    {t[lang].noAccount}{" "}
                    <Link to="/register" className="register-link">
                        {t[lang].register}
                    </Link>
                </p>
            </div>
        </div>
    );
}
