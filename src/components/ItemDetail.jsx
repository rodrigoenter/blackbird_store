import { useState } from 'react';
import ItemCount from './ItemCount';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ItemDetail = ({ item }) => {
  const { addItem, isInCart } = useCart();
  const [quantitySelected, setQuantitySelected] = useState(0);
  const navigate = useNavigate();

  const handleAddToCart = (quantity) => {
    if (quantity > 10) {
      toast.error('No puedes agregar más de 10 unidades.', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'light',
        style: {
          backgroundColor: '#FFFFFF',
          color: '#663399',
          borderRadius: '12px',
          padding: '16px',
          fontFamily: 'Habibi, serif',
        },
        progressStyle: {
          backgroundColor: '#c7baf7',
        },
      });
      return;
    }

    setQuantitySelected(quantity);
    addItem(item, quantity);

    toast.success(
      `\u{1F6D2} Agregaste ${quantity} unidades de "${item.title}" al carrito.`, {
      position: 'top-right',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: 'light',
      style: {
        backgroundColor: '#FFFFFF',
        color: '#663399',
        borderRadius: '12px',
        padding: '16px',
        fontFamily: 'Habibi, serif',
      },
      progressStyle: {
        backgroundColor: '#c7baf7',
      },
    }
    );
  };

  const handleFinishPurchase = () => {
    navigate('/cart');
  };

  const handleContinueShopping = () => {
    navigate('/');
  };

  return (
    <div className="item-detail-container">
      <h1 style={{ fontFamily: 'Habibi, serif' }}>{item.title}</h1>
      <img src={item.image} alt={item.title} />
      <p>${item.price}</p>
      <p>{item.description}</p>

      {isInCart(item.id) ? (
        <div className="already-in-cart">
          <p>Este producto ya está en tu carrito.</p>
        </div>
      ) : (
        <div>
          <ItemCount stock={10} initial={1} onAdd={handleAddToCart} />
        </div>
      )}

      {quantitySelected > 0 && (
        <div className="button-group">
          <button className="btn btn-primary" onClick={handleFinishPurchase}>
            Terminar mi compra
          </button>
          <button className="btn btn-primary" onClick={handleContinueShopping}>
            Seguir comprando
          </button>
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default ItemDetail;