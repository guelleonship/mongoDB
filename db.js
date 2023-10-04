// const { MongoClient } = require('mongodb');
// let dbConnection;
// exports.connectToDb = async (cb) => {
//   try {
//     const client = await MongoClient.connect('mongodb://localhost:27017/bookstore');
//     dbConnection = client.db();
//     return cb();
//   } catch (error) {
//     console.log(error);
//     return cb(error);
//   }
// };
// exports.getDb = () => dbConnection;

const { MongoClient } = require('mongodb')

let dbConnection;
let uri = 'mongodb+srv://althanileonida:110798_Bohol@cluster0.snvqjh4.mongodb.net/?retryWrites=true&w=majority'

module.exports = {
    connectToDb: (cb) => {
    
        MongoClient.connect(uri)
            .then(client => {
                dbConnection = client.db()
                return cb()
            })
            .catch(err => {
                console.log(err)
                return cb(err)
            })
    },
    getDb: () => dbConnection
}