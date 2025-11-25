const ProductModel = require('../models/product.model');

const ProductController = {
  getAll: (req, res) => {
    const { search, minPrice, maxPrice, sortBy, order } = req.query;
    
    let products = ProductModel.getAll();
    
    if (search) {
      products = products.filter(p => 
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase())
      );
    }
    
    if (minPrice) {
      products = products.filter(p => p.price >= parseFloat(minPrice));
    }
    
    if (maxPrice) {
      products = products.filter(p => p.price <= parseFloat(maxPrice));
    }
    
    if (sortBy) {
      products.sort((a, b) => {
        const orderMultiplier = order === 'desc' ? -1 : 1;
        
        if (sortBy === 'name') {
          return orderMultiplier * a.name.localeCompare(b.name);
        } else if (sortBy === 'price') {
          return orderMultiplier * (a.price - b.price);
        } else if (sortBy === 'stock') {
          return orderMultiplier * (a.stock - b.stock);
        } else if (sortBy === 'createdAt') {
          return orderMultiplier * (new Date(a.createdAt) - new Date(b.createdAt));
        }
        return 0;
      });
    }
    
    products = products.map(p => ({
      ...p,
      imageUrl: p.image ? `${req.protocol}://${req.get('host')}${p.image}` : null
    }));
    
    res.json({
      success: true,
      message: 'Daftar produk berhasil diambil',
      total: products.length,
      data: products
    });
  },

  getById: (req, res) => {
    const product = ProductModel.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({ 
        success: false,
        message: 'Produk tidak ditemukan' 
      });
    }
    
    const productWithUrl = {
      ...product,
      imageUrl: product.image ? `${req.protocol}://${req.get('host')}${product.image}` : null
    };
    
    res.json({
      success: true,
      message: 'Produk berhasil diambil',
      data: productWithUrl
    });
  },

  create: (req, res) => {
    const { name, description, price, stock } = req.body;
    
    if (!name || !price) {
      return res.status(400).json({ 
        success: false,
        message: 'Nama dan harga produk harus diisi' 
      });
    }
    
    const newProduct = ProductModel.create({
      name,
      description: description || '',
      price: parseFloat(price),
      stock: stock || 0,
      image: req.file ? `/uploads/${req.file.filename}` : null
    });
    
    const productWithUrl = {
      ...newProduct,
      imageUrl: newProduct.image ? `${req.protocol}://${req.get('host')}${newProduct.image}` : null
    };
    
    res.status(201).json({
      success: true,
      message: 'Produk berhasil dibuat',
      data: productWithUrl
    });
  },

  update: (req, res) => {
    const { name, description, price, stock } = req.body;
    
    const updateData = {
      name,
      description,
      price: price ? parseFloat(price) : undefined,
      stock,
      image: req.file ? `/uploads/${req.file.filename}` : undefined
    };
    
    const updatedProduct = ProductModel.update(req.params.id, updateData);
    
    if (!updatedProduct) {
      return res.status(404).json({ 
        success: false,
        message: 'Produk tidak ditemukan' 
      });
    }
    
    const productWithUrl = {
      ...updatedProduct,
      imageUrl: updatedProduct.image ? `${req.protocol}://${req.get('host')}${updatedProduct.image}` : null
    };
    
    res.json({
      success: true,
      message: 'Produk berhasil diupdate',
      data: productWithUrl
    });
  },

  delete: (req, res) => {
    const deleted = ProductModel.delete(req.params.id);
    
    if (!deleted) {
      return res.status(404).json({ 
        success: false,
        message: 'Produk tidak ditemukan' 
      });
    }
    
    res.json({
      success: true,
      message: 'Produk berhasil dihapus'
    });
  }
};

module.exports = ProductController;