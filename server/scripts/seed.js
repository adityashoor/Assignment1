require('dotenv').config();
const mongoose = require('mongoose');
const path = require('path');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/Portfolio';

async function run() {
  await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  console.log('Connected to', MONGO_URI);

  const Project = require('../models/Project');
  const Qualification = require('../models/Qualification');

  // Sample projects
  const projects = [
    {
      title: 'Personal Portfolio',
      description: 'React single-page portfolio with routing and backend contact API.',
      url: '#',
      tech: ['React', 'Express', 'MongoDB']
    },
    {
      title: 'Todo API',
      description: 'Simple REST API demonstrating CRUD operations with authentication.',
      url: '#',
      tech: ['Node', 'Express', 'Mongoose']
    },
    {
      title: 'Blog Engine',
      description: 'Minimal blog prototype with markdown support and user accounts.',
      url: '#',
      tech: ['Node', 'MongoDB']
    }
  ];

  // Sample qualifications / education (match Qualification model fields)
  const quals = [
    { title: 'BSc Computer Science — University of Example', firstname: 'Aditya', lastname: 'Shoor', email: 'aditya@example.com', completion: new Date('2020-06-01'), description: 'Graduated with honours.' },
    { title: 'Full-Stack Web Dev Bootcamp — Course Academy', firstname: 'Aditya', lastname: 'Shoor', email: 'aditya@example.com', completion: new Date('2022-08-01'), description: 'Intensive 12-week program.' }
  ];

  // Insert if collection empty
  const projectCount = await Project.countDocuments();
  if (projectCount === 0) {
    await Project.insertMany(projects);
    console.log('Inserted sample projects');
  } else {
    console.log('Projects collection not empty, skipped');
  }

  const qualCount = await Qualification.countDocuments();
  if (qualCount === 0) {
    await Qualification.insertMany(quals);
    console.log('Inserted sample qualifications');
  } else {
    console.log('Qualifications collection not empty, skipped');
  }

  mongoose.disconnect();
  console.log('Done.');
}

run().catch(err => { console.error(err); process.exit(1); });
