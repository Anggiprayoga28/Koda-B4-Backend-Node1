import { body, validationResult } from 'express-validator';

const registerValidation = [
  body('username')
    .trim()
    .notEmpty()
    .withMessage('Username harus diisi')
    .isLength({ min: 5, max: 30 })
    .withMessage('Username harus antara 5-30 karakter')
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage('Username hanya boleh mengandung huruf, angka, dan underscore'),

  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email harus diisi')
    .isEmail()
    .withMessage('Format email tidak valid')
    .normalizeEmail(),

  body('password')
    .notEmpty()
    .withMessage('Password harus diisi')
    .isLength({ min: 8 })
    .withMessage('Password minimal 8 karakter')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('Password harus mengandung huruf besar, huruf kecil, dan angka'),
];

const loginValidation = [
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email harus diisi')
    .isEmail()
    .withMessage('Format email tidak valid')
    .normalizeEmail(),

  body('password')
    .notEmpty()
    .withMessage('Password harus diisi'),
];

const validate = (req, res, next) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validasi gagal',
      errors: errors.array().map(err => ({
        field: err.path,
        message: err.msg
      }))
    });
  }
  
  next();
};

export {
  registerValidation,
  loginValidation,
  validate
};

export default {
  registerValidation,
  loginValidation,
  validate
};