const mongoose = require('mongoose');

const mongoURI = "mongodb://127.0.0.1:27017/inotebook?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false"

const connectToMongo = ()=>{
    mongoose
    .connect(mongoURI)
    .then(() => {
      console.log("Connected to Mongo Successfully");
    })
    .catch((err) => {
      console.log(`error: ${err}`);
    });
}

module.exports = connectToMongo;