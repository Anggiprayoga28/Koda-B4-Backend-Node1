const UserModel = require('../models/auth.model');

const AuthController = {
  register: (req, res) => {
    const { username, email, password } = req.body;
    
    if (!username || !email || !password) {
      return res.status(400).json({ 
        success: false,
        message: 'Semua field harus diisi' 
      });
    }
    
    const existingUser = UserModel.findByEmail(email);
    if (existingUser) {
      return res.status(400).json({ 
        success: false,
        message: 'Email sudah terdaftar' 
      });
    }
    
    const newUser = UserModel.create({ username, email, password });
    
    res.status(201).json({
      success: true,
      message: 'Registrasi berhasil',
      data: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email
      }
    });
  },

  login: (req, res) => {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ 
        success: false,
        message: 'Email dan password harus diisi' 
      });
    }
    
    const user = UserModel.findByEmail(email);
    if (!user || user.password !== password) {
      return res.status(401).json({ 
        success: false,
        message: 'Email atau password salah' 
      });
    }
    
    res.json({
      success: true,
      message: 'Login berhasil',
      data: {
        id: user.id,
        username: user.username,
        email: user.email
      }
    });
  }
};

module.exports = AuthController;