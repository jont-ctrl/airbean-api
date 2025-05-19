import pool from '../models/db.js';

async function seedProducts() {
  try {
    await pool.query(`
      INSERT INTO products (name, description, price) VALUES
      ('Bryggkaffe', 'Bryggd på månadens bönor', 49),
      ('Caffè Doppio', 'Bryggd på månadens bönor', 49),
      ('Cappuccino', 'Bryggd på månadens bönor', 49),
      ('Latte Macchiato', 'Bryggd på månadens bönor', 49),
      ('Kaffe Latte', 'Bryggd på månadens bönor', 49),
      ('Cortado', 'Bryggd på månadens bönor', 39)
    `);
    console.log(" Produkter inlagda!");
  } catch (err) {
    console.error(" Fel vid produktseedning:", err);
  } finally {
    process.exit();
  }
}

seedProducts();
