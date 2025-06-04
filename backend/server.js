const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const cookieParser = require('cookie-parser');
const session = require('express-session');
const { Pool } = require('pg');

const app = express();

// Initialize PostgreSQL database pool
const pool = new Pool({
  user: 'brainjelli',
  host: 'localhost',
  database: 'brainmaze',
  password: 'securepassword',
  port: 5432,
});

// Middleware
app.use(express.json());
app.use(cookieParser());
// Configure session middleware
app.use(session({
  secret: 'your-very-secure-random-secret-key-1234567890', // Replace with a secure secret key
  resave: false,
  saveUninitialized: false,
  cookie: { secure: true } // Set to true since we're using HTTPS
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

// Configure Google OAuth Strategy
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'https://www.brainjelli.com/api/auth/google/callback'
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      // Extract user info
      const email = profile.emails[0].value;
      const name = profile.displayName;
      const googleId = profile.id;

      // Check if user exists in the database
      const userQuery = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
      let user;

      if (userQuery.rows.length > 0) {
        // User exists, update their info if needed
        user = userQuery.rows[0];
      } else {
        // Insert new user
        const newUser = await pool.query(
          'INSERT INTO users (email, name, created_at) VALUES ($1, $2, NOW()) RETURNING *',
          [email, name]
        );
        user = newUser.rows[0];
      }

      // Log user profile for debugging
      console.log('User profile:', user);
      return done(null, user);
    } catch (error) {
      console.error('Error in GoogleStrategy:', error);
      return done(error, null);
    }
  }
));

// Routes
app.get('/auth/google',
  passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/userinfo.email'] })
);

app.get('/api/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login.html' }),
  (req, res) => {
    // Set cookies
    res.cookie('userId', req.user.id, { secure: true, httpOnly: true });
    res.cookie('email', req.user.email, { secure: true });
    res.cookie('name', req.user.name, { secure: true });
    console.log('Set user cookies:', { userId: req.user.id, email: req.user.email, name: req.user.name });
    // Redirect to user profile page
    res.redirect('/user-profile.html');
  }
);

app.get('/api/scores/:userId', async (req, res) => {
  const userId = parseInt(req.params.userId);
  const exam = req.query.exam || 'SAT';
  try {
    const result = await pool.query(
      'SELECT category, percentage, previous_percentage FROM scores WHERE user_id = $1 AND exam_type = $2',
      [userId, exam]
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching scores:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
