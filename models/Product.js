const fs = require('fs')
const path = require('path')

const productsFile = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'products.json'
)

const getProductsFromFile = (callback = () => {}) => {
  fs.readFile(productsFile, (err, fileContent) => {
    if (err) {
      return callback([])
    }
    callback(JSON.parse(fileContent))
  })
}

module.exports = class Product {
  constructor(title, imgUrl, description, price) {
    this.title = title
    this.imgUrl = imgUrl
    this.description = description
    this.price = price
  }

  static fetchAll(callBack = () => { }) {
    getProductsFromFile(callBack)
  }

  save() {
    getProductsFromFile(products => {
      products.push(this)
      fs.writeFile(
        productsFile,
        JSON.stringify(products),
        err => console.log(err)
      )
    })
  }
}