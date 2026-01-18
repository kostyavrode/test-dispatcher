import { Link, useLocation } from 'react-router-dom'
import './Navbar.css'

const Navbar = () => {
  const location = useLocation()

  const isActive = (path: string) => location.pathname === path

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <span className="logo-text">Портфолио</span>
        </Link>
        <ul className="navbar-menu">
          <li>
            <Link 
              to="/" 
              className={`navbar-link ${isActive('/') ? 'active' : ''}`}
            >
              Главная
            </Link>
          </li>
          <li>
            <Link 
              to="/projects" 
              className={`navbar-link ${isActive('/projects') ? 'active' : ''}`}
            >
              Проекты
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
