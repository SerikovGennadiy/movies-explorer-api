/* eslint-disable no-console */
const express = require('express');
const cookieParser = require('cookie-parser');

const mongoose = require('mongoose');

const bodyParser = require('body-parser');
const helmet = require('helmet');

const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowsMs: 10 * 60 * 1000,
  max: 200,
});

const dotenv = require('dotenv');

dotenv.config();

const cors = require('cors');

const corsSet = cors({
  allowedHeaders: ['X-Requested-With', 'Content-type', 'Accept', 'Origin'],
  origin: ['http://diploma.serikov.nomoredomains.monster', 'https://diploma.serikov.nomoredomains.monster', 'http://localhost:3001'],
  methods: 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
  preflightContinue: false,
  credentials: true,
});

const router = require('./routes/index');

const centralErrorHandler = require('./middlewares/central-app-error-handler');

const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT, MONGO_URL } = require('./config');

const app = express();

app.use(requestLogger);

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(corsSet);

app.disable('x-powered-by');
app.options('*', corsSet);

app.use(limiter);
app.use(router);

app.use(errorLogger);
app.use(centralErrorHandler);

mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
},
(err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(PORT, () => {
      console.log('db connection and start app are success');
    });
  }
});
