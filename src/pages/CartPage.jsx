import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Oval } from 'react-loader-spinner';
import Swal from 'sweetalert2';
import React from 'react';

const CartPage = () => {
  const { cart, removeItem, updateQuantity, clear, loading, loadingItems } = useCart();
  const navigate = useNavigate();
  const [processingOrder] = useState(false);

  const calculateTotal = () => {
    return cart.reduce((acc, product) => acc + product.price * product.quantity, 0);
  };

  const handleQuantityChange = (productId, increment) => {
    const product = cart.find((item) => item.id === productId);
    const newQuantity = increment ? product.quantity + 1 : product.quantity - 1;

    if (newQuantity > 0) {
      updateQuantity(productId, newQuantity);
    }
  };

  const handleGoToStore = () => {
    navigate('/');
  };

  const handleFinalizePurchase = () => {
    if (cart.length === 0) {
      Swal.fire({
        title: 'Carrito vacío',
        text: 'No hay productos en el carrito.',
        icon: 'info',
        confirmButtonText: 'OK',
        customClass: {
          confirmButton: 'btn-primary',
        },
        buttonsStyling: false,
      });
      return;
    }
    navigate('/checkout');
  };

  return (
    <div className="cart-page">
      {cart.length === 0 ? (
        <div>
          <h1>Tu carrito está vacío 🫠</h1>
          <p>Agregá tus productos favoritos para generar una compra 💞</p>
          <button className="btn btn-primary" onClick={handleGoToStore}>
            Ir a la tienda
          </button>
        </div>
      ) : (
        <div>
          {cart.map((product) => (
            <div key={product.id} className="cart-item">
              <div>
                {product.image && (
                  <img
                    src={product.image}
                    alt={product.title}
                    className="cart-item-image"
                  />
                )}
                <h3>{product.title}</h3>
                <p>Precio: ${product.price}</p>
                <p>Cantidad: {product.quantity}</p>
              </div>
              <div className="quantity-controls">
                <button onClick={() => handleQuantityChange(product.id, false)}>-</button>
                <span>{product.quantity}</span>
                <button onClick={() => handleQuantityChange(product.id, true)}>+</button>
              </div>
              <button
                onClick={() => removeItem(product.id)}
                disabled={loadingItems[product.id]}
                style={{ fontFamily: 'Habibi, serif' }}
              >
                {loadingItems[product.id] ? (
                  <Oval height={20} width={20} color="#c7baf7" secondaryColor="#FFFFFF" visible={true} />
                ) : (
                  'Eliminar'
                )}
              </button>
            </div>
          ))}
          <div className="cart-total">
            <p>Total: ${calculateTotal().toFixed(2)}</p>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '20px' }}>
            <button className="btn btn-primary" onClick={clear} disabled={loading}>
              {loading ? (
                <Oval height={20} width={20} color="#c7baf7" secondaryColor="#FFFFFF" visible={true} />
              ) : (
                '🗑️ Vaciar carrito'
              )}
            </button>
            <button
              className="btn btn-primary"
              onClick={handleFinalizePurchase}
              disabled={processingOrder || loading}
            >
              {processingOrder ? (
                <Oval height={20} width={20} color="#c7baf7" secondaryColor="#FFFFFF" visible={true} />
              ) : (
                'Finalizar compra'
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;