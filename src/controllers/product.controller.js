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
    
    res.json({
      success: true,
      message: 'Produk berhasil diambil',
      data: product
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
    
    res.status(201).json({
      success: true,
      message: 'Produk berhasil dibuat',
      data: newProduct
    });
  },

  update: (req, res) => {
    const { name, description, price, stock } = req.body;
    
    const updatedProduct = ProductModel.update(req.params.id, {
      name,
      description,
      price: price ? parseFloat(price) : undefined,
      stock
    });

    if (req.file) {
      updateData.image = `/uploads/${req.file.filename}`;
    }
    
    if (!updatedProduct) {
      return res.status(404).json({ 
        success: false,
        message: 'Produk tidak ditemukan' 
      });
    }
    
    res.json({
      success: true,
      message: 'Produk berhasil diupdate',
      data: updatedProduct
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