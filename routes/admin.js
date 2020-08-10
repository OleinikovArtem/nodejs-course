const express = require('express')

const { getAddProducts, postAddProducts, getProducts } = require('../controllers/admin')

const router = express.Router()

// /admin/... => GET
router.get('/add-product', getAddProducts)
router.get('/products', getProducts)

// /admin/... => POST
router.post('/add-product', postAddProducts)

module.exports = router
