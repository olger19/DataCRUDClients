import express from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import pool from '../db';


dotenv.config();

const router = express.Router();

// Middleware para autenticar y extraer familia_id del token
const authenticate = (req: any, res: any, next: any) => {
    const token = req.header('Authorization')?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Acceso denegado. No hay token' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as any;
        req.user = decoded; // Guardamos el usuario en la request
        next();
    } catch (error) {
        res.status(401).json({ message: 'Token inválido o expirado' });
    }
};

// Endpoint para obtener clientes según familia_id
router.get('/clientes', authenticate, async (req: any, res: any) => {
    try {
        const { familia_id } = req.user; // Extraemos id_tipo_familia del token

        const result = await pool.query(
            'SELECT * FROM clientes WHERE id_tipo_familia = $1',
            [familia_id]
        );

        res.json(result.rows);
    } catch (error) {
        console.error('Error obteniendo clientes:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
});

export default router;