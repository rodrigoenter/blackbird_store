import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  updateDoc,
  doc,
  getDoc,
  getDocs,
  deleteDoc
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export async function createOrder(order) {
  const ordersCollection = collection(db, "orders");
  try {
    const docRef = await addDoc(ordersCollection, order);

    await updateProductStock(order.items);

    return docRef.id;
  } catch (error) {
    console.error("Error al crear la orden:", error.message || error);
    throw new Error(error.message || "Error creando la orden");
  }
}

export async function getOrders() {
  try {
    const querySnapshot = await getDocs(collection(db, "orders"));
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error fetching orders:", error);
  }
}

export async function updateOrder(id, updatedData) {
  const orderRef = doc(db, "orders", id);
  try {
    await updateDoc(orderRef, updatedData);
    console.log("Orden actualizada con éxito!");
  } catch (error) {
    console.error("Error al actualizar la orden:", error);
  }
}

export async function deleteOrder(id) {
  const orderRef = doc(db, "orders", id);
  try {
    await deleteDoc(orderRef);
    console.log("Orden eliminada con éxito!");
  } catch (error) {
    console.error("Error al eliminar la orden:", error);
  }
}

async function updateProductStock(items) {
  const productsRef = collection(db, "productos");

  for (const item of items) {
    const productRef = doc(productsRef, item.id);
    const productDoc = await getDoc(productRef);
    const productData = productDoc.data();

    if (productData && productData.stock >= item.quantity) {
      await updateDoc(productRef, {
        stock: productData.stock - item.quantity,
      });
    }
  }
}

export async function checkStockAvailability(cart) {
  const productsRef = collection(db, "productos");

  const stockValidation = await Promise.all(cart.map(async (item) => {
    const productRef = doc(productsRef, item.id);
    const productDoc = await getDoc(productRef);
    if (!productDoc.exists()) {
      return {
        itemId: item.id,
        available: 0,
        isValid: false,
      };
    }

    const productData = productDoc.data();
    if (productData.stock < item.quantity) {
      return {
        itemId: item.id,
        available: productData.stock,
        isValid: false,
      };
    }

    return { itemId: item.id, available: productData.stock, isValid: true };
  }));

  return stockValidation;
}

export async function getProduct(productId) {
  const productRef = doc(db, "productos", productId);
  try {
    const productDoc = await getDoc(productRef);
    if (productDoc.exists()) {
      return { id: productDoc.id, ...productDoc.data() };
    } else {
      throw new Error("Producto no encontrado");
    }
  } catch (error) {
    console.error("Error fetching product:", error);
  }
}