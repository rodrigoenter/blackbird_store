import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '../../asyncmock';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ItemCount from './ItemCount';

const ItemDetail = () => {
    const { itemId } = useParams();
    const [item, setItem] = useState(null);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const foundItem = await getProductById(itemId);
            setItem(foundItem);
        };
        fetchData();
    }, [itemId]);

    const handleAddToCart = (quantity) => {
        const productToAdd = { ...item, quantity };
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

    if (!item) return <p>Producto no encontrado</p>;

    return (
        <div className="item-detail-container">
            <h1>{item.name}</h1>
            <img src={item.image} alt={item.name} />
            <p>${item.price}</p>
            <p>{item.description}</p>
            <ItemCount stock={10} initial={1} onAdd={handleAddToCart} />
            <ToastContainer />
        </div>
    );
};

export default ItemDetail;