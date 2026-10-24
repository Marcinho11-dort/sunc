import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section className="center" style={{ paddingTop: 80 }}>
      <h1 className="page-title">404 — потерялись в космосе</h1>
      <p className="muted">Такой страницы не существует.</p>
      <Link to="/" className="btn btn-primary">На главную</Link>
    </section>
  )
}
