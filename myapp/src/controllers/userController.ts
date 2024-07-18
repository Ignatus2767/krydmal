import bcrypt from 'bcrypt';
import pool from '../db';
import { Request, Response } from 'express';

const handleSignUp = async (req: Request, res: Response) => {
  const { fullname, email, username, password, country } = req.body;

  // Hashing the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Check if user with the same email or username already exists
  const checkQuery = 'SELECT * FROM users WHERE email = ? OR username = ?';
  const insertQuery = 'INSERT INTO users (fullname, email, username, password, country) VALUES (?, ?, ?, ?, ?)';

  try {
    const [existingUsers]: any = await pool.query(checkQuery, [email, username]);

    if (existingUsers.length > 0) {
      const existingUser = existingUsers[0];
      if (existingUser.email === email) {
        res.status(400).send('A user with this email already exists.');
      } else {
        res.status(400).send('A user with this username already exists.');
      }
      return;
    }

    const [results]: any = await pool.query(insertQuery, [fullname, email, username, hashedPassword, country]);
    console.log('Sign up successful:', results);
    res.redirect('/signin');
  } catch (error) {
    console.error('Error signing up:', error);
    res.status(500).send('Error signing up');
  }
};

const handleSignIn = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const query = 'SELECT * FROM users WHERE email = ?';

  try {
    const [results]: any = await pool.query(query, [email]);

    if (results.length === 0) {
      res.status(401).send('Invalid email or password');
      return;
    }

    const user = results[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      res.status(401).send('Invalid email or password');
      return;
    }

    console.log('Sign in successful:', user);
    res.redirect('/dashboard');
  } catch (error) {
    console.error('Error signing in:', error);
    res.status(500).send('Error signing in');
  }
};

export { handleSignUp, handleSignIn };
