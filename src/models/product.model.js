let products = [
  {
    id: 1,
    name: "Asus ROG",
    description: "Laptop gaming dengan spesifikasi tinggi",
    price: 15000000,
    stock: 10,
    createdAt: new Date("2025-11-1")
  },
  {
    id: 2,
    name: "Mackbook Air",
    description: "Laptop luar biasa, tipis dan cepat untuk bekerja, bermain, dan berkarya di mana saja.",
    price: 750000,
    stock: 25,
    createdAt: new Date("2025-11-02")
  },
  {
    id: 3,
    name: "Acer Predator",
    description: "Merek lini perangkat keras komputer dari Acer yang dirancang khusus untuk para gamer dan kreator konten",
    price: 1200000,
    stock: 15,
    createdAt: new Date("2025-11-03")
  },
  {
    id: 4,
    name: "Lenovo Legion",
    description: "Seri laptop gaming yang dirancang untuk performa tinggi, menawarkan kombinasi prosesor kuat (AMD Ryzen atau Intel Core), grafis diskrit (NVIDIA GeForce RTX), dan sistem pendingin canggih seperti Legion Coldfront untuk menjaga suhu saat beban berat",
    price: 2500000,
    stock: 8,
    createdAt: new Date("2025-11-04")
  },
  {
    id: 5,
    name: "Thinkpad",
    description: "lini laptop dari Lenovo yang dirancang untuk profesional dengan fokus pada kinerja tinggi, daya tahan ekstrem, dan fitur keamanan",
    price: 850000,
    stock: 20,
    createdAt: new Date("2025-11-05")
  }
];
let productIdCounter = 6;

const ProductModel = {
  create: (productData) => {
    const newProduct = {
      id: productIdCounter++,
      ...productData,
      createdAt: new Date()
    };
    products.push(newProduct);
    return newProduct;
  },

  findById: (id) => {
    return products.find(p => p.id === parseInt(id));
  },

  getAll: () => {
    return products;
  },

  update: (id, productData) => {
    const index = products.findIndex(p => p.id === parseInt(id));
    if (index === -1) return null;

    products[index] = {
      ...products[index],
      ...productData
    };
    return products[index];
  },

  delete: (id) => {
    const index = products.findIndex(p => p.id === parseInt(id));
    if (index === -1) return false;

    products.splice(index, 1);
    return true;
  }
};

module.exports = ProductModel;