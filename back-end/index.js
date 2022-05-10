require('dotenv').config();
// server.js
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

// Router
const catalogRouter = require('./router/catalog.router');
const userRouter = require('./router/use.router');
const productRouter = require('./router/product.router');
const sliderRouter = require('./router/slider.router');
const adminRouter = require('./router/admin.router');
const cartRouter = require('./router/cart.router');
const uploadRouter = require('./router/upload.router');
const urlRouter = require('./router/url.router');
const transactionRouter = require('./router/transaction.router');
const commentsRouter = require('./router/comments.router');

// DATA
const url_DBOnline = 'mongodb+srv://mongker:S211199@gmail.com@cluster0.tpvqz.gcp.mongodb.net/db_mybooks_toan?retryWrites=true&w=majority';
const url_DB = process.env.MONGODB_URI || 'mongodb://localhost:27017/myshop';
const port = process.env.PORT || 1999;

// option mongoose
mongoose.set('useFindAndModify', false);

mongoose.connect(url_DBOnline, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }).then(
    () => {
        console.log('Database is connected');
    },
    (err) => {
        console.log('Can not connect to the database ' + err);
    },
);
const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200,
};

// app.use(cors(corsOptions));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.listen(port, function () {
    console.log('Server is running on Port:', port);
});

// Router
app.use(catalogRouter);
app.use(productRouter);
app.use(sliderRouter);
app.use(adminRouter);
app.use(userRouter);
app.use(cartRouter);
app.use(urlRouter);
app.use(transactionRouter);
app.use(commentsRouter);
app.use('/api/file', uploadRouter);
