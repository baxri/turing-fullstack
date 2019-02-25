const express = require('express');
const router = express.Router();

// middlewares
const authMiddleware = require('./middlewares/auth.middleware');

// constrollers
const userController = require('./controllers/user.controller');
const productController = require('./controllers/product.controller');
const shoppingCartController = require('./controllers/shopping_cart.controller');
const PaymentController = require('./controllers/payment.controller');

// User routes
router.post('/signin/', userController.signin);
router.post('/signup/', userController.signup);
router.get('/user/', [authMiddleware], userController.user);

// Product routes
router.get('/products/', productController.products);
router.get('/products/:id', productController.product);

// ShoppingCart routes
router.get('/shopping-cart/summary', shoppingCartController.summary);
router.get('/shopping-cart/checkout', [authMiddleware], shoppingCartController.checkout);

router.post('/shopping-cart/', shoppingCartController.addToCart);
router.post('/shopping-cart/:id', shoppingCartController.updateCart);
router.post('/shopping-cart/:id/delete', shoppingCartController.deleteItem);

// Payment routes
router.post('/pay', [authMiddleware], PaymentController.pay);

module.exports = router;