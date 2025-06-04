const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const cookieParser = require('cookie-parser');
const session = require('express-session');

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
// Configure session middleware
app.use(session({
  secret: 'your-secret-key-here', // Replace with a secure secret key
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // Set to true if using HTTPS in production
}));
app.use(passport.initialize());
app.use(passport.session());

console.log('GOOGLE_CLIENT_ID:', process.env.GOOGLE_CLIENT_ID);
console.log('GOOGLE_CLIENT_SECRET:', process.env.GOOGLE_CLIENT_SECRET);

// Configure passport serialization
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'https://www.brainjelli.com/api/auth/google/callback'
  },
  (accessToken, refreshToken, profile, done) => {
    // Log user profile for debugging
    console.log('User profile:', profile);
    return done(null, profile);
  }
));

app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

app.get('/api/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login.html' }),
  (req, res) => {
    // Set the user cookie with user-specific data
    if (req.user) {
      res.cookie('user', JSON.stringify({
        userId: req.user.id,
        email: req.user.emails[0].value,
        name: req.user.displayName
      }));
      console.log('Set user cookie:', {
        userId: req.user.id,
        email: req.user.emails[0].value,
        name: req.user.displayName
      });
    } else {
      console.log('No user data available in req.user');
    }
    res.redirect('/user-profile.html');
  }
);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
