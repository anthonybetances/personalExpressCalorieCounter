const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
const password = 'caloriepw'
// let calorieLimit =

var db, collection;

const url = `mongodb+srv://anthonybetances:${password}@calories-0qvus.mongodb.net/test?retryWrites=true&w=majority`;
const dbName = "personalExpress";

app.listen(3000, () => {
    MongoClient.connect(url, { useNewUrlParser: true }, (error, client) => {
        if(error) {
            throw error;
        }
        db = client.db(dbName);
        console.log("Connected to `" + dbName + "`!");
    });
});

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static('public'))

app.get('/', (req, res) => {
  //console.log(db)
  db.collection('calorieTracker').find().toArray((err, result) => {
    if (err) return console.log(err)
    res.render('index.ejs', {messages: result})
  })
})

//makes a new post, which makes new document object in database
app.post('/messages', (req, res) => {
  //console.log(req.body.word)
  let food = req.body.food
  let calories = req.body.calories
  //below should be equation that adds all the foods and compares it to the hard-coded variable calorieLimit
  // let wordReversed = word.split('').reverse().join('')
  // let isPalindrome = false
  // if (word === wordReversed){
  //   isPalindrome = true
  // }

  console.log(calories)
  db.collection('calorieTracker').save({food: food, calories: calories}, (err, result) => {
    if (err) return console.log(err)
    console.log('saved to database')
    res.redirect('/')
  })

})


//updates the post
app.put('/messages', (req, res) => {
  db.collection('calorieTracker')
  .findOneAndUpdate({name: req.body.name, msg: req.body.msg}, {
    $set: {
      thumbUp:req.body.thumbUp + 1
    }
  }, {
    sort: {_id: -1},
    upsert: true
  }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  })
})

app.put('/messagesAlt', (req, res) => {
  db.collection('calorieTracker')
  .findOneAndUpdate({name: req.body.name, msg: req.body.msg}, {
    $set: {
      thumbUp:req.body.thumbUp - 1
    }
  }, {
    sort: {_id: -1},
    upsert: true
  }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  })
})

app.delete('/messages', (req, res) => {
  let food = req.body.food
  let calories = req.body.calories
  db.collection('calorieTracker').findOneAndDelete({food: food, calories: calories}, (err, result) => {
    if (err) return res.send(500, err)
    res.send('Message deleted!')
  })
})
