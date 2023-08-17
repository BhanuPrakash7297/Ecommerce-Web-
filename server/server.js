
import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import morgan from 'morgan';

dotenv.config({ path: './config.env' });

connectDB();

const app = express();

app.use(express.json());
app.use(morgan("dev"));


const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
    console.log(` app running on ${port}`);
});



