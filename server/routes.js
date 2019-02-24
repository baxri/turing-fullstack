const express = require('express');
const router = express.Router();

// middlewares
const authMiddleware = require('./middlewares/auth.middleware');

// constrollers
const userController = require('./controllers/user.controller');
const productController = require('./controllers/product.controller');

// User routes
router.post('/signin/', userController.signin);
router.post('/signup/', userController.signup);
router.get('/user/', [authMiddleware], userController.user);

// Product routes
router.get('/products/', productController.products);
router.get('/products/:id', productController.product);


module.exports = router;