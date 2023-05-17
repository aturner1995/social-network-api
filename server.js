const express = require('express');
const { MongoClient } = require('mongodb');
const db = require('./config/connection')

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`API server is running on port ${PORT}`)
    })
})