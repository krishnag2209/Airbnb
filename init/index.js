const express = require('express');
const app = express();
const mongoose = require('mongoose');
const listing  = require("../model/Listing.js");
const initData = require("./data.js");



// DATABASE connectivity :--
const MONGO_URL = 'mongodb://localhost:27017/Wander_lust';

main()
    .then(() =>{
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB', err);
    });
    
  async function main (){
    await mongoose.connect(MONGO_URL);
}

const insertdata = async () =>{
       await listing.deleteMany({});
       initData.data =  initData.data.map((obj) => ({...obj, owner:"6841db022d732f56fe183952"}));
    await listing.insertMany(initData.data);
     console.log("Data Inserted");
    
}
insertdata();