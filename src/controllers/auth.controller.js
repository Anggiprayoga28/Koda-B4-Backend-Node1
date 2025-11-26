import UserModel from '../models/user.model.js';

const AuthController = {
  register: async (req, res) => {
    try {
      const { username, email, password } = req.body;
      
      const existingEmail = await UserModel.findByEmail(email);
      if (existingEmail) {
        return res.status(400).json({ 
          success: false,
          message: 'Email sudah terdaftar' 
        });
      }
      
      const existingUsername = await UserModel.findByUsername(username);
      if (existingUsername) {
        return res.status(400).json({ 
          success: false,
          message: 'Username sudah terdaftar' 
        });
      }
      
      const newUser = await UserModel.create({ username, email, password });
      
      res.status(201).json({
        success: true,
        message: 'Registrasi berhasil',
        data: {
          id: newUser.id,
          username: newUser.username,
          email: newUser.email,
          createdAt: newUser.createdAt
        }
      });
    } catch (error) {
      console.error('Register error:', error);
      res.status(500).json({
        success: false,
        message: 'Terjadi kesalahan saat registrasi'
      });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      
      const user = await UserModel.findByEmail(email);
      if (!user) {
        return res.status(401).json({ 
          success: false,
          message: 'Email atau password salah' 
        });
      }
      
      const isPasswordValid = await UserModel.verifyPassword(password, user.password);
      if (!isPasswordValid) {
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
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({
        success: false,
        message: 'Terjadi kesalahan saat login'
      });
    }
  }
};

export default AuthController;