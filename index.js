const express = require('express');
const expressJSDocSwagger = require('express-jsdoc-swagger');
const authRoutes = require('./src/routers/auth.routes');
const productRoutes = require('./src/routers/product.routes');

const app = express();

const swaggerOptions = {
  info: {
    version: '1.0.0',
    title: 'API Documentation',
    description: 'API Documentation untuk User Authentication dan Product Management',
    contact: {
      name: 'Developer',
      email: 'dev@mail.com'
    }
  },
  baseDir: __dirname,
  filesPattern: './**/*.js',
  swaggerUIPath: '/api-docs',
  exposeSwaggerUI: true,
  exposeApiDocs: false,
  apiDocsPath: '/v3/api-docs',
  notRequiredAsNullable: false
};

expressJSDocSwagger(app)(swaggerOptions);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * @summary Home endpoint
 * @return {object} 200
 */
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Backend is running well'
  });
});

app.use('/auth', authRoutes);
app.use('/products', productRoutes);

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`APP running on http://localhost:${PORT}`);
  console.log(`Swagger UI available at http://localhost:${PORT}/api-docs`);
});

module.exports = app;