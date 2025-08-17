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

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true); // allow server-to-server requests, health checks
    if (allowedOrigins.includes('*') || allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
};

app.use(cors(corsOptions));
// ...existing code...

// basic error handler (place near the end, after routes)
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err && err.stack ? err.stack : err);
  res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
});

// log unhandled exceptions/rejections
process.on('unhandledRejection', (reason) => {
  console.error('unhandledRejection:', reason);
});
process.on('uncaughtException', (err) => {
  console.error('uncaughtException:', err);
});
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
