const express = require('express');
const cors = require('cors');
const multer = require('multer');

const path = require('path');
require('dotenv').config();

const analyzeController = require('./controllers/analyzeController');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Setup multer for file uploads (memory storage)
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Routes
// Simple health check
app.get('/', (req, res) => {
  res.send('Resume Analyzer API is running.');
});

// Analyze resume route (handles both local and Vercel stripped prefix)
app.post(['/api/analyze', '/analyze'], upload.single('resume'), analyzeController.analyzeResume);

if (process.env.NODE_ENV !== 'production') {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}
module.exports = app;
