const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const User = require('../../model/User');
const { secretOrKey } = require('../../config/keys');

module.exports = (req, res) => {
  // validate user input
  const { errors, isValid } = require('../../validation/register')(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;
  const name = req.body.name;

  User.findOne({ email }).then((user) => {
    if (user) {
      return res.status(409).json({ email: 'Email already exists' });
    }

    const newUser = new User({
      email,
      password,
      name,
    });

    bcrypt
      .genSalt(10)
      .then((salt) => {
        return bcrypt.hash(newUser.password, salt);
      })
      .then((hashed) => {
        newUser.password = hashed;
        return newUser.save();
      })
      .then((user) => {
        jwt.sign(
          { id: user._id, email: user.email, name: user.name },
          secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            if (err) {
              // Send more adequate status code
              return res.status(400).json({
                token:
                  'Error generating a token for this user, please try again',
              });
            }
            res.json({
              token: 'Bearer ' + token,
              email: user.email,
              id: user._id,
              name: user.name,
            });
          }
        );
      })
      .catch((err) => console.log(err));
  });
};
