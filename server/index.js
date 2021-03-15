import express from 'express';
//import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
//Routes
import postRoutes from './routes/posts.js';


//Set up server
const app = express();
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));


//General Middleware set up
app.use(express.json({ limit: "30mb",  extended: true}));
app.use(express.urlencoded({ limit: "30mb",  extended: true}));
app.use(cors());
dotenv.config();

//Set up routes
app.use("/posts", postRoutes);

app.get('/', (req, res) => {
  res.send('Hello to Memories API');
})



//Connect to mongo DB
try {
  await mongoose.connect(process.env.MDB_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true })
} catch (error) {
  console.log(error)
}


mongoose.set('useFindAndModify', false);

