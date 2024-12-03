import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import ItemList from './ItemList';

const ItemListContainer = () => {
  const { categoryId } = useParams();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsCollection = collection(db, "productos");
        const productsQuery = categoryId
          ? query(productsCollection, where("categoryId", "==", categoryId))
          : productsCollection;

        const querySnapshot = await getDocs(productsQuery);
        const products = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        console.log(products);

        const categoryOrder = ['musica', 'instrumentos', 'accesorios', 'electro'];
        const sortedProducts = products.sort((a, b) => {
          return categoryOrder.indexOf(a.categoryId) - categoryOrder.indexOf(b.categoryId);
        });

        setItems(sortedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [categoryId]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const getCategoryContent = () => {
    switch (categoryId) {
      case 'musica':
        return 'Encontrá acá la mejor música 🎵';
      case 'instrumentos':
        return 'Tenemos instrumentos increíbles 🎸';
      case 'accesorios':
        return 'Accesorios indispensables para vos 🎧';
      case 'electro':
        return 'Electrónica de alta calidad ⚡';
      default:
        return 'Bienvenid@s a Blackbird 🛒';
    }
  };

  return (
    <div className="item-list-container">
      <h1>{getCategoryContent()}</h1>
      {loading ? <p>Cargando productos...</p> : <ItemList products={items} />}
      {showScrollButton && (
        <button onClick={scrollToTop} className="scroll-to-top">
          Volver al inicio
        </button>
      )}
    </div>
  );
};

export default ItemListContainer;