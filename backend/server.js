// backend/server.js

import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import routes from './routes/index.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log(err));

// All Routes
app.use('/api', routes);

// Root route
app.get('/', (req, res) => {
  res.send("AI SaaS Server is running.");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
