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

const writeProductsFile = (file) => {
  fs.writeFile(
    productsFile,
    JSON.stringify(file),
    err => console.log(err)
  )
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
      const updatedProdocts = products.filter(prod => prod.id !== id)
      writeProductsFile(updatedProdocts)
    })
  }

  save() {
    getProductsFromFile(products => {
      const updatedProdocts = [...products]
      if (this.id) {
        const index = updatedProdocts.findIndex(prod => prod.id === this.id)
        updatedProdocts[index] = this
      }
      else {
        this.id = Math.random().toString();
        updatedProdocts.push(this)
      }
      writeProductsFile(updatedProdocts)
    })
  }

}