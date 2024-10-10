const express = require('express')
const dotenv=require('dotenv')
const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');
const cors=require('cors')
dotenv.config()
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
const dbName = 'Passop';
const app=express()
const port = 3000
app.use(bodyParser.json())
app.use(cors())


client.connect();

//get all password
app.get('/api', async (req, res) => {
  console.log('Req received')
  const db = client.db(dbName);
  const collection = db.collection('Passwords');
  const findResult = await collection.find({}).toArray();
  res.json(findResult) 
}) 
//save a password
app.post('/api', async (req, res) => {
  const password=req.body
  const db = client.db(dbName);
  const collection = db.collection('Passwords');
  const findResult = await collection.insertOne(password);
  res.send({success:true,result: findResult})
})
//delete a password
app.delete('/api',async (req, res) => {
  const password=req.body
  const db = client.db(dbName);
  const collection = db.collection('Passwords');
  const findResult = await collection.deleteOne(password);
  res.send({success:true,result: findResult})
})
app.listen(port, () => {           
  console.log(`Example app listening on http://localhost:${port}`)
})