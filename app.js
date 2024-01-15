const express = require('express');
const app = express();
const bodyParser=require('body-parser');
const router = require('./src/router');
const path = require('path');
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/file', router);

app.listen(8081, () => {
    console.log('Server Start on Port 8081');
})

