const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: true}))

app.listen(4000, function() {
    
})

app.post('/new', (req, res) => {
    console.log(req.body)
})