import express from 'express';
import bodyParser from 'body-parser';
import 'dotenv/config'
import ejs from 'ejs';
import homePage from './controllers/home/controller.js';
import contactRoute from './routes/contact/routes.js';
import msgRoute from './routes/message/routes.js';
import libraryRoute from './routes/library/routes.js';
import dbconnect from './database/db.js';
import groupRoute from './routes/group/routes.js';
import homeRoute from './routes/home/routes.js';
dbconnect()
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB', err);
  });

const app = express();

app.set("view engine", "ejs")
app.use(bodyParser.urlencoded());
app.use("/public", express.static("public"))

app.get('/', homeRoute);
app.use('/contact', contactRoute)
app.use('/message', msgRoute)
app.use('/library', libraryRoute)
app.use('/group', groupRoute)

app.listen(process.env.PORT);