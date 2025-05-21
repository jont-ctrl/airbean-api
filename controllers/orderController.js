import db from '../models/db.js';
import { isBefore } from 'date-fns';
import { v4 as uuidv4 } from 'uuid';

export const placeOrder = async (req, res) => {
  const { user_id, orderItems } = req.body;

  const orderNr = uuidv4(); // Unikt ordernummer

  try {
    const orderResult = await db.query(
      'INSERT INTO orders (user_id, order_nr, total_price) VALUES ($1, $2, $3) RETURNING id',
      [user_id, orderNr, 0]
    );

    const orderId = orderResult.rows[0].id;

    let totalPrice = 0;

    for (const item of orderItems) {
      const productResult = await db.query(
        'SELECT price FROM products WHERE id = $1',
        [item.productId]
      );

      const price = productResult.rows[0]?.price || 0;
      const itemTotal = price * item.quantity;
      totalPrice += itemTotal;

      await db.query(
        'INSERT INTO order_items (order_id, product_id, quantity) VALUES ($1, $2, $3)',
        [orderId, item.productId, item.quantity]
      );
    }

    await db.query('UPDATE orders SET total_price = $1 WHERE id = $2', [
      totalPrice,
      orderId,
    ]);

    res.status(201).json({
      status: 'success',
      message: 'Beställning lagd',
      orderId: orderId,
      orderNr: orderNr,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Kunde inte lägga beställning' });
  }
};

export const getOrderHistory = async (req, res) => {
  const { user_id } = req.body;

  try {
    const result = await db.query(
      `SELECT 
         o.*, 
         oi.* 
       FROM orders o, order_items oi
       WHERE o.id = oi.order_id
         AND o.user_id = $1
       ORDER BY o.created_at DESC, oi.id`,
      [user_id]
    );

    res.status(200).json({
      status: 'success',
      data: result.rows,
    });
  } catch (error) {
    console.error('Fel vid hämtning av beställningar:', error);
    res.status(500).json({ error: 'Kunde inte hämta beställningar' });
  }
};
