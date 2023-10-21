const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.port;
const cors=require('cors')
// JSON convert and process
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
// database connection
require('./DB/DBconnection')


app.use('/api', require('./Apis/Api'))
app.use('/uploads', express.static('./uploads'));

app.listen(port , ()=>{
    console.log(`app is running on "http://localhost:${port}"`)
})