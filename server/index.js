import  express  from "express";
import  bodyParser  from "body-parser";
import  mongoose  from "mongoose";
import  cors  from "cors";
import postRouter from './routes/posts.js';
import userRouter from './routes/user.js';
import dotenv from 'dotenv';

const app = express();
dotenv.config();

app.use(express.json({limit: '50mb'}));
app.use(cors());

app.get('/',(req,res)=>{
    res.send('Server is live');
})

app.use('/posts', postRouter);
app.use('/users', userRouter);

const PORT = process.env.PORT || 5001;
const CONNECTION_URL = 'mongodb://hadiashabbir:hadia123@ac-ncgapcw-shard-00-00.xsffphk.mongodb.net:27017,ac-ncgapcw-shard-00-01.xsffphk.mongodb.net:27017,ac-ncgapcw-shard-00-02.xsffphk.mongodb.net:27017/?ssl=true&replicaSet=atlas-1wi0u6-shard-0&authSource=admin&retryWrites=true&w=majority';
mongoose.connect(CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
.catch((error) => console.log(error.message))

// app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))