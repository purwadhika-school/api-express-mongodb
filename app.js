// Define all the dependencies
var express = require('express')
var app = express()
var mongoose = require('mongoose')
mongoose.createConnection().openUri('mongodb://localhost:27017/test')
// mongoose.connect('localhost:27017/pci-dev')
var Schema = mongoose.Schema

var userDataSchema = new Schema({
	title: {
		type: String, 
		required: true 
	},
	content: String,
	author: String
}, { collection: 'user-data' })

var UserData = mongoose.model('UserData', userDataSchema)

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies



// Some routing
app.get('/', function (req, res, next) {
  res.send('This is Home Page')
})


app.get('/get-data', function (req, res, next) {
	UserData.find()
		.then(function(doc) {
	  		res.send(doc)
	  	})
})


app.post('/insert', function (req, res, next) {
	var item = {
		title: req.body.title,
		content: req.body.content,
		author: req.body.author
	}
	console.log(item)

	var data = new UserData(item)
	data.save()

	res.redirect('/')
})


app.post('/update', function (req, res, next) {
	var item = {
		title: req.body.title,
		content: req.body.content,
		author: req.body.author
	}
	var id = req.body.id

	UserData.findById(id, function(err, doc){
		if (err){
			console.log('error, no data found')
		} 

		doc.title = req.body.title
		doc.content = req.body.content
		doc.author = req.body.author
		doc.save()
		res.redirect('/')
	})
})


app.post('/delete', function (req, res, next) {
	var id = req.body.id
	UserData.findByIdAndRemove(id).exec()
	res.redirect('/')
})




// Run the server
app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})