var path = require('path')
const express = require('express')
/*const mockAPIResponse = require('./mockAPI.js')*/
projectData = {};

const app = express()

app.use(express.static('dist'))

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const cors = require('cors');
app.use(cors());

console.log(__dirname)

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})

// designates what port the app will listen to for incoming requests
app.listen(8080, function () {
    console.log('Example app listening on port 8080!')
})

app.get('/gather', function (req, res) {
    res.send(projectData)
})

app.post('/add', function(req, res) {
    projectData.name = req.body.name;
    projectData.city = req.body.city;
    projectData.country = req.body.country;
})
