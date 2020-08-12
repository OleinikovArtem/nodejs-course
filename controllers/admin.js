const Product = require('../models/product')

// GET
exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false
  })
}

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit
  if (!editMode) {
    return res.redirect('/')
  }
  const prodId = req.params.productId
  req.user.getProducts({ where: { id: prodId } })
    .then(products => {
      const product = products[0]
      if (!product) {
        return res.redirect('/')
      }
      res.render('admin/edit-product', {
        pageTitle: 'Edit Product',
        path: '/admin/edit-product',
        editing: editMode,
        product: product
      })
    })
    .catch(console.log)
}

exports.getProducts = (req, res, next) => {
  req.user
    .getProducts()
    .then(products => {
      res.render('admin/products', {
        prods: products,
        pageTitle: 'Admin Products',
        path: '/admin/products'
      })
    })
    .catch(err => console.log(err))

}

// POST
exports.postAddProduct = (req, res, next) => {
  const { title, imageUrl, price, description } = req.body
  req.user.createProduct({
    title,
    price,
    imageUrl,
    description,
  })
    .then(result => {
      console.log('Created Product completed!')
      res.redirect('/')
    })
    .catch(console.log)
}

exports.postEditProduct = (req, res, next) => {
  const { productId, title, price, imageUrl, description } = req.body
  Product.findByPk(productId)
    .then(prod => {
      prod.title = title
      prod.price = price
      prod.description = description
      prod.imageUrl = imageUrl
      return prod.save()
    })
    .then(result => {
      console.log('Update Product ')
      res.redirect('/admin/products')
    })
    .catch(console.log)
}

exports.postDeleteProduct = (req, res, next) => {
  const { productId } = req.body
  Product.findByPk(productId)
    .then(product => {
      return product.destroy()
    })
    .then(result => {
      console.log('Product is deleted')
      res.redirect('/admin/products')
    })
    .catch(console.log)
}
