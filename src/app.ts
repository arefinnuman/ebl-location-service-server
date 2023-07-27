import cors from 'cors';
import express from 'express';
import globalErrorHandler from './app/middleWares/globalError';
import { notFoundHandler } from './app/middleWares/notFound';
import routes from './app/routes/routes';

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('EBL Location Tracking Service');
});

app.use('/api/v1/', routes);

app.use(globalErrorHandler);

app.use(notFoundHandler);

export default app;
