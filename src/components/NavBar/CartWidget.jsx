import cartIcon from '../../assets/images/carrito.svg';

const CartWidget = () => {
    return (
        <div className="cart-widget">
            <img src={cartIcon} alt="Carrito" className="cart-icon" />
            <span className="cart-count">6</span>
        </div>
    );
};

export default CartWidget;
