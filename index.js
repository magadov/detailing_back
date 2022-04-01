const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const mongoose = require('mongoose');
const chalk = require('chalk')
require('dotenv').config()
const port = process.env.PORT;

const url = "mongodb+srv://usman:Usman1994@cluster0.rlomm.mongodb.net/autoservice";


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));
// app.use('/uploads', express.static(path.resolve(__dirname, 'uploads')));

app.use(require('./routes'));

const connectAndStartServer = async () => {
  try{
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    app.listen(port, () => {
      console.log(chalk.blue(`Успешно соединились. Порт ${port}`));
    })
  }catch (e) {
    console.log(chalk.bgRed.white(`Ошибка при подключении: ${e.toString()}`))
  }
};

connectAndStartServer();