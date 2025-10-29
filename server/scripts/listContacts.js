// Quick script to list contacts from MongoDB for debugging
const mongoose = require('mongoose');
const Contact = require('../models/Contact');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/Portfolio';

async function run() {
  try {
    await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to', MONGO_URI);
    const items = await Contact.find().sort({ createdAt: -1 }).limit(50).lean();
    console.log('Found', items.length, 'contacts');
    console.log(JSON.stringify(items, null, 2));
    await mongoose.disconnect();
  } catch (err) {
    console.error('Error:', err);
    process.exit(1);
  }
}

run();
