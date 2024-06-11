const User = require('../models/Users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    const { username, email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ msg: 'User already exists' });
      }
      user = new User({
        username,
        email,
        password: await bcrypt.hash(password, 10),
      });
      await user.save();
      res.status(201).json({ msg: 'User registered successfully' });
    } catch (err) {
      res.status(500).json({ msg: 'Server error' });
    }
  };
  
exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ msg: 'Invalid credentials' });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ msg: 'Invalid credentials' });
      }
      const payload = {
        user: {
          id: user.id,
          username: user.username, // Asegúrate de incluir el nombre de usuario en el token
        },
      };
      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: '1h' },
        (err, token) => {
          if (err) throw err;
          res.json({ token, user: { id: user.id, username: user.username } }); // Enviar el nombre de usuario con la respuesta
        }
      );
    } catch (err) {
      res.status(500).json({ msg: 'Server error' });
    }
  };