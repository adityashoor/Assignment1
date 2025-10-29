require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/Portfolio';

// Middleware
app.use(cors());
app.use(express.json());

// Simple request logger for debugging
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Connect to MongoDB
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB:', MONGO_URI))
  .catch(err => console.error('MongoDB connection error:', err));

// Models
const Contact = require('./models/Contact');
const Project = require('./models/Project');
const Qualification = require('./models/Qualification');
const User = require('./models/User');

// Routes - Contacts
app.get('/api/contacts', async (req, res) => {
  const items = await Contact.find().sort({ _id: -1 });
  res.json(items);
});

app.get('/api/contacts/:id', async (req, res) => {
  const item = await Contact.findById(req.params.id);
  if (!item) return res.status(404).json({ message: 'Contact not found' });
  res.json(item);
});

app.post('/api/contacts', async (req, res) => {
  try {
    console.log('POST /api/contacts payload:', req.body);
    const doc = new Contact(req.body);
    const saved = await doc.save();
    console.log('Contact saved:', saved._id);
    res.status(201).json(saved);
  } catch (err) {
    console.error('Error saving contact:', err);
    res.status(400).json({ message: err.message });
  }
});

app.put('/api/contacts/:id', async (req, res) => {
  const updated = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

app.delete('/api/contacts/:id', async (req, res) => {
  await Contact.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
});

app.delete('/api/contacts', async (req, res) => {
  await Contact.deleteMany({});
  res.json({ message: 'All contacts deleted' });
});

// Projects routes (basic CRUD)
app.get('/api/projects', async (req, res) => res.json(await Project.find().sort({ _id: -1 })));
app.get('/api/projects/:id', async (req, res) => res.json(await Project.findById(req.params.id)));
app.post('/api/projects', async (req, res) => res.json(await new Project(req.body).save()));
app.put('/api/projects/:id', async (req, res) => res.json(await Project.findByIdAndUpdate(req.params.id, req.body, { new: true })));
app.delete('/api/projects/:id', async (req, res) => { await Project.findByIdAndDelete(req.params.id); res.json({ message: 'Deleted' }); });
app.delete('/api/projects', async (req, res) => { await Project.deleteMany({}); res.json({ message: 'All projects deleted' }); });

// Qualifications routes
app.get('/api/qualifications', async (req, res) => res.json(await Qualification.find().sort({ _id: -1 })));
app.get('/api/qualifications/:id', async (req, res) => res.json(await Qualification.findById(req.params.id)));
app.post('/api/qualifications', async (req, res) => res.json(await new Qualification(req.body).save()));
app.put('/api/qualifications/:id', async (req, res) => res.json(await Qualification.findByIdAndUpdate(req.params.id, req.body, { new: true })));
app.delete('/api/qualifications/:id', async (req, res) => { await Qualification.findByIdAndDelete(req.params.id); res.json({ message: 'Deleted' }); });
app.delete('/api/qualifications', async (req, res) => { await Qualification.deleteMany({}); res.json({ message: 'All qualifications deleted' }); });

// Users routes (basic CRUD)
app.get('/api/users', async (req, res) => res.json(await User.find().sort({ _id: -1 })));
app.get('/api/users/:id', async (req, res) => res.json(await User.findById(req.params.id)));
app.post('/api/users', async (req, res) => res.json(await new User(req.body).save()));
app.put('/api/users/:id', async (req, res) => res.json(await User.findByIdAndUpdate(req.params.id, req.body, { new: true })));
app.delete('/api/users/:id', async (req, res) => { await User.findByIdAndDelete(req.params.id); res.json({ message: 'Deleted' }); });
app.delete('/api/users', async (req, res) => { await User.deleteMany({}); res.json({ message: 'All users deleted' }); });

// Serve client build in production (optional)
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '..', 'build')));
  app.get('*', (req, res) => res.sendFile(path.join(__dirname, '..', 'build', 'index.html')));
}

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
