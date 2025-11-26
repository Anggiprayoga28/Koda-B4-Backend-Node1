import express from 'express';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import expressJSDocSwagger from 'express-jsdoc-swagger';
import authRoutes from './src/routers/auth.routes.js';
import productRoutes from './src/routers/product.routes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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

app.use('/uploads', express.static(join(__dirname, 'uploads')));

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

export default app;