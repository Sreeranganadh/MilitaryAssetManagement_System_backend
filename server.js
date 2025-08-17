// const express = require('express');
// const cors = require('cors');
// const path = require('path');
// require('dotenv').config();

// const authRoutes = require('./routes/auth');
// const purchaseRoutes = require('./routes/purchases');
// const transferRoutes = require('./routes/transfers');
// const assignmentRoutes = require('./routes/assignments');
// const dashboardRoutes = require('./routes/dashboard');

// const app = express();

// app.use(cors({
//   origin: process.env.FRONTEND_URL,
//   methods: "GET,POST,PUT,DELETE",
//   credentials: true
// }));


// app.use(express.json());

// // API route handlers
// app.use('/api/auth', authRoutes);
// app.use('/api/purchases', purchaseRoutes);
// app.use('/api/transfers', transferRoutes);
// app.use('/api/assignments', assignmentRoutes);
// app.use('/api/dashboard', dashboardRoutes);

// // Serve React build files
// app.use(express.static(path.join(__dirname, '../frontend/build')));

// // Serve index.html for all other
// app.get('/*any', (req, res) => {
//   res.sendFile(path.join(__dirname, '../frontend/build/'));
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () =>
//   console.log(`Server running and serving React app on port ${PORT}`)
// );


const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const purchaseRoutes = require('./routes/purchases');
const transferRoutes = require('./routes/transfers');
const assignmentRoutes = require('./routes/assignments');
const dashboardRoutes = require('./routes/dashboard');

const app = express();

// ✅ Safe CORS setup
app.use(cors({
  origin: process.env.FRONTEND_URL || "*",  // fallback so it won’t crash
  methods: "GET,POST,PUT,DELETE",
  credentials: true
}));

app.use(express.json());

// API route handlers
app.use('/api/auth', authRoutes);
app.use('/api/purchases', purchaseRoutes);
app.use('/api/transfers', transferRoutes);
app.use('/api/assignments', assignmentRoutes);
app.use('/api/dashboard', dashboardRoutes);

// ✅ Serve React build files
app.use(express.static(path.join(__dirname, '../frontend/build')));

// ✅ Fix for React Router (SPA support)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`✅ Server running on port ${PORT}`)
);
