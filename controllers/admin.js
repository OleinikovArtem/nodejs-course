const Product = require('../models/Product')

// GET

exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('admin/products', {
      path: '/admin/products',
      pageTitle: 'Admin Products',
      prods: products,
    })
  })
}

exports.getAddProducts = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false,
    product: null
  })
}

exports.getEditProducts = (req, res, next) => {
  const { id } = req.params
  Product.findById(id, product => {
    if (!product) return res.redirect('/admin/products')
    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      editing: true,
      product,
    })
  })
}

// POST
exports.postAddProducts = (req, res, next) => {
  const { title, imgUrl, description, price } = req.body
  const product = new Product({ title, imgUrl, description, price })
  product.save()
  res.redirect('products')
}

exports.postEditProducts = (req, res, next) => {
  const { id = null, title, imgUrl, description, price } = req.body
  const product = new Product({ id, title, imgUrl, description, price })
  product.save()
  res.redirect('products')
}

exports.postDeleteProduct = (req, res, next) => {
  const { id } = req.body
  Product.deleteById(id)
  res.redirect('products')
}