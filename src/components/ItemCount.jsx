import { useState } from 'react';

const ItemCount = ({ stock, initial, onAdd }) => {
    const [quantity, setQuantity] = useState(initial);

    const handleIncrement = () => {
        if (quantity < stock) setQuantity(quantity + 1);
    };

    const handleDecrement = () => {
        if (quantity > initial) setQuantity(quantity - 1);
    };

    return (
        <div className="quantity-container">
            <button className="btn-quantity" onClick={handleDecrement}>-</button>
            <span className="quantity-value">{quantity}</span>
            <button className="btn-quantity" onClick={handleIncrement}>+</button>
            <button className="boton-carrito" onClick={() => onAdd(quantity)}>
                Agregar al carrito
            </button>
        </div>
    );
};

export default ItemCount;