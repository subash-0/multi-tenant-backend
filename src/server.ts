
import express, { Request } from 'express';

import morgan from 'morgan';
import cors from 'cors';



import { protect } from './modules/auth';
import pointROuter from './routes/router';
import userRoute from './routes/user.routes';


interface CustomRequest extends Request {
  shhhh_secret?: string;
}







const app = express();


app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true})); // for parsing application/x-www-form-urlencoded e.g. form data
app.use(cors());



app.get('/', (req, res) => {
  res.send('Hello World');
});

app.use("/api/v1/user",  userRoute);
app.use('/api',protect, pointROuter);


export default app;