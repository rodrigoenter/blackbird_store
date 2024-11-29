import React from 'react';
import ProductCard from './ProductCard';

const ItemList = ({ products }) => {
    if (!products.length) {
        return <p>No hay productos disponibles</p>;
    }

    return (
        <div className="product-list">
            {products.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
};

export default ItemList;