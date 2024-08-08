import express from 'express';
import cors from 'cors';
import config from './config/config';

import authRouter from './routes/auth.routes';

const app = express();

app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/auth', authRouter);

app.set('port', config.port);

export default app;
