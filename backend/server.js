const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const cookieParser = require('cookie-parser');
const session = require('express-session');
const { Pool } = require('pg');
const path = require('path');

const app = express();

// Initialize PostgreSQL database pool
const pool = new Pool({
    user: 'brainjelli',
    host: 'localhost',
    database: 'brainmaze',
    password: process.env.DB_PASSWORD || 'securepassword',
    port: 5432,
});

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(session({
    secret: process.env.SESSION_SECRET || 'your-very-secure-random-secret-key-1234567890',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: true, sameSite: 'lax', maxAge: 24 * 60 * 60 * 1000 } // 1 day
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, '../html'))); // Serve static files from html/

console.log('GOOGLE_CLIENT_ID:', process.env.GOOGLE_CLIENT_ID);
console.log('GOOGLE_CLIENT_SECRET:', process.env.GOOGLE_CLIENT_SECRET);

// Configure passport serialization
passport.serializeUser((user, done) => {
    console.log('Serializing user:', user);
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const userQuery = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
        const user = userQuery.rows[0];
        console.log('Deserializing user:', user);
        done(null, user || null);
    } catch (error) {
        console.error('Error deserializing user:', error);
        done(error, null);
    }
});

// Configure Google OAuth Strategy
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'https://www.brainjelli.com/api/auth/google/callback'
}, async (accessToken, refreshToken, profile, done) => {
    try {
        const email = profile.emails[0].value;
        const name = profile.displayName;
        const googleId = profile.id;
        console.log('Google profile received:', { email, name, googleId });

        const userQuery = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        let user;

        if (userQuery.rows.length > 0) {
            user = userQuery.rows[0];
            console.log('Existing user found:', user);
        } else {
            const newUser = await pool.query(
                'INSERT INTO users (email, name, created_at) VALUES ($1, $2, NOW()) RETURNING *',
                [email, name]
            );
            user = newUser.rows[0];
            console.log('New user created:', user);
        }

        return done(null, user);
    } catch (error) {
        console.error('Error in GoogleStrategy:', error);
        return done(error, null);
    }
}));

// Routes
app.get('/auth/google',
    passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/userinfo.email'] })
);

app.get('/api/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/login.html' }),
    (req, res) => {
        console.log('Authenticated user:', req.user);
        res.cookie('userId', String(req.user.id), { secure: true, sameSite: 'lax', maxAge: 24 * 60 * 60 * 1000 });
        res.cookie('email', req.user.email, { secure: true, sameSite: 'lax', maxAge: 24 * 60 * 60 * 1000 });
        res.cookie('name', req.user.name, { secure: true, sameSite: 'lax', maxAge: 24 * 60 * 60 * 1000 });
        console.log('Set cookies:', { userId: req.user.id, email: req.user.email, name: req.user.name });
        console.log('Session user:', req.session.user);
        console.log('Response headers:', res.getHeaders());
        res.redirect('/user-profile.html');
    }
);

app.get('/api/scores/:userId', async (req, res) => {
    console.log('Score request - Cookies:', req.cookies);
    console.log('Score request - Session:', req.session.user);
    console.log('Score request - Params:', req.params);
    const userId = parseInt(req.params.userId);
    const exam = req.query.exam || 'SAT';
    try {
        const result = await pool.query(
            'SELECT category, percentage, previous_percentage FROM scores WHERE user_id = $1 AND exam_type = $2',
            [userId, exam]
        );
        console.log(`Fetched scores for user ${userId}, exam ${exam}:`, result.rows);
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching scores:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/api/scores', async (req, res) => {
    console.log('Score save request - Cookies:', req.cookies);
    console.log('Score save request - Body:', req.body);
    const { user_id, exam_type, category, score, percentage } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO scores (user_id, exam_type, category, score, percentage, previous_percentage, created_at) ' +
            'VALUES ($1, $2, $3, $4, $5, (SELECT COALESCE((SELECT percentage FROM scores WHERE user_id = $1 AND exam_type = $2 AND category = $3 ORDER BY created_at DESC LIMIT 1), 0)), NOW()) RETURNING *',
            [user_id, exam_type, category, score, percentage]
        );
        console.log(`Saved score for user ${user_id}:`, result.rows[0]);
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error saving score:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
