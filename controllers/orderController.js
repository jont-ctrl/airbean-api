import db from "../models/index.js";
import { isBefore } from "date-fns";

export const placeOrder = async (req, res) => {
  const { userId, orderItems } = req.body; // Anpass för routes

  try {
    const orderResult = await db.query(
      "INSERT INTO order (user_id, created_at) VALUES ($1, NOW()) RETURNING id", // Anpassa för databas
      [userId]
    );

    const orderId = orderResult.rows[0].id; // Anpassa för databas

    for (const item of orderItems) {
      await db.query(
        "INSERT INTO order_items (order_id, product_id, quantity) VALUES ($1, $2, $3)", // Anpassa för databas
        [orderId, item.productId, item.quantity]
      );
    }

    res.status(201).json({
      status: "success",
      message: "Beställning lagd",
      orderId: orderId,
    });
  } catch (error) {
    res.status(500).json({ error: "Kunde inte lägga beställning" });
  }
};

export const getOrderHistory = async (req, res) => {
  const { userId } = req.params; // Anpassa för routes

  try {
    const result = await db.query(
      "SELECT * FROM orders WHERE user_id = $1 ORDER BY created_at DESC", // Anpassa för databas
      [userId]
    );

    const now = new Date();
    const orders = result.rows.map((order) => ({
      ...order,
      status: isBefore(new Date(order.created_at), now)
        ? "completed"
        : "active",
    }));

    res.json({
      status: "success",
      data: orders,
    });
  } catch (error) {
    res.status(500).json({ error: "Kunde inte hämta beställningar" });
  }
};
