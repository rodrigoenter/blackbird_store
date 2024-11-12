import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
    return (
        <>
            <div className="product-card">
                <img src={product.image} alt={product.name} />
                <h3>{product.name}</h3>
                <p>${product.price}</p>
                <Link to={`/item/${product.id}`} className="btn btn-primary">Ver detalles</Link>
            </div>
        </>
    );
};

export default ProductCard;

