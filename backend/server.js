require('dotenv').config();
const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const app = express();

app.use(passport.initialize());

console.log('GOOGLE_CLIENT_ID:', process.env.GOOGLE_CLIENT_ID);
console.log('GOOGLE_CLIENT_SECRET:', process.env.GOOGLE_CLIENT_SECRET);

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'https://www.brainjelli.com/signin-google'
  },
  (accessToken, refreshToken, profile, done) => {
    console.log('User profile:', profile);
    return done(null, profile);
  }
));

app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

app.get('/signin-google',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect('/user-profile.html');
  }
);

const PORT = process.env.PORT || 3000;
app.get('/api/scores', (req, res) => {
  res.json({ message: 'Scores endpoint placeholder', scores: [] });
});
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
