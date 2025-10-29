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
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { authenticateToken } = require('./middleware/auth');

const JWT_SECRET = process.env.JWT_SECRET || 'change_this_secret';

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
  // protected
  try {
    await authenticatePromise(req, res);
    await Contact.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (err) {
    // authenticatePromise already handled response
  }
});

app.delete('/api/contacts', async (req, res) => {
  try {
    await authenticatePromise(req, res);
    await Contact.deleteMany({});
    res.json({ message: 'All contacts deleted' });
  } catch (err) {
    // handled
  }
});

// Helper to use authenticateToken (which expects req/res/next) in async handlers
function authenticatePromise(req, res) {
  return new Promise((resolve, reject) => {
    try {
      authenticateToken(req, res, (err) => {
        if (err) return reject(err);
        // If middleware sent a response (e.g., res.status), it won't call next; check if user is attached
        if (!req.user) return reject(new Error('Unauthorized'));
        resolve();
      });
    } catch (err) {
      reject(err);
    }
  });
}

// Projects routes (basic CRUD)
app.get('/api/projects', async (req, res) => res.json(await Project.find().sort({ _id: -1 })));
app.get('/api/projects/:id', async (req, res) => res.json(await Project.findById(req.params.id)));
app.post('/api/projects', async (req, res) => res.json(await new Project(req.body).save()));
app.put('/api/projects/:id', async (req, res) => res.json(await Project.findByIdAndUpdate(req.params.id, req.body, { new: true })));
app.delete('/api/projects/:id', async (req, res) => {
  try {
    await authenticatePromise(req, res);
    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (err) {}
});
app.delete('/api/projects', async (req, res) => {
  try {
    await authenticatePromise(req, res);
    await Project.deleteMany({});
    res.json({ message: 'All projects deleted' });
  } catch (err) {}
});

// Qualifications routes
app.get('/api/qualifications', async (req, res) => res.json(await Qualification.find().sort({ _id: -1 })));
app.get('/api/qualifications/:id', async (req, res) => res.json(await Qualification.findById(req.params.id)));
app.post('/api/qualifications', async (req, res) => res.json(await new Qualification(req.body).save()));
app.put('/api/qualifications/:id', async (req, res) => res.json(await Qualification.findByIdAndUpdate(req.params.id, req.body, { new: true })));
app.delete('/api/qualifications/:id', async (req, res) => {
  try { await authenticatePromise(req, res); await Qualification.findByIdAndDelete(req.params.id); res.json({ message: 'Deleted' }); } catch (err) {}
});
app.delete('/api/qualifications', async (req, res) => {
  try { await authenticatePromise(req, res); await Qualification.deleteMany({}); res.json({ message: 'All qualifications deleted' }); } catch (err) {}
});

// Users routes (basic CRUD)
app.get('/api/users', async (req, res) => res.json(await User.find().sort({ _id: -1 })));
app.get('/api/users/:id', async (req, res) => res.json(await User.findById(req.params.id)));
app.post('/api/users', async (req, res) => res.json(await new User(req.body).save()));
app.put('/api/users/:id', async (req, res) => res.json(await User.findByIdAndUpdate(req.params.id, req.body, { new: true })));
app.delete('/api/users/:id', async (req, res) => {
  try { await authenticatePromise(req, res); await User.findByIdAndDelete(req.params.id); res.json({ message: 'Deleted' }); } catch (err) {}
});
app.delete('/api/users', async (req, res) => {
  try { await authenticatePromise(req, res); await User.deleteMany({}); res.json({ message: 'All users deleted' }); } catch (err) {}
});

// Auth routes
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!email || !password || !name) return res.status(400).json({ message: 'Missing fields' });
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: 'User already exists' });
    const hash = await bcrypt.hash(password, 10);
    const user = await new User({ name, email, password: hash }).save();
    const token = jwt.sign({ id: user._id, email: user.email, name: user.name }, JWT_SECRET, { expiresIn: '8h' });
    res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (err) { res.status(500).json({ message: err.message }); }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'Missing fields' });
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(400).json({ message: 'Invalid credentials' });
    const token = jwt.sign({ id: user._id, email: user.email, name: user.name }, JWT_SECRET, { expiresIn: '8h' });
    res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (err) { res.status(500).json({ message: err.message }); }
});

// Serve client build in production (optional)
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '..', 'build')));
  app.get('*', (req, res) => res.sendFile(path.join(__dirname, '..', 'build', 'index.html')));
}

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
