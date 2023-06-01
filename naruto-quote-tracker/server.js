console.log('Naruto Quotes')

const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient
const PORT = 3000
require('dotenv').config()

let db, 
    connectionString = process.env.DB_STRING
    
MongoClient.connect(connectionString, { useUnifiedTopology: true })
.then(client => {
  console.log('Connected to Database')
  db = client.db('naruto-quotes')
})

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
app.use(express.json())


app.get('/', (req, res) => {
  db.collection('quotes').find().toArray()
      .then(results => {
        res.render('index.ejs', {quotes: results})
      })
      .catch(error => console.error(error))
})

app.post('/quotes', (req, res) => {
    db.collection('quotes').insertOne(req.body)
      .then(result => {
        res.redirect('/')
      })
      .catch(error => console.error(error))
})

app.put('/quotes', (req, res) =>{
  db.collection('quotes').findOneAndUpdate(
    {name: 'Sasuke'},
    {
      $set: {
        name: req.body.name,
        quote: req.body.quote
      }
    },
    {
      upsert: true
    }
  )
    .then(result => {
      console.log(result)
      res.json('Success')
    })
    .catch(error => console.error(error))
})

app.delete('/quotes', (req, res) => {
  console.log(req)
  db.collection('quotes').deleteOne(
    {name: req.body.name}
  )
  .then(result => {
    if(result.deletedCount === 0) {
      return res.json('No quote to delete')
    }
    res.json('Deleted quote')
  })
  .catch(error => console.error(error))
})

app.delete('/deleteQuote', (req, res) =>{
  db.collection('quotes').deleteOne({name: req.body.name})
  .then(result =>{
    console.log('Quote Deleted')
    res.json('Quote Deleted')
  })
  .catch(err => console.error(err))
})

app.listen(process.env.PORT || PORT, function(){
    console.log(`The server is running on PORT 3000! Believe it!`)
})