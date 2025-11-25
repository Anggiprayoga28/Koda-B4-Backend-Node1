const express = require('express');
const mainRoutes = require('./src/routers/routes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Backend is running well'
  });
});

app.use('/api', mainRoutes);

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`APP running on http://localhost:${PORT}`);
});

module.exports = app;
