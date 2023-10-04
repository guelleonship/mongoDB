// const express = require('express');
// const { getDb, connectToDb } = require('./db')

// //init app & middleware
// const app = express();

// //db connection
// let db

// connectToDb((err) => {
//     if (!err) {
//         app.listen('3000', () => {
//             console.log('app listening on port 3000');
//         })
//         db = getDb()
//     }
// })

// //routes
// app.get('/books', (req, res) => {

//     //finding documents of the collection
//     let books = []

//     db.collection('books')
//         .find() //returns an object that points to a set of documents called a cursor. Should be used with a cursor method (toArray or forEach)
//         .sort({author: 1})
//         .forEach(book => books.push(book))
//         .then(() => {
//             res.status(200).json(books)
//         })
//         .catch (() => {
//             res.status(500).json({error: 'Could not fetch the documents'})
//         })
// })

// // app.listen(3000, () => {
// //     console.log('app listening on port 3000');
// })

const express = require('express')
const { getDb, connectToDb } = require('./db')
const { ObjectId } = require('mongodb')

// init app & middleware
const app = express()

// db connection
let db

connectToDb((err) => {
    if (!err) {
        app.listen('3000', () => {
            console.log('app listening on port 3000')
        })
        db = getDb()
    }
})

// routes
app.get('/books', (req, res) => {
    let books = []

    db.collection('books')
        .find()
        .sort({ author: 1 })
        .forEach(book => books.push(book))
        .then(() => {
            res.status(200).json(books)
        })
        .catch(() => {
            res.status(500).json({ error: 'Could not fetch the documents' })
        })
})

app.get('/books/:id', (req, res) => {

    if (ObjectId.isValid(req.params.id)) { //this validates whether the id used is exisiting or not
        db.collection('books')
            .findOne({ _id: new ObjectId(req.params.id) })
            .then(doc => {
                res.status(200).json(doc)
            })
            .catch(err => {
                res.status(500).json({ error: 'Coud not fetch document' })
            })
    } else {
        res.status(500).json({error: 'Not a valid ID'})
    }
})