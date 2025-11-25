const ProductModel = require('../models/product.model');

const ProductController = {
  getAll: (req, res) => {
    const products = ProductModel.getAll();
    res.json({
      success: true,
      message: 'Daftar produk berhasil diambil',
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
      stock: stock || 0
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