const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const uri = "mongodb+srv://artem:ThkkHvGezwespbIZ@cluster0-22sql.mongodb.net/shop?retryWrites=true&w=majority";


const mongoConnect = callback => {
  MongoClient.connect(uri)
    .then(client => {
      console.log('Connected!');
      callback(client);
    })
    .catch(err => {
      console.log(err);
    });
};

module.exports = mongoConnect;
