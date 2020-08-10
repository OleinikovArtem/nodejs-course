const Product = require('../models/Product')

// Products
exports.getIndex = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('shop/index', {
      path: '/',
      pageTitle: 'Shop',
      prods: products,
    })
  })
}

exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('shop/product-list', {
      path: '/products',
      pageTitle: 'All Products',
      prods: products,
    })
  })
}

exports.getProduct = (req, res, next) => {
  const { id } = req.params
  Product.findById(id, prod => {
    res.render('shop/product-detail', {
      path: '/product',
      pageTitle: 'Product: ' + prod.title,
      prod: prod,
    })
  })
}

// Cart
exports.getCart = (req, res, next) => {
  res.render('shop/cart', {
    path: '/cart',
    pageTitle: 'Cart',
  })
}

exports.postCart = (req, res, next) => {
  const { id } = req.body
  res.redirect('/cart')
}

// Order
exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Orders',
  })
}

// Checkout
exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout',
  })
}