import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { products } from '../../asyncmock';
import ProductCard from './ProductCard';

const ItemListContainer = () => {
  const { categoryId } = useParams();
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (categoryId) {
      setItems(products.filter(product => product.category === categoryId));
    } else {
      setItems(products);
    }
  }, [categoryId]);

  const getCategoryContent = () => {
    if (!categoryId) {
      return 'Bienvenid@s a nuestra tienda 🛒';
    }

    switch (categoryId) {
      case 'musica':
        return 'Encontrá acá la mejor música 🎵';
      case 'instrumentos':
        return 'Tenemos los mejores instrumentos 🎸';
      case 'accesorios':
        return 'Accesorios indispensables para vos 🎧';
      case 'electro':
        return 'Electrónica de alta calidad ⚡';
      default:
        return 'Categoría no encontrada';
    }
  };

  return (
    <div className="item-list-container">
      <h1>{getCategoryContent()}</h1>
      <div className="product-list">
        {items.length ? (
          items.map(item => <ProductCard key={item.id} product={item} />)
        ) : (
          <p>No hay productos disponibles</p>
        )}
      </div>
    </div>
  );
};

export default ItemListContainer;
