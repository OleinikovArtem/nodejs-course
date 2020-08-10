const express = require('express')
const router = express.Router()

// controls
const {
  getProducts,
  getProduct,
  getIndex,
  getCart,
  getCheckout,
  getOrders,
  postCart
} = require('../controllers/shop')

// Products
router.get('/', getIndex)
router.get('/products', getProducts)
router.get('/product/:id', getProduct)

// Cart
router.get('/cart', getCart)
router.post('/cart', postCart)

// Order
router.get('/orders', getOrders)

// Checkout
router.get('/checkout', getCheckout)

module.exports = router
