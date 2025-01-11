const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.register=async(req,res)=>{
    const {name, email, password, role}=req.body;
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ error: 'User already exists' });
    }
    try {
        const user = new User({
          name,
          email,
          password,
          role
        });
        await user.save();
        res.status(201).json({
            message: 'User created successfully',
            user: { name: user.name, email: user.email, role: user.role }
          });
        } catch (err) {
          res.status(500).json({ error: 'Server error' });
        }
      };

exports.login= async(req,res) =>{
    const {email ,password}=req.body;

    const user=await User.findOne({email});
    if(!user){
        return res.status(400).json({error:'Invalid credentials'})
    }

    const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ error: 'Invalid credentials' });
  }

  const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

  // Return the token and user details
  res.status(200).json({
    message: 'Login successful',
    token,
    user: { name: user.name, email: user.email, role: user.role }
  });
};