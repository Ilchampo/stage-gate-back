import express from 'express';
import cors from 'cors';
import config from './config/config';

const app = express();

app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set('port', config.port);

export default app;
