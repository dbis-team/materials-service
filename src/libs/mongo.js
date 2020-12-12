const mongoose = require('mongoose');
const { MONGO_CONNECTION } = require('./config');

async function createConnection() {
  await mongoose.connect(MONGO_CONNECTION, {
    useNewUrlParser: true, 
    useUnifiedTopology: true
  });
}

module.exports = { createConnection };
