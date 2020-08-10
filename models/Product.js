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
  constructor(title, imgUrl, description, price) {
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

  save() {
    this.id = Math.random().toString();
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