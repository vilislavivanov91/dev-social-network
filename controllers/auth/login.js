const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const User = require('../../model/User');
const { secretOrKey } = require('../../config/keys');

module.exports = (req, res) => {
  // Validate user input
  const { errors, isValid } = require('../../validation/login')(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;
  let currentUser;

  User.findOne({ email })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ email: 'Email not found' });
      }
      currentUser = user;
      bcrypt.compare(password, user.password).then((isMatched) => {
        if (!isMatched) {
          return res.status(400).json({ password: 'Wrong password field' });
        }

        jwt.sign(
          {
            id: currentUser._id,
            email: currentUser.email,
            name: currentUser.name,
          },
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
              email: currentUser.email,
              id: currentUser._id,
              name: currentUser.name,
            });
          }
        );
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
