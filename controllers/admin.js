const Product = require('../models/Product')

exports.getAddProducts = (req, res, next) => {
  res.render('admin/add-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true
  })
}

exports.postAddProducts = (req, res, next) => {
  const { title, imgUrl, description, price } = req.body
  const product = new Product(title, imgUrl, description, price)
  product.save()
  res.redirect('/')
}


exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('admin/products', {
      path: '/admin/products',
      pageTitle: 'Admin Products',
      prods: products,
    })
  })
}