import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProducts, getProductsByCategory } from '../../asyncmock';
import ProductCard from './ProductCard';

const ItemListContainer = () => {
  const { categoryId } = useParams();
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = categoryId ? await getProductsByCategory(categoryId) : await getProducts();
      setItems(data);
    };
    fetchData();
  }, [categoryId]);

  const getCategoryContent = () => {
    switch (categoryId) {
      case 'musica': return 'Encontrá acá la mejor música 🎵';
      case 'instrumentos': return 'Tenemos los mejores instrumentos 🎸';
      case 'accesorios': return 'Accesorios indispensables para vos 🎧';
      case 'electro': return 'Electrónica de alta calidad ⚡';
      default: return 'Bienvenid@s a nuestra tienda 🛒';
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