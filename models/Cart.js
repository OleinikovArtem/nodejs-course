const fs = require('fs')
const path = require('path')


const cartFile = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'cart.json'
)


module.exports = class Cart {
  static addProduct(id, productPrice) {
    fs.readFile(cartFile, (err, fileContent) => {
      let cart = { products: [], totalPrice: 0 }
      if (!err) {
        cart = JSON.parse(fileContent)
      }

      const existingProductIndex = cart.products.findIndex(prod => prod.id === id)
      const existingProduct = cart.products[existingProductIndex]
      let updateProduct

      if (existingProduct) {
        updateProduct = { ...existingProduct }
        updateProduct.qty = updateProduct.qty + 1
        cart.products = [...cart.products]
        cart.products[existingProductIndex] = updateProduct
      } else {
        updateProduct = { id: id, qty: 1 }
        cart.products = [...cart.products, updateProduct]
      }

      cart.totalPrice = Number(cart.totalPrice) + Number(productPrice)

      fs.writeFile(
        cartFile,
        JSON.stringify(cart),
        (err) => console.log(err)
      )
    })
  }

  static deleteProduct(id, productPrice) {
    fs.readFile(cartFile, (err, fileContent) => {
      if (err) return
      const cart = JSON.parse(fileContent)
      const updateCart = { ...cart }
      const product = updateCart.products.find(prod => prod.id === id)
      let updateProducts

      if (product.qty === 1) {
        updateProducts = updateCart.products.filter(prod => prod.id !== id)
      }

      if (product.qty > 1) {
        updateProducts = updateCart.products.map(prod => {
          if (prod.id === id) {
            return {
              ...prod,
              qty: prod.qty - 1
            }
          }
          return prod
        })
      }

      updateCart.totalPrice = cart.totalPrice - productPrice
      updateCart.products = updateProducts

      fs.writeFile(
        cartFile,
        JSON.stringify(cart),
        (err) => console.log(err)
      )
    })
  }
}