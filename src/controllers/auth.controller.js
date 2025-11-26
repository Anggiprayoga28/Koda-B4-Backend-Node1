import jwt from 'jsonwebtoken';
import UserModel from '../models/user.model.js';
import process from 'process';


const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-this';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

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
      
      const token = jwt.sign(
        { 
          id: newUser.id, 
          email: newUser.email,
          username: newUser.username 
        },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRES_IN }
      );
      
      res.status(201).json({
        success: true,
        message: 'Registrasi berhasil',
        data: {
          id: newUser.id,
          username: newUser.username,
          email: newUser.email,
          createdAt: newUser.createdAt
        },
        token
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
      
      const token = jwt.sign(
        { 
          id: user.id, 
          email: user.email,
          username: user.username 
        },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRES_IN }
      );
      
      res.json({
        success: true,
        message: 'Login berhasil',
        data: {
          id: user.id,
          username: user.username,
          email: user.email
        },
        token
      });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({
        success: false,
        message: 'Terjadi kesalahan saat login'
      });
    }
  },

  verifyToken: async (req, res) => {
    try {
      const token = req.headers.authorization?.replace('Bearer ', '');
      
      if (!token) {
        return res.status(401).json({
          success: false,
          message: 'Token tidak ditemukan'
        });
      }

      const decoded = jwt.verify(token, JWT_SECRET);
      
      res.json({
        success: true,
        message: 'Token valid',
        data: decoded
      });
    } catch (error) {
      res.status(401).json({
        success: false,
        message: error
      });
    }
  }
};

export default AuthController;