import ProductModel from '../models/product.model.js';

const ProductController = {
  getAll: async (req, res) => {
    try {
      const { search, minPrice, maxPrice, sortBy, order } = req.query;
      
      const products = await ProductModel.getAll({
        search,
        minPrice,
        maxPrice,
        sortBy,
        order
      });
      
      const productsWithUrls = products.map(p => ({
        ...p,
        imageUrl: p.image ? `${req.protocol}://${req.get('host')}${p.image}` : null
      }));
      
      res.json({
        success: true,
        message: 'Daftar produk berhasil diambil',
        total: productsWithUrls.length,
        data: productsWithUrls
      });
    } catch (error) {
      console.error('Get all products error:', error);
      res.status(500).json({
        success: false,
        message: 'Terjadi kesalahan saat mengambil data produk'
      });
    }
  },

  getById: async (req, res) => {
    try {
      const product = await ProductModel.findById(req.params.id);
      
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
    } catch (error) {
      console.error('Get product by ID error:', error);
      res.status(500).json({
        success: false,
        message: 'Terjadi kesalahan saat mengambil data produk'
      });
    }
  },

  create: async (req, res) => {
    try {
      const { name, description, price, stock } = req.body;
      
      const newProduct = await ProductModel.create({
        name,
        description: description || '',
        price: parseFloat(price),
        stock: stock ? parseInt(stock) : 0,
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
    } catch (error) {
      console.error('Create product error:', error);
      res.status(500).json({
        success: false,
        message: 'Terjadi kesalahan saat membuat produk'
      });
    }
  },

  update: async (req, res) => {
    try {
      const { name, description, price, stock } = req.body;
      
      const updateData = {};
      if (name !== undefined) updateData.name = name;
      if (description !== undefined) updateData.description = description;
      if (price !== undefined) updateData.price = parseFloat(price);
      if (stock !== undefined) updateData.stock = parseInt(stock);
      if (req.file) updateData.image = `/uploads/${req.file.filename}`;
      
      const updatedProduct = await ProductModel.update(req.params.id, updateData);
      
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
    } catch (error) {
      console.error('Update product error:', error);
      res.status(500).json({
        success: false,
        message: 'Terjadi kesalahan saat mengupdate produk'
      });
    }
  },

  delete: async (req, res) => {
    try {
      const deleted = await ProductModel.delete(req.params.id);
      
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
    } catch (error) {
      console.error('Delete product error:', error);
      res.status(500).json({
        success: false,
        message: 'Terjadi kesalahan saat menghapus produk'
      });
    }
  }
};

export default ProductController;