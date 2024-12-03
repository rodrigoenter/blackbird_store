import React, { createContext, useContext, useState, useEffect } from 'react';
import Swal from 'sweetalert2';

// Contexto y LocalStorage
const CartContext = createContext();

const useCart = () => useContext(CartContext);

const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    const [loading, setLoading] = useState(false);
    const [loadingItems, setLoadingItems] = useState({});

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const calculateTotal = () => {
        return cart.reduce((acc, product) => acc + product.price * product.quantity, 0);
    };

    // Restricción para agregar más de 10 unidades
    const showStockAlert = () => {
        Swal.fire({
            title: 'Lo sentimos 🥲',
            text: 'No puedes agregar más de 10 unidades de este producto al carrito.',
            icon: 'warning',
            confirmButtonText: 'OK',
            customClass: {
                confirmButton: 'btn-primary'
            },
            buttonsStyling: false
        });
    };

    // Verificar si el producto está en el carrito / Actualizar cantidad
    const isInCart = (id) => {
        return cart.some((item) => item.id === id);
    };

    const handleProductExistence = (product, quantity) => {
        const existingProduct = cart.find((item) => item.id === product.id);
        if (existingProduct) {
            const newQuantity = existingProduct.quantity + quantity;
            if (newQuantity <= 10) {
                setCart((prevCart) =>
                    prevCart.map((item) =>
                        item.id === product.id ? { ...item, quantity: newQuantity } : item
                    )
                );
            } else {
                showStockAlert();
            }
            return true;
        }
        return false;
    };

    const addItem = (product, quantity) => {
        if (!isInCart(product.id)) {
            if (quantity <= 10) {
                setCart((prevCart) => [...prevCart, { ...product, quantity }]);
            } else {
                showStockAlert();
            }
        } else {
            handleProductExistence(product, quantity);
        }
    };

    const updateQuantity = (productId, newQuantity) => {
        if (newQuantity <= 10) {
            setCart((prevCart) =>
                prevCart.map((item) =>
                    item.id === productId ? { ...item, quantity: newQuantity } : item
                )
            );
        } else {
            showStockAlert();
        }
    };

    // Eliminar un producto del carrito con sppiner/loading
    const removeItem = (productId) => {
        setLoadingItems((prevLoadingItems) => ({
            ...prevLoadingItems,
            [productId]: true,
        }));
        setTimeout(() => {
            setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
            setLoadingItems((prevLoadingItems) => ({
                ...prevLoadingItems,
                [productId]: false,
            }));
        }, 2000);
    };

    // Vaciar carrito con sppiner/loading
    const clear = () => {
        setLoading(true);
        setTimeout(() => {
            setCart([]);
            localStorage.removeItem('cart');
            setLoading(false);
        }, 2000);
    };

    // Proveer el contexto del carrito y sus funciones a los componentes hijos
    return (
        <CartContext.Provider
            value={{ cart, addItem, removeItem, updateQuantity, clear, isInCart, calculateTotal, loading, loadingItems }}
        >
            {children}
        </CartContext.Provider>
    );
};

export { CartProvider, useCart };