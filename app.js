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
  origin: [/* 'http://mestory.students.nomoredomains.icu', 'https://mestory.students.nomoredomains.icu', */'http://localhost:3000'],
  methods: 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
  preflightContinue: false,
  credentials: true,
});

const router = require('./routes/index');
const errorHandler = require('./middlewares/central-error-handler');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(corsSet);

app.use(helmet());
app.disable('x-powered-by');

app.options('*', corsSet);

app.use(limiter);

app.use(router);
app.use(errorHandler);

const { PORT = 3001 } = process.env;

mongoose.connect('mongodb://localhost:27017/bitfilmsdb', {
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
