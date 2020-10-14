module.exports = (passport) => {
  const JwtStrategy = require('passport-jwt').Strategy;
  const ExtractJwt = require('passport-jwt').ExtractJwt;

  const User = require('../model/User');
  const secretOrKey = require('./keys').secretOrKey;

  const opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  opts.secretOrKey = secretOrKey;

  passport.use(
    new JwtStrategy(opts, (payload, done) => {
      User.findById(payload.id)
        .then((user) => {
          if (!user) {
            return done(null, false);
          }
          // console.log('here?! and the user is: ' + user);
          return done(null, user);
        })
        .catch((err) => {
          return done(err, false);
        });
    })
  );
};
