const fs = require('fs')
const path = require('path')

const productsFile = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'products.json'
)

const getProductsFromFile = (callback = () => { }) => {
  fs.readFile(productsFile, (err, fileContent) => {
    if (err) {
      return callback([])
    }
    callback(JSON.parse(fileContent))
  })
}

module.exports = class Product {
  constructor({ id = null, title, imgUrl, description, price = 'write to Admin' }) {
    this.id = id
    this.title = title
    this.imgUrl = imgUrl
    this.description = description
    this.price = price
  }

  static fetchAll(callBack = () => { }) {
    getProductsFromFile(callBack)
  }

  static findById(id, callback = () => { }) {
    this.fetchAll(products => {
      const prod = products.find(prod => prod.id === id)
      callback(prod)
    })
  }

  static deleteById(id) {
    getProductsFromFile(products => {
      const updateProdocts = products.filter(prod => prod.id !== id)
      fs.writeFile(
        productsFile,
        JSON.stringify(updateProdocts),
        err => console.log(err)
      )
    })
  }

  save() {
    getProductsFromFile(products => {
      const updateProdocts = [...products]
      if (this.id) {
        const index = updateProdocts.findIndex(prod => prod.id === this.id)
        updateProdocts[index] = this
      }
      else {
        this.id = Math.random().toString();
        updateProdocts.push(this)
      }
      fs.writeFile(
        productsFile,
        JSON.stringify(updateProdocts),
        err => console.log(err)
      )
    })
  }

 
}