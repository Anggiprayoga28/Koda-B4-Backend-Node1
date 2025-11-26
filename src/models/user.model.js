import {prisma} from '../lib/prisma.js';
import { hash, compare } from 'bcrypt';

const UserModel = {
  create: async (userData) => {
    const hashedPassword = await hash(userData.password, 10);
    
    const newUser = await prisma.user.create({
      data: {
        username: userData.username,
        email: userData.email,
        password: hashedPassword
      }
    });
    
    return newUser;
  },

  findByEmail: async (email) => {
    return await prisma.user.findUnique({
      where: { email }
    });
  },

  findByUsername: async (username) => {
    return await prisma.user.findUnique({
      where: { username }
    });
  },

  findById: async (id) => {
    return await prisma.user.findUnique({
      where: { id: parseInt(id) }
    });
  },

  getAll: async () => {
    return await prisma.user.findMany({
      select: {
        id: true,
        username: true,
        email: true,
        createdAt: true,
        updatedAt: true
      }
    });
  },

  verifyPassword: async (plainPassword, hashedPassword) => {
    return await compare(plainPassword, hashedPassword);
  }
};

export default UserModel;