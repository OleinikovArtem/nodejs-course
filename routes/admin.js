const express = require('express')
const router = express.Router()

const {
  getProducts,
  getAddProducts,
  getEditProducts,
  postAddProducts,
  postEditProducts,
  postDeleteProduct
} = require('../controllers/admin')

// /admin/... => GET
router.get('/add-product', getAddProducts)
router.get('/edit-product/:id', getEditProducts)
router.get('/products', getProducts)

// /admin/... => POST
router.post('/add-product', postAddProducts)
router.post('/edit-product', postEditProducts)
router.post('/deleted-product', postDeleteProduct)

module.exports = router
