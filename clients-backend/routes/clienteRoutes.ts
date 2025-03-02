import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import pool from "../db";

dotenv.config();

const router = express.Router();

// Middleware para autenticar y extraer familia_id del token
const authenticate = (req: any, res: any, next: any) => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Acceso denegado. No hay token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as any;
    req.user = decoded; // Guardamos el usuario en la request
    next();
  } catch (error) {
    res.status(401).json({ message: "Token inválido o expirado" });
  }
};

// Endpoint para obtener cliente/Proveedor/Servicio según familia_id
router.get("/clientes/familia/:id", authenticate, async (req: any, res: any) => {
  try {
    const { id } = req.params;


    const result = await pool.query(
      `SELECT ut.id_tipo_familia,
      c.razon_comercial, 
      c.nombre_comercial, 
      con.nombre_contacto,
      STRING_AGG(DISTINCT t.numero, ', ') AS telefonos,
      STRING_AGG(DISTINCT co.correo, ', ') AS correos,
      STRING_AGG(DISTINCT t.numero2, ', ') AS telefonos2,
      STRING_AGG(DISTINCT co.correo2, ', ') AS correos2
      FROM clientes c
      LEFT JOIN usuario_tipo_familia ut ON c.id_tipo_familia = ut.id_tipo_familia
      LEFT JOIN contactos con ON c.id_cliente = con.id_cliente
      LEFT JOIN telefonos t ON con.id_contacto = t.id_contacto
      LEFT JOIN correos co ON con.id_contacto = co.id_contacto
      where ut.id_tipo_familia = $1
      GROUP BY c.razon_comercial, c.nombre_comercial, con.nombre_contacto, c.id_tipo_familia, ut.id_tipo_familia;`,
      [id]
    );

    res.json(result.rows);
  } catch (error) {
    console.error("Error obteniendo clientes:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
});

export default router;
