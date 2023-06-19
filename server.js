const mangoose = require('mongoose');
const app = require('./app');

const { DB_HOST } = process.env;

mangoose.set('strictQuery', true);

mangoose
  .connect(DB_HOST)
  .then(() => app.listen(3000, console.log('Database connection successful')))
  .catch(error => {
    console.log(error.message);
    process.exit(1);
  });
