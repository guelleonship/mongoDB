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

module.exports = {
    connectToDb: (cb) => {
        // const uri =  'mongodb://localhost:27017/bookstore';

        // const client = new MongoClient(uri);

        // client.connect()
        // .then(() => {
        //     dbConnection = client.db();
        //     return cb();
        // })
        // .catch((err) => {
        //     console.error('Error connecting to MongoDB:', err);
        //     return cb(err);
        // });
        MongoClient.connect('mongodb://127.0.0.1:27017/bookstore')
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