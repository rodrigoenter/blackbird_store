import cartIcon from '../../assets/images/carrito.svg';
import { useCart } from '../../context/CartContext';

const CartWidget = () => {
    const { cart } = useCart();
    const totalItems = cart.reduce((acc, product) => acc + product.quantity, 0);

    return (
        <div className="cart-widget">
            <img src={cartIcon} alt="Carrito" className="cart-icon" />
            <span className="cart-count">{totalItems}</span>
        </div>
    );
};

export default CartWidget;