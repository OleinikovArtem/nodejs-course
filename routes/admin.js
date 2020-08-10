const express = require('express')
const router = express.Router()

const {
  getAddProducts,
  postAddProducts,
  getProducts
} = require('../controllers/admin')

// /admin/... => GET
router.get('/add-product', getAddProducts)
router.get('/products', getProducts)

// /admin/... => POST
router.post('/add-product', postAddProducts)

module.exports = router
