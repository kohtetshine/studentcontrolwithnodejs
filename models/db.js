const mongoose = require('mongoose');

mongoose.connect('mongodb://0.0.0.0:27017/StudentDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});

db.once('open', () => {
    console.log('MongoDB connected');
});

db.on('disconnected', () => {
    console.log('MongoDB disconnected');
});

module.exports = db;
