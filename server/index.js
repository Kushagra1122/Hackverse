const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/authroutes');
const profRoutes = require('./routes/profroutes');
const inviteRoutes = require('./routes/inviteroutes');
const courseRoutes = require('./routes/courseroute');
const app = express();
const path = require('path');


// Load environment vaiables
dotenv.config();

app.use(cors());
app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/auth', authRoutes);
app.use('/api/prof', profRoutes);
app.use('/api/invite', inviteRoutes);
app.use('/api/course', courseRoutes);


mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log(err));

const PORT = process.env.PORT ;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
