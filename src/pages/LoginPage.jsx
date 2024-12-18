import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Oval } from 'react-loader-spinner';

const styles = {
  container: {
    maxWidth: '400px',
    margin: '0 auto',
    padding: '40px',
    borderRadius: '20px',
    backgroundColor: '#ffffff',
    boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.1)',
    textAlign: 'left',
    border: '1px solid #f7f7f7',
    marginTop: '310px',
    marginBottom: '30px',
  },
  title: {
    fontSize: '28px',
    marginBottom: '30px',
    color: '#663399',
    textAlign: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  label: {
    fontSize: '16px',
    color: '#000000',
    marginBottom: '5px',
  },
  input: {
    padding: '10px',
    fontSize: '16px',
    borderRadius: '20px',
    border: '1px solid #663399',
    outline: 'none',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '20px',
    gap: '15px',
  },
  button: {
    marginTop: '30px',
    marginBottom: '30px',
    padding: '10px',
    fontSize: '16px',
    backgroundColor: '#663399',
    color: '#FFFFFF',
    border: 'none',
    borderRadius: '50px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease, transform 0.3s ease',
    fontFamily: 'Habibi, serif',
    textAlign: 'center',
  },
  buttonHover: {
    color: '#663399',
    backgroundColor: '#c7baf7',
  },
  links: {
    fontSize: '14px',
    color: '#663399',
    textDecoration: 'none',
    textAlign: 'center',
    display: 'block',
    marginTop: '20px',
  },
  loaderContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '20px',
  },
};

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isHover, setIsHover] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        navigate('/');
      }, 2000);
    } else {
      alert('Por favor, completá todos los campos.');
    }
  };

  return (
    <section style={styles.container}>
      <h2 style={styles.title}>Iniciar sesión 🔐</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <label htmlFor="email" style={styles.label}>
          Correo electrónico
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={styles.input}
        />
        <label htmlFor="password" style={styles.label}>
          Contraseña
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={styles.input}
        />
        <label style={styles.rememberMeLabel}>
          <input
            type="checkbox"
            id="rememberMe"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            style={styles.checkbox}
          />
          Mantener sesión iniciada
        </label>
        <button
          type="submit"
          style={{
            ...styles.button,
            ...(isHover ? styles.buttonHover : {}),
          }}
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
          disabled={isLoading}
        >
          {isLoading ? 'Ingresando...' : 'Ingresar'}
        </button>
      </form>
      {isLoading && (
        <div style={styles.loaderContainer}>
          <Oval
            height={40}
            width={40}
            color="#663399"
            secondaryColor="#c7baf7"
            strokeWidth={2}
            strokeWidthSecondary={2}
          />
        </div>
      )}
      <a href="/login" style={styles.links}>
        ¿Olvidaste tu contraseña?
      </a>
    </section>
  );
};

export default LoginPage;