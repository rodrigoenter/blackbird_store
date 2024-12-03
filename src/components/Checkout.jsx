import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { createOrder } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Oval } from "react-loader-spinner";
import { jsPDF } from "jspdf";
import { fontFamily } from "@mui/system";

const styles = {
    container: {
        maxWidth: "400px",
        margin: "0 auto",
        padding: "40px",
        borderRadius: "20px",
        backgroundColor: "#ffffff",
        boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.1)",
        textAlign: "left",
        border: "1px solid #f7f7f7",
        marginTop: "310px",
        marginBottom: "30px",
    },
    title: {
        fontSize: "28px",
        marginBottom: "30px",
        color: "#663399",
        textAlign: "center",
    },
    section: {
        marginBottom: "30px",
    },
    sectionTitle: {
        fontSize: "20px",
        marginBottom: "10px",
        color: "#663399",
    },
    input: {
        padding: "10px",
        fontSize: "16px",
        borderRadius: "20px",
        border: "1px solid #663399",
        outline: "none",
        width: "100%",
        marginBottom: "20px",
        fontFamily: "'Habibi', serif",
    },
    summary: {
        marginBottom: "30px",
    },
    item: {
        fontSize: "16px",
        color: "#000000",
        marginBottom: "50px",
    },
    itemName: {
        fontWeight: "bold",
    },
    button: {
        padding: "10px",
        fontSize: "16px",
        backgroundColor: "#663399",
        color: "#FFFFFF",
        border: "none",
        borderRadius: "50px",
        marginTop: "30px",
        cursor: "pointer",
        transition: "background-color 0.3s ease, transform 0.3s ease",
        textAlign: "center",
        fontFamily: "'Habibi', serif",
    },
    buttonHover: {
        color: "#663399",
        backgroundColor: "#c7baf7",
    },
};

