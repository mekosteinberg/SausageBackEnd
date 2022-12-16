//dependencies
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

// config
let PORT = 3000;
if(process.env.PORT){
    PORT = process.env.PORT
}

const db = mongoose.connection;
const mongodbURI = process.env.MONGODBURI;
// let database = 'sausages' #this was for localhost testing
mongoose.set('strictQuery', false);


//middleware
const app = express();
app.use(express.json());
app.use(cors({
    origin: true,
    credentials: true,
    optionsSuccessStatus: 200
}));

const store = new MongoDBStore({
    uri: process.env.MONGODBURI,
    databaseName: 'sessions',
    collection: 'mySessions'
});

store.on('error', (err) => {
    if(err){
        console.log(err);
    }
});

app.use(
    session({
        secret: process.env.SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: true,
            secure: false,
            maxAge:1000000000,
            // a week sounds reasonable i think?
            maxAge: 1000 * 60 * 60 * 24 * 7
        },
        //mongo connect session store
        store: store,
    })
);

app.use((req, res, next) => {
    console.log(req.session);
    next();
});

// app.get('/', (req, res) => {
//     res.send('hello ' + JSON.stringify(req.session));
// });

//controllers
const sausageController = require('./controllers/sausages.js');
app.use('/api/sausages', sausageController);

const authController = require('./controllers/auth.js');
app.use('/api' , authController);

//session controller route incomplete **
// const sessionController = require('./controllers/session.js');
// app.use('/session', sessionController);


app.get


app.listen(PORT, () => {
    console.log('eggs, bacon, grits...')
})

mongoose.connect(mongodbURI, () => {
    console.log('SAUSAGE! ');
});

db.on('error', (err) => console.log(err.message));
db.on('connected', () => console.log('mongo connected'));
db.on('disconnected', () => console.log('mongo disconnected'));