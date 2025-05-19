import express from "express";
import { getMenu } from "../controllers/menuController.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Menu
 *   description: Coffee menu
 */

/**
 * @swagger
 * /api/menu:
 *   get:
 *     summary: Get all coffee items on the menu
 *     tags: [Menu]
 *     responses:
 *       200:
 *         description: A list of coffee items
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   title:
 *                     type: string
 *                   desc:
 *                     type: string
 *                   price:
 *                     type: number
 */
router.get("/", getMenu);

export default router;
