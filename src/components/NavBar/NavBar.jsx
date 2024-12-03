import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './NavBar.css';
import Brand from './Brand';
import accountIcon from '../../assets/images/my_account.svg';
import CartWidget from './CartWidget';

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleCategoryClick = (categoryId) => {
    navigate(`/category/${categoryId}`);
    setMenuOpen(false);
  };

  const handleNavigation = (path) => {
    navigate(path);
    setMenuOpen(false);
  };

  return (
    <nav className="NavBar">
      <Brand />
      <button
        className="menu-toggle"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
      >
        {menuOpen ? '✕' : '☰'}
      </button>
      <div className={`nav-links-container ${menuOpen ? 'open' : ''}`}>
        <div className="nav-links">
          <button onClick={() => handleCategoryClick('musica')} className="btn nav-button">
            Música
          </button>
          <button onClick={() => handleCategoryClick('instrumentos')} className="btn nav-button">
            Instrumentos
          </button>
          <button onClick={() => handleCategoryClick('accesorios')} className="btn nav-button">
            Accesorios
          </button>
          <button onClick={() => handleCategoryClick('electro')} className="btn nav-button">
            Electro
          </button>
        </div>
        <div className="right-section">
          <button onClick={() => handleNavigation('/account')} className="account-icon btn">
            <img src={accountIcon} alt="Mi Cuenta" />
          </button>
          <button onClick={() => handleNavigation('/cart')} className="btn">
            <CartWidget />
          </button>
          <button onClick={() => handleNavigation('/login')} className="login btn nav-button">
            Login
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;