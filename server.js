const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const colors = require('colors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const rateLimit = require('express-rate-limit');


dotenv.config();
const userRoutes = require('./routes/userRoutes')
const blogRoutes = require('./routes/blogRoutes')
connectDB();

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later.',
  });


const app = express();

app.use(limiter);
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use('/api/v1/user', userRoutes);
app.use('/api/v1/blogs', blogRoutes);
const PORT = process.env.PORT || 8080
app.listen(PORT,()=>{
    console.log(`Node server listening on port ${PORT}`.bgCyan.white)
})
