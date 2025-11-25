let users = [
  {
    id: 1,
    username: "admin",
    email: "admin@gmail.com",
    password: "admin123",
    createdAt: new Date("2025-11-25")
  },
  {
    id: 2,
    username: "anggi",
    email: "anggi@gmail.com",
    password: "anggi123",
    createdAt: new Date("2025-11-25")
  },
  {
    id: 3,
    username: "prayoga",
    email: "prayoga@gmail.com",
    password: "prayoga123",
    createdAt: new Date("2025-11-25")
  }
];
let userIdCounter = 4;

const UserModel = {
  create: (userData) => {
    const newUser = {
      id: userIdCounter++,
      ...userData,
      createdAt: new Date()
    };
    users.push(newUser);
    return newUser;
  },

  findByEmail: (email) => {
    return users.find(u => u.email === email);
  },

  getAll: () => {
    return users;
  }
};

module.exports = UserModel;