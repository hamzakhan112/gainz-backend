const express = require('express');
const app = express();
const dotenv = require('dotenv').config()
const productRoute = require('./routes/product')
const userRoute = require('./routes/user')
const orderRoute = require('./routes/order')
const connectDatabase = require('./db')
const ErrorMiddleware = require('./middlewares/error')
const AsyncErrorsMiddleware = require('./middlewares/asyncErrors');
const cookieParser = require('cookie-parser');
const cors = require('cors');
//connecting to database : 
connectDatabase().then(app.listen(process.env.PORT, ()=>{
    console.log('server is running')
}))

//config :

// dotenv.config({path: "config.env"});
app.use(express.json());
app.use(cookieParser())
app.use(cors());


//routes : 

app.use('/api/products', productRoute);
app.use('/api/users', userRoute);
app.use('/api/orders', orderRoute);


//error handling :
app.use(ErrorMiddleware)
app.use(AsyncErrorsMiddleware)

