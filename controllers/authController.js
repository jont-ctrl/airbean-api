import bcrypt from 'bcrypt';
import db from '../models/db.js';
import { v4 as uuidv4 } from 'uuid';

export const userRegister = async (req, res) => {
  const { username, password } = req.body; // Anpassa för routes

  try {
    const existingUser = await db.query(
      'SELECT * FROM users WHERE username = $1',
      [username]
    );

    if (existingUser.rows.length > 0) {
      return res.status(400).json({ error: 'Användarnamnet är redan använt' });
    }

    const hash = await bcrypt.hash(password, 10);
    const userId = uuidv4();

    const result = await db.query(
      `INSERT INTO users (user_id, username, password)
       VALUES ($1, $2, $3)
       RETURNING user_id, username`,
      [userId, username, hash]
    );

    res.status(201).json({
      status: 'success',
      data: {
        id: result.rows[0].id,
        username: result.rows[0].username,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 'fail',
      message: 'Kunde inte registrera användaren',
    });
  }
};

export const userLogin = async (req, res) => {
  const { username, password } = req.body; // Anpassa för routes

  try {
    const user = await db.query('SELECT * FROM users WHERE username = $1', [
      username,
    ]);

    if (user.rows.length === 0)
      return res
        .status(401)
        .json({ error: 'Ogiltigt användarnamn eller lösenord' });

    const isValid = await bcrypt.compare(password, user.rows[0].password);

    if (!isValid)
      return res
        .status(401)
        .json({ error: 'Ogiltigt användarnamn eller lösenord' });

    res.json({ message: 'Inloggad!', userId: user.rows[0].id });
  } catch (error) {
    res.status(500).json({ error: 'Kunde inte logga in användaren' });
  }
};
