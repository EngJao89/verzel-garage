const express = require('express');

const sequelize = require('./util/database');
const Vehicle = require('./models/vehicles');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin','*');
  // @ts-ignore
  res.setHeader('Access-Control-Allow-Methods', 'GET','POST','PUT','DELETE');
  next();
})


app.use('/vehicles', require('./routes/vehicles'));

(async () =>{
  try {
    await sequelize.sync(
      {force: false}
    );
    console.log("test");
    app.listen(process.env.EXTERNAL_PORT || 3001);
  } catch (error) {
    console.error(error);
  }
})()