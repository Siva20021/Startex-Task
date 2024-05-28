import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoute from './routes/Auth.js';
import bookRoute from './routes/Books.js';
// import propertyRoute from './routes/Property.js';
import cookieParser from 'cookie-parser';
const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());
dotenv.config();
app.use('/api/auth',authRoute);
app.use('/api/book',bookRoute);
// app.use('/api/property',propertyRoute);
app.get("/",(req,res)=>{
    return res.send("Hello from Homepage");
})


app.listen(8800,()=>{
    console.log('Server is running on port 8800');
});