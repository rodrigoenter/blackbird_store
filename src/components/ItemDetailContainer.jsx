import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { products } from '../../asyncmock';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ItemDetailContainer = () => {
    const { itemId } = useParams();
    const [item, setItem] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const foundItem = products.find(product => product.id === parseInt(itemId));
        setItem(foundItem);
    }, [itemId]);

    const handleAddToCart = () => {
        const productToAdd = {
            ...item,
            quantity,
        };
        setCart(prevCart => [...prevCart, productToAdd]);

        toast.success(`Agregaste ${quantity} unidades de "${item.name}" al carrito.`, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "light",
            style: {
                backgroundColor: "#FFFFFF",
                color: "#663399",
                fontWeight: "400",
                fontFamily: "'Habibi', serif",
                borderRadius: "20px",
                padding: "10px 20px",
                fontSize: "16px",
            },
            icon: true,
        });
    };

    const handleIncrement = () => {
        if (quantity < 10) {
            setQuantity(prevQuantity => prevQuantity + 1);
        }
    };

    const handleDecrement = () => {
        if (quantity > 1) {
            setQuantity(prevQuantity => prevQuantity - 1);
        }
    };

    if (!item) {
        return <p>Producto no encontrado</p>;
    }

    return (
        <div className="item-detail-container">
            <h1>{item.name}</h1>
            <img src={item.image} alt={item.name} />
            <p>${item.price}</p>
            <p>{item.description}</p>
            <div className="quantity-container">
                <button className="btn-quantity" onClick={handleDecrement}>-</button>
                <span className="quantity-value">{quantity}</span>
                <button className="btn-quantity" onClick={handleIncrement}>+</button>
            </div>
            <button className="boton-carrito" onClick={handleAddToCart}>
                Agregar al carrito
            </button>
            <ToastContainer />
        </div>
    );
};

export default ItemDetailContainer;
