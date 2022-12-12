//dependencies
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
// const session = require('express-session');
// const MongoDBStore = require('connect-mongodb-session')(session);

// config
let PORT = 3000;
if(process.env.PORT){
    PORT = process.env.PORT
}

const db = mongoose.connection;
const mongodbURI = process.env.MONGODBURI;
// let database = 'sausages'
mongoose.set('strictQuery', false);


//middleware
const app = express();
app.use(express.json());
app.use(cors());

// const store = new MongoDBStore({
//     uri: process.env.MONGODBURI,
//     databaseName: 'session_test',
//     collectio9ns: 'mySessions'
// }, (error) => {
//     // console.log('store error: ' + error);
// });

// store.on('error', (error) => {
//     console.log(error);
// });

// app.use(
//     session({
//         secret: process.env.SECRET,
//         store: store,
//         resave: false,
//         saveUninitialized: false
//     })
// )

//controllers
const sausageController = require('./controllers/sausages.js');
app.use('/api/sausages', sausageController);

const authController = require('./controllers/auth.js');
app.use('/api' , authController);


app.listen(PORT, () => {
    console.log('eggs, bacon, grits...')
})

mongoose.connect(mongodbURI, () => {
    console.log('SAUSAGE! ');
});

db.on('error', (err) => console.log(err.message));
db.on('connected', () => console.log('mongo connected'));
db.on('disconnected', () => console.log('mongo disconnected'));