import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import pool from '../db'; // Importamos el pool

dotenv.config();

const router = express.Router();

router.post('/login', async (req, res) => {
  
    const { email, password } = req.body;
  
    if (!email || !password) {
      return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }
  
    try {
      const userResult = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);
  
      if (userResult.rows.length === 0) {
        return res.status(401).json({ message: 'Usuario no encontrado' });
      }
  
      const user = userResult.rows[0];
      const isMatch = await bcrypt.compare(password, user.password);
  
      if (!isMatch) {
        return res.status(401).json({ message: 'Contraseña incorrecta' });
      }
  
      const token = jwt.sign(
        { id_usuario: user.id_usuario, email: user.email },
        process.env.JWT_SECRET as string,
        { expiresIn: '1h' }
      );
  
      res.json({ message: 'Inicio de sesión exitoso', token });
    } catch (error) {
      console.error('Error en el login:', error);
      res.status(500).json({ message: 'Error en el servidor' });
    }
  });
  
export default router;
