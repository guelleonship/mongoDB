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
app.use(express.json())

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
    
    //current page
    const page = req.query.p || 0
    const booksPerPage = 3
    
    let books = []

    db.collection('books')
        .find()
        .sort({ author: 1 })
        .skip(page * booksPerPage)
        .limit(booksPerPage)
        .forEach(book => books.push(book))
        .then(() => {
            res.status(200).json(books)
        })
        .catch(() => {
            res.status(500).json({ error: 'Could not fetch the documents' })
        })
})


//finds and returns a single document
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


//inserting document
app.post('/books',(req,res) => {
    const book = req.body

    db.collection('books')
    .insertOne(book)
    .then(result => {
        res.status(201).json(result)
    })
    .catch(err => {
        res.status(500).json({err: 'Could not create a new document'})
    })

})


//deleting document
app.delete('/books/:id', (req,res) => {
   
    if (ObjectId.isValid(req.params.id)) { //this validates whether the id used is exisiting or not
        db.collection('books')
            .deleteOne({ _id: new ObjectId(req.params.id) })
            .then(result => {
                res.status(200).json(result)
            })
            .catch(err => {
                res.status(500).json({ error: 'Could not delete document' })
            })
    } else {
        res.status(500).json({error: 'Not a valid ID'})
    }
})

//updating fields in a document
app.patch('/books/:id', (req,res) => {
    
    const updates = req.body
    
    if (ObjectId.isValid(req.params.id)) { //this validates whether the id used is exisiting or not
        db.collection('books')
            .updateOne({ _id: new ObjectId(req.params.id) }, {$set: updates})
            .then(result => {
                res.status(200).json(result)
            })
            .catch(err => {
                res.status(500).json({ error: 'Could not delete document' })
            })
    } else {
        res.status(500).json({error: 'Not a valid ID'})
    }
})