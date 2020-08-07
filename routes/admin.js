const path = require('path')

const express = require('express')

const rootDir = require('../util/path')

const router = express.Router()

const products = []
/**
 * {@param pathname} '/admin' + '/....' 
 */

router.get('/add-product', (req, res) => {
  res.render('add-product', { docTitle: 'Add product' })
})

router.post('/add-product', (req, res) => {
  products.push({ title: req.body.title })
  res.redirect('/')
})

exports.routes = router
exports.products = products