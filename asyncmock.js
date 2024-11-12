export const products = [
    {
        id: 1,
        name: "Vinilo: In Utero - Nirvana",
        price: 60000,
        category: "musica",
        image: "/products/in_utero.png",
        description: "Un álbum crudo y visceral que captura la esencia del grunge en su forma más pura.",
    },
    {
        id: 2,
        name: "Vinilo: Abbey Road - The Beatles",
        price: 65000,
        category: "musica",
        image: "/products/abbey_road.png",
        description: "Un icónico viaje musical lleno de creatividad y armonías inolvidables.",
    },
    {
        id: 3,
        name: "Vinilo: Ok Computer - Radiohead",
        price: 55000,
        category: "musica",
        image: "/products/ok_computer.png",
        description: "Una obra maestra distópica que redefine el rock alternativo con innovadoras texturas sonoras.",
    },
    {
        id: 4,
        name: "Guitarra Acústica Martin&Co",
        price: 2055000,
        category: "instrumentos",
        image: "/products/guitarra_martin.png",
        description: "Guitarra acústica, famosa por su sonido cálido y resonante.",
    },
    {
        id: 5,
        name: "Batería Electrónica Roland",
        price: 2880000,
        category: "instrumentos",
        image: "/products/bateria_roland.png",
        description: "Batería electrónica Roland con sensibilidad al toque y una gran variedad de sonidos.",
    },
    {
        id: 6,
        name: "Ukulele Kala",
        price: 120000,
        category: "instrumentos",
        image: "/products/ukelele_kala.png",
        description: "Ukulele soprano, ligero y fácil de tocar, ideal para principiantes.",
    },
    {
        id: 7,
        name: "Auriculares Sony WH-1000XM4",
        price: 499000,
        category: "accesorios",
        image: "/products/sony_wh_1000xm4.png",
        description: "Auriculares con cancelación de ruido y calidad de sonido premium.",
    },
    {
        id: 8,
        name: "Soporte para Guitarra",
        price: 30000,
        category: "accesorios",
        image: "/products/soporte_guitarra.png",
        description: "Soporte para guitarra, ajustable y muy seguro.",
    },
    {
        id: 9,
        name: "Cables de Audio Monster",
        price: 25000,
        category: "accesorios",
        image: "/products/cables_monster.png",
        description: "Cables de audio Monster, perfectos para una transmisión de señal sin interferencias.",
    },
    {
        id: 10,
        name: "Controlador DJ Pioneer DDJ-SX2",
        price: 1500000,
        category: "electro",
        image: "/products/pioneer_ddj_sx2.png",
        description: "Súper completo de 4 canales, con entradas para canon, plug y RCA.",
    },
    {
        id: 11,
        name: "Parlante Bluetooth Marshall Woburn III",
        price: 1200000,
        category: "electro",
        image: "/products/marshall_woburn.png",
        description: "Parlante diseñado con un sistema de drivers de tres vías que ofrecen una calidad de sonido superior.",
    },
    {
        id: 12,
        name: "Tocadiscos Jukebox",
        price: 149000,
        category: "electro",
        image: "/products/tocadiscos.png",
        description: "Reproductor de discos de vinilo vintage BT, USB y grabación con soporte de 33/45/78RPM.",
    },
];

export const getProducts = () => {
    return new Promise((resolve) => {
        setTimeout(() => resolve(products), 500);
    });
};

export const getProductsByCategory = (categoryId) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const filteredProducts = products.filter(product => product.category === categoryId);
            resolve(filteredProducts);
        }, 500);
    });
};

export const getProductById = (itemId) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const product = products.find(product => product.id === parseInt(itemId));
            resolve(product);
        }, 500);
    });
};