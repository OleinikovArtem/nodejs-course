const fs = require('fs')
const path = require('path')

const productsFile = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'products.json'
)

const getProductsFromFile = (callback) => {
  fs.readFile(productsFile, (err, fileContent) => {
    if (err) callback([])
    callback(JSON.parse(fileContent))
  })
}


module.exports = class Product {
  constructor(title) {
    this.title = title
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