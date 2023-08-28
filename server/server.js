import dotenv from 'dotenv';
dotenv.config({ path: './config.env' });

import express from 'express';

import connectDB from './config/db.js';
import morgan from 'morgan';
import authRoute from './routes/authRoute.js'

import categoryRoute from './routes/categoryRoute.js'
import productRoute from './routes/product_Routes.js'

import cors from 'cors'


console.log("merchan id", process.env.BRAINTREE_MERCHANT_ID, process.env.BRAINTREE_PUBLIC_KEY,
    process.env.BRAINTREE_PRIVATE_KEY);


connectDB();

const app = express();

// midlerwares
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

// routes

app.use('/api/v1/auth', authRoute);
app.use('/api/v1/category', categoryRoute);
app.use('/api/v1/product', productRoute);
const port = process.env.PORT || 5000;

const server = app.listen(port, () => {
    console.log(` app running on ${port}`);
});



//401 unathorized access
//404 req seccessful but document didn't found there
//200 ok req
//500 server internal problems