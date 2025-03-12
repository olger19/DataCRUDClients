import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import pool from "../../db"; // Importamos el pool

dotenv.config();

const router = express.Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Todos los campos son obligatorios" });
  }

  try {
    const userResult = await pool.query(
      `SELECT u.id_usuario, u.email, u.password, STRING_AGG(DISTINCT ut.id_tipo_familia::TEXT, ', ') AS tipo_familia 
     FROM usuarios u 
     JOIN usuario_tipo_familia ut ON u.id_usuario = ut.id_usuario 
     WHERE u.email = $1 
     GROUP BY u.id_usuario, u.email, u.password`,
      [email]
    );
    console.log("Resultado de la consulta:", userResult.rows);
    if (userResult.rows.length === 0) {
      return res.status(401).json({ message: "Usuario no encontrado" });
    }

    const user = userResult.rows[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }

    // Este es el token que se enviará al cliente
    const token = jwt.sign(
      {
        id_usuario: user.id_usuario,
        email: user.email,
        familia_id: user.tipo_familia.split(", "),
      },
      process.env.JWT_SECRET as string,
      { expiresIn: "7d" }
    );

    res.json({ message: "Inicio de sesión exitoso", token, permissions: user.tipo_familia.split(", ") });
    console.log("Token:", token);
  } catch (error) {
    console.error("Error en el login:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
});

export default router;
