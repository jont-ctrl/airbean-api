import db from "../models/index.js";

export const getMenu = async (req, res) => {
  try {
    const result = await db.Menu.query("SELECT * FROM menu");

    if (result.length > 0) {
      res.status(200).json({
        status: "success",
        data: result,
      });
    } else {
      res.status(404).json({
        status: "fail",
        message: "No menu found",
      });
    }
  } catch (error) {
    res.status(500).json({ error: "Kunde inte hämta menyn" });
  }
};
