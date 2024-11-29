import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import ItemDetail from './ItemDetail';

const ItemDetailContainer = () => {
    const { itemId } = useParams();
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const productRef = doc(db, "productos", itemId);
                const productSnapshot = await getDoc(productRef);
                if (productSnapshot.exists()) {
                    setItem({ id: productSnapshot.id, ...productSnapshot.data() });
                } else {
                    console.error("Producto no encontrado");
                }
            } catch (error) {
                console.error("Error fetching product:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [itemId]);

    if (loading) return <p>Cargando producto...</p>;
    if (!item) return <p>Producto no encontrado</p>;

    return <ItemDetail item={item} />;
};

export default ItemDetailContainer;