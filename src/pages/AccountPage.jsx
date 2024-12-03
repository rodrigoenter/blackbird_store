import React, { useState } from 'react';

const styles = {
  container: {
    maxWidth: '800px',
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
  section: {
    marginBottom: '30px',
  },
  sectionTitle: {
    fontSize: '20px',
    marginBottom: '10px',
    color: '#663399',
  },
  info: {
    fontSize: '16px',
    color: '#000000',
    marginBottom: '5px',
  },
  avatarContainer: {
    textAlign: 'center',
    marginBottom: '30px',
    display: 'flex',
    justifyContent: 'center',
  },
  avatar: {
    width: '150px',
    height: '150px',
    borderRadius: '50%',
    objectFit: 'cover',
    marginBottom: '10px',
    border: '5px solid transparent',
    backgroundImage: 'linear-gradient(white, white), linear-gradient(to right, #663399, #c7baf7)',
    backgroundOrigin: 'border-box',
    backgroundClip: 'content-box, border-box',
  },
  editButton: {
    padding: '10px',
    fontSize: '16px',
    backgroundColor: '#663399',
    color: '#FFFFFF',
    border: 'none',
    borderRadius: '50px',
    marginTop: '30px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease, transform 0.3s ease',
    fontFamily: "'Habibi', serif",
  },
  editButtonHover: {
    color: '#663399',
    backgroundColor: '#c7baf7',
    fontFamily: "'Habibi', serif",
  },
  input: {
    padding: '10px',
    fontSize: '16px',
    borderRadius: '20px',
    border: '1px solid #663399',
    outline: 'none',
    width: '100%',
    marginBottom: '20px',
  },
};

const AccountPage = () => {
  const [isHoverEdit, setIsHoverEdit] = useState(false);
  const [isHoverSave, setIsHoverSave] = useState(false);
  const [editing, setEditing] = useState(false);
  const [userInfo, setUserInfo] = useState(() => {
    const savedInfo = localStorage.getItem('userInfo');
    return savedInfo ? JSON.parse(savedInfo) : {
      name: 'Juliet Burke',
      email: 'juliet.burke@dharma.initiative.com',
      phone: '+04 08 1516 2342',
      address1: '4.137500, 162.061667',
      payment: '**** **** **** 0815',
      securityCode: '***',
    };
  });

  const handleEditClick = () => {
    setEditing(!editing);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleSave = () => {
    setEditing(false);
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
    console.log('Saved:', userInfo);
  };

  return (
    <section style={styles.container}>
      <h2 style={styles.title}>Mi cuenta 👽</h2>
      <div style={styles.avatarContainer}>
        <img src="/juliet.jpg" alt="Avatar" style={styles.avatar} />
      </div>
      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>Información básica</h3>
        {editing ? (
          <>
            <input
              type="text"
              name="name"
              value={userInfo.name}
              onChange={handleChange}
              style={styles.input}
            />
            <input
              type="email"
              name="email"
              value={userInfo.email}
              onChange={handleChange}
              style={styles.input}
            />
            <input
              type="text"
              name="phone"
              value={userInfo.phone}
              onChange={handleChange}
              style={styles.input}
            />
          </>
        ) : (
          <>
            <p style={styles.info}><strong>Nombre:</strong> {userInfo.name}</p>
            <p style={styles.info}><strong>Correo electrónico:</strong> {userInfo.email}</p>
            <p style={styles.info}><strong>Teléfono:</strong> {userInfo.phone}</p>
          </>
        )}
      </div>
      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>Dirección</h3>
        {editing ? (
          <input
            type="text"
            name="address1"
            value={userInfo.address1}
            onChange={handleChange}
            style={styles.input}
          />
        ) : (
          <p style={styles.info}><strong>Dirección de envíos:</strong> {userInfo.address1}</p>
        )}
      </div>
      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>Medios de pago</h3>
        {editing ? (
          <>
            <input
              type="text"
              name="payment"
              value={userInfo.payment}
              onChange={handleChange}
              style={styles.input}
            />
            <input
              type="text"
              name="securityCode"
              value={userInfo.securityCode}
              onChange={handleChange}
              style={styles.input}
              placeholder="Código de Seguridad"
            />
          </>
        ) : (
          <>
            <p style={styles.info}><strong>Tarjeta de crédito:</strong> {userInfo.payment}</p>
            <p style={styles.info}><strong>Código de seguridad:</strong> {userInfo.securityCode}</p>
          </>
        )}
      </div>
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <button
          style={{
            ...styles.editButton,
            ...(isHoverEdit ? styles.editButtonHover : {}),
            marginRight: '20px',
            fontFamily: "'Habibi', serif",
          }}
          onMouseEnter={() => setIsHoverEdit(true)}
          onMouseLeave={() => setIsHoverEdit(false)}
          onClick={handleEditClick}
        >
          {editing ? 'Cancelar' : 'Editar Información'}
        </button>
        {editing && (
          <button
            style={{
              ...styles.editButton,
              ...(isHoverSave ? styles.editButtonHover : {}),
              fontFamily: "'Habibi', serif",
            }}
            onMouseEnter={() => setIsHoverSave(true)}
            onMouseLeave={() => setIsHoverSave(false)}
            onClick={handleSave}
          >
            Guardar cambios
          </button>
        )}
      </div>
    </section>
  );
};

export default AccountPage;