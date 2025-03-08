
import express, { NextFunction, Request } from 'express';

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
  throw new Error('Something went wrong');
});

app.use("/api/v1/user",  userRoute);
app.use('/api',protect, pointROuter);

interface Error {
  status?: number;
  message?: string;
}

interface ErrorRequest extends Request {
  error?: Error;
}

app.use((err: Error, req: ErrorRequest, res: express.Response, next: NextFunction) => {
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message || 'Internal Server Error'
    }
  });
});


export default app;