import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import { errorHandler, NotFoundError } from './common';
import { currentUser } from './common'
import { authRouter } from './routes/user';
import { adminRouter } from './routes/admin';
import { workerRouter } from './routes/worker';
import { superRouter } from './routes/super';

const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    // secure: process.env.NODE_ENV !== 'test',
    secure: false,
  })
);

app.use(currentUser);
app.use('/auth', authRouter);
app.use('/auth', adminRouter);
app.use('/auth', workerRouter);
app.use('/auth', superRouter);

app.all('*', async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
