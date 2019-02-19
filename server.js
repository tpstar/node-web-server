const express = require('express')
const hbs = require('hbs')
const fs = require('fs')

var app = express()

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');


app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`
  console.log(log)
  fs.appendFileSync('server.log', log + '\n')
  next()
})

app.use((req, res) => {
  res.render('maintenance.hbs')
})

app.use(express.static(__dirname + '/public')) // in a browser http://localhost:3000/help.html

hbs.registerHelper('getCurrentYear', () => 'new Date().getFullYear()')
hbs.registerHelper('screamIt', (text) => text.toUpperCase())

app.get('/', (req, res) => {
  // res.send('<h1>Hello Express!!</h1>')
  res.render('home.hbs', {
    pageTitle: 'Home page',
    welcomeMessage: 'Welcome to my page'
  })
})

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About page',
  })
})

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to handle request'
  })
})

app.listen(3000, () => console.log('## Server is up'))
