import { useState } from 'react';
import './NavBar.css';
import Brand from './Brand';
import accountIcon from '../../assets/images/my_account.svg';
import CartWidget from './CartWidget';

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="NavBar">
      <Brand />
      <button
        className="menu-toggle"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
      >
        {menuOpen ? '✖' : '☰'}
      </button>
      <div className={`nav-links-container ${menuOpen ? 'open' : ''}`}>
        <div className="nav-links">
          <a href="#Música">Música</a>
          <a href="#Instrumentos">Instrumentos</a>
          <a href="#Accesorios">Accesorios</a>
          <a href="#Electro">Electro</a>
        </div>
        <div className="right-section">
          <a href="#cuenta" className="account-icon">
            <img src={accountIcon} alt="Mi Cuenta" />
          </a>
          <a href="#carrito">
            <CartWidget />
          </a>
          <a href="#login" className="login">Login</a>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
