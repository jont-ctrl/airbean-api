import express from 'express';
import { placeOrder, getOrderHistory } from '../controllers/orderController.js';
// import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Order management
 */

/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: Place a new coffee order
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Order details
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     quantity:
 *                       type: integer
 *               total:
 *                 type: number
 *     responses:
 *       201:
 *         description: Order placed successfully
 *       400:
 *         description: Invalid request
 *       401:
 *         description: Unauthorized
 */
router.post('/', placeOrder);
// Lägg tillbaka authMiddleware

/**
 * @swagger
 * /api/orders/history:
 *   get:
 *     summary: Get order history for the logged-in user
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of past orders
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   orderId:
 *                     type: string
 *                   date:
 *                     type: string
 *                     format: date-time
 *                   items:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                         title:
 *                           type: string
 *                         quantity:
 *                           type: integer
 *                   total:
 *                     type: number
 *       401:
 *         description: Unauthorized
 */
router.get('/history', getOrderHistory);
//Lägg tillbaka authMiddleware

export default router;
