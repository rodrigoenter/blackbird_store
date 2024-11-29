import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => (
    <div className="product-card">
        <img src={product.image} alt={product.title} />
        <h3>{product.title}</h3>
        <p>Precio: ${product.price}</p>
        <Link to={`/item/${product.id}`} className="btn btn-primary">Ver detalles</Link>
    </div>
);

export default ProductCard;