const Checkout = () => {
    const { cart, clear, calculateTotal } = useCart();
    const navigate = useNavigate();

    // Almacenar los datos del comprador
    const [buyer, setBuyer] = useState({ name: "", phone: "", email: "", confirmEmail: "" });

    // Manejar el estado de procesamiento de la orden
    const [processingOrder, setProcessingOrder] = useState(false);

    // Manejar los cambios en los inputs del formulario
    const handleChange = (e) => {
        const { name, value } = e.target;
        setBuyer((prev) => ({ ...prev, [name]: value }));
    };

    // Validar el formulario antes de crear la orden
    const validateForm = () => {
        const { name, phone, email, confirmEmail } = buyer;
        if (!name || !phone || !email || !confirmEmail) {
            Swal.fire({
                title: "Olvidaste tus datos 🥴",
                text: "Por favor, completalos para finalizar la compra.",
                icon: "warning",
                confirmButtonText: "OK",
                customClass: {
                    confirmButton: "btn-primary",
                },
            });
            return false;
        }
        if (email !== confirmEmail) {
            Swal.fire({
                title: "Los correos no coinciden 😣",
                text: "Por favor, verificá que ambos correos sean iguales.",
                icon: "warning",
                confirmButtonText: "OK",
                customClass: {
                    confirmButton: "btn-primary",
                },
            });
            return false;
        }
        return true;
    };

    // Generar PDF con los detalles de la orden
    const generatePDF = (orderId, order) => {
        const doc = new jsPDF();

        const currentDate = new Date();
        const formattedDate = currentDate.toLocaleDateString("es-ES", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });

        doc.setFontSize(18);
        doc.text("Detalles de tu pedido", 14, 20);
        doc.setFontSize(12);
        doc.text(`Fecha de compra: ${formattedDate}`, 14, 30);

        doc.text(`ID de la orden: ${orderId}`, 14, 40);
        doc.text(`Nombre: ${order.buyer.name}`, 14, 50);
        doc.text(`Teléfono: ${order.buyer.phone}`, 14, 60);
        doc.text(`Email: ${order.buyer.email}`, 14, 70);

        doc.text("Detalles de la compra", 14, 90);
        let startY = 100;
        order.items.forEach((item, index) => {
            const itemTotalPrice = item.quantity * item.price;
            doc.text(
                `${index + 1}. ${item.title} - Cantidad: ${item.quantity}, Precio unitario: $${item.price}, Total: $${itemTotalPrice}`,
                14,
                startY + (index * 10)
            );
        });

        const totalY = startY + (order.items.length * 10) + 10;
        doc.text(`Total General: $${order.total}`, 14, totalY);

        doc.save(`orden_${orderId}.pdf`);
    };

    // Manejar la creación de la orden
    const handleCreateOrder = async () => {
        if (cart.length === 0) {
            Swal.fire({
                title: "Error",
                text: "El carrito está vacío. Por favor, añadí productos antes de confirmar la compra.",
                icon: "warning",
                confirmButtonText: "OK",
                customClass: {
                    confirmButton: "btn-primary",
                },
            });
            return;
        }

        if (!validateForm()) return;

        setProcessingOrder(true);

        const order = {
            buyer,
            items: cart.map(({ id, title, price, quantity }) => ({
                id,
                title,
                price,
                quantity,
            })),
            date: new Date().toISOString(),
            total: calculateTotal(),
        };

        try {
            const orderId = await createOrder(order);

            if (orderId) {
                Swal.fire({
                    title: "¡Realizaste tu compra!",
                    text: `El ID de tu orden es: ${orderId}`,
                    icon: "success",
                    confirmButtonText: "Descargar PDF",
                    cancelButtonText: "Volver al inicio",
                    showCancelButton: true,
                    customClass: {
                        confirmButton: "btn-primary",
                        cancelButton: "btn-primary",
                    },
                }).then((result) => {
                    if (result.isConfirmed) {
                        generatePDF(orderId, order);
                    }
                });

                clear();
                navigate("/");
            } else {
                throw new Error("No se obtuvo un orderId válido de Firebase");
            }
        } catch (error) {
            Swal.fire({
                title: "Error",
                text: "Hubo un problema al generar tu orden.",
                icon: "error",
                confirmButtonText: "OK",
                customClass: {
                    confirmButton: "btn-primary",
                },
            });
            console.error("Error al crear la orden:", error.message || error);
        } finally {
            setTimeout(() => {
                setProcessingOrder(false);
            }, 5000);
        }
    };

    return (
        <section style={styles.container}>
            <h1 style={styles.title}>Checkout 🛍️</h1>
            <div style={styles.section}>
                <h2 style={styles.sectionTitle}>Datos del comprador</h2>
                <input
                    type="text"
                    name="name"
                    placeholder="Nombre completo"
                    value={buyer.name}
                    onChange={handleChange}
                    style={styles.input}
                />
                <input
                    type="text"
                    name="phone"
                    placeholder="Teléfono"
                    value={buyer.phone}
                    onChange={handleChange}
                    style={styles.input}
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Correo electrónico"
                    value={buyer.email}
                    onChange={handleChange}
                    style={styles.input}
                />
                <input
                    type="email"
                    name="confirmEmail"
                    placeholder="Confirmar correo electrónico"
                    value={buyer.confirmEmail}
                    onChange={handleChange}
                    style={styles.input}
                />
            </div>
            <div style={styles.section}>
                <h2 style={styles.sectionTitle}>Resumen de compra</h2>
                {cart.map((item) => (
                    <div key={item.id} style={styles.item}>
                        <p style={styles.itemName}>{item.title}</p>
                        <p>Cantidad: {item.quantity}</p>
                        <p>Precio: ${item.price}</p>
                    </div>
                ))}
                <h3>Total: ${calculateTotal().toFixed(2)}</h3>
            </div>
            <div style={{ textAlign: "center", marginTop: "20px" }}>
                <button
                    style={{ ...styles.button, ...(processingOrder ? styles.buttonHover : {}) }}
                    onClick={handleCreateOrder}
                    disabled={processingOrder}
                >
                    {processingOrder ? (
                        <Oval height={20} width={20} color="#c7baf7" secondaryColor="#663399" visible={true} />
                    ) : (
                        "Confirmar compra"
                    )}
                </button>
            </div>
        </section>
    );
};

export default Checkout;