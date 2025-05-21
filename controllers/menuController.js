import db from '../models/db.js';

export const getMenu = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM products');

    if (result.rows.length > 0) {
      res.status(200).json({
        status: 'success',
        data: result.rows,
      });
    } else {
      res.status(404).json({
        status: 'fail',
        message: 'No menu found',
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Kunde inte hämta menyn' });
  }
};
