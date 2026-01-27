export default function Home({ t }) {
    return (
        <section className="hero">
            <div className="hero-content">
                <span className="badge">{t.badge}</span>

                <h1>
                    {t.title} <br />
                    <span>{t.highlight}</span>
                </h1>

                <p>{t.text}</p>

                <div className="hero-actions">
                    <button className="primary-btn">{t.primaryBtn}</button>
                    <button className="secondary-btn">{t.secondaryBtn}</button>
                </div>
            </div>
        </section>
    );
}
