const express = require('express')
const app = express()
const auth = require('express-basic-auth')

const config = require('./config')

app.use(express.static("public"))
app.set('view engine', 'pug')

const links = {
	g: "http://google.com/",
	home: "http://tgrehawi.com/"
}

app.get('/', function(req, res) {
	res.redirect("/dashboard/")
})

app.get('/dashboard/', auth(config.auth), function(res, req, next) {
	req.render('dashboard')
})

app.get('/:name', function(req, res, next) {
	var redirect = links[req.params.name]
	if (redirect) {
		res.redirect(redirect);
	}
	else {
		next()
	}	
})

app.listen(config.listen.port, config.listen.address)