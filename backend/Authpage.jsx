const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// User Schema
const userSchema = new mongoose.Schema({
  Name: String,
  
  email: { type: String, unique: true },
  password: String,

})
const User = mongoose.model('User', userSchema);

// Signup Route
app.post('/auth/signup', async (req, res) => {
  try {
    const { Name,  email, passwor } = req.body;
    
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'Email already exists' });
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ Name, email, password: hashedPassword});
    await newUser.save();
    
    const token = jwt.sign({ email, id: newUser._id }, JWT_SECRET, { expiresIn: '1h' });
    res.status(201).json({ token, user: { firstName, lastName, email, phoneNumber } });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Signin Route
app.post('/auth/signin', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'User not found' });
    
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(400).json({ message: 'Invalid credentials' });
    
    const token = jwt.sign({ email, id: user._id }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, user: { Name: user.Name, email, } });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
