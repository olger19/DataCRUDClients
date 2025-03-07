import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import pool from "../../db";
import { Contacto } from "../types";

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
    console.log("Datos decodificados del token:", decoded);
    next();
  } catch (error) {
    res.status(401).json({ message: "Token inválido o expirado" });
  }
};

//obtener cliente
router.get("/clientes-data/:id", authenticate, async (req: any, res: any) => {
  const client = await pool.connect();
  try {
    const { id } = req.params;
    const result = await client.query(
      `SELECT c.id_cliente, c.razon_comercial, c.nombre_comercial, c.tipo_doc, c.nro_doc, c.ciudad, c.direccion, c.nombre_vendedor, c.rubro,
              con.id_contacto, con.nombre_contacto, con.cargo_contacto,
              t.id_telefono, t.numero AS telefono_numero, t.numero2 AS telefono_numero2,
              co.id_correo, co.correo AS correo_principal, co.correo2 AS correo_secundario
       FROM clientes c
       LEFT JOIN contactos con ON c.id_cliente = con.id_cliente
       LEFT JOIN telefonos t ON con.id_contacto = t.id_contacto
       LEFT JOIN correos co ON con.id_contacto = co.id_contacto
       WHERE c.id_cliente = $1
       ORDER BY c.id_cliente, con.id_contacto, t.id_telefono, co.id_correo`,
      [id]
    );

    const cliente = result.rows.reduce((acc, row) => {
      if (!acc) {
        acc = {
          id_cliente: row.id_cliente,
          razonComercial: row.razon_comercial,
          nombreComercial: row.nombre_comercial,
          tipoDoc: row.tipo_doc,
          nroDoc: row.nro_doc,
          ciudad: row.ciudad,
          direccion: row.direccion,
          nombreVendedor: row.nombre_vendedor,
          rubro: row.rubro,
          contacto: [],
        };
      }

      const contactoIndex = acc.contacto.findIndex(
        (contacto: Contacto) => contacto.id_contacto === row.id_contacto
      );

      if (contactoIndex === -1) {
        acc.contacto.push({
          id_contacto: row.id_contacto,
          nombre_contacto: row.nombre_contacto,
          cargo_contacto: row.cargo_contacto,
          telefonos: [],
          correos: [],
        });
      }

      const currentContacto = acc.contacto.find(
        (contacto: Contacto) => contacto.id_contacto === row.id_contacto
      );

      if (row.id_telefono) {
        currentContacto.telefonos.push({
          id_telefono: row.id_telefono,
          numero: row.telefono_numero,
          numero2: row.telefono_numero2,
        });
      }

      if (row.id_correo) {
        currentContacto.correos.push({
          id_correo: row.id_correo,
          correo: row.correo_principal,
          correo2: row.correo_secundario,
        });
      }

      return acc;
    }, null);

    res.json(cliente);
  } catch (error) {
    console.error("Error obteniendo cliente:", error);
    res.status(500).json({ message: "Error en el servidor" });
  } finally {
    client.release();
  }
});

// Endpoint para obtener cliente/Proveedor/Servicio según familia_id
router.get(
  "/clientes/familia/:id",
  authenticate,
  async (req: any, res: any) => {
    try {
      const { id } = req.params;

      const result = await pool.query(
        `SELECT ut.id_tipo_familia,
        c.id_cliente,
		c.tipo_doc,
		c.nro_doc,
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
      GROUP BY c.id_cliente,c.razon_comercial, c.nombre_comercial, con.nombre_contacto, c.id_tipo_familia, ut.id_tipo_familia, c.tipo_doc, nro_doc;`,
        [id]
      );

      res.json(result.rows);
    } catch (error) {
      console.error("Error obteniendo clientes:", error);
      res.status(500).json({ message: "Error en el servidor" });
    }
  }
);

// Endpoint para crear un nuevo cliente
router.post("/clientes/:id", authenticate, async (req: any, res: any) => {
  const client = await pool.connect();
  const { id } = req.params;

  try {
    const {
      razonComercial,
      nombreComercial,
      tipoDoc,
      nroDoc,
      ciudad,
      direccion,
      nombreVendedor,
      rubro,
      contacto,
    } = req.body;
    console.log("Datos del cliente:", req.body);

    if (!id) {
      console.log("id:", id);
      return res.status(400).json({ message: "El campo 'id' obligatorio" });
    }
    if (!razonComercial) {
      return res
        .status(400)
        .json({ message: "El campo 'razonComercial' es obligatorio" });
    }

    if (!nombreComercial) {
      return res
        .status(400)
        .json({ message: "El campo 'nombreComercial' es obligatorio" });
    }

    if (!tipoDoc) {
      return res
        .status(400)
        .json({ message: "El campo 'tipoDoc' es obligatorio" });
    }

    if (!nroDoc) {
      return res
        .status(400)
        .json({ message: "El campo 'nroDoc' es obligatorio" });
    }

    if (!ciudad) {
      return res
        .status(400)
        .json({ message: "El campo 'ciudad' es obligatorio" });
    }

    if (!direccion) {
      return res
        .status(400)
        .json({ message: "El campo 'direccion' es obligatorio" });
    }

    if (!nombreVendedor) {
      return res
        .status(400)
        .json({ message: "El campo 'nombreVendedor' es obligatorio" });
    }

    if (!rubro) {
      return res
        .status(400)
        .json({ message: "El campo 'rubro' es obligatorio" });
    }

    if (!contacto) {
      return res
        .status(400)
        .json({ message: "El campo 'contacto' es obligatorio" });
    }

    await client.query("BEGIN");

    const result = await client.query(
      `INSERT INTO clientes (id_tipo_familia, razon_comercial, nombre_comercial, tipo_doc, nro_doc, ciudad, direccion, nombre_vendedor, rubro)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING id_cliente`,
      [
        id,
        razonComercial,
        nombreComercial,
        tipoDoc,
        nroDoc,
        ciudad,
        direccion,
        nombreVendedor,
        rubro,
      ]
    );

    const id_cliente = result.rows[0].id_cliente;

    for (const contactos of contacto) {
      const { nombre_contacto, cargo_contacto, telefonos, correos } = contactos;

      const contactoResult = await client.query(
        `INSERT INTO contactos (id_cliente, nombre_contacto, cargo_contacto)
        VALUES ($1, $2, $3)
        RETURNING id_contacto`,
        [id_cliente, nombre_contacto, cargo_contacto]
      );

      const id_contacto = contactoResult.rows[0].id_contacto;
      if (Array.isArray(telefonos)) {
        for (const telefono of telefonos) {
          await client.query(
            `INSERT INTO telefonos (id_contacto, numero, numero2)
          VALUES ($1, $2, $3)`,
            [id_contacto, telefono.numero, telefono.numero2]
          );
        }
      }
      if (Array.isArray(correos)) {
        for (const correo of correos) {
          await client.query(
            `INSERT INTO correos (id_contacto, correo, correo2)
          VALUES ($1, $2, $3)`,
            [id_contacto, correo.correo, correo.correo2]
          );
        }
      }
    }

    await client.query("COMMIT");
    res.status(201).json({ message: "Cliente creado exitosamente" });
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Error creando cliente:", error);
    res.status(500).json({ message: "Error en el servidor" });
  } finally {
    client.release();
  }
});

// Endpoint para actualizar un cliente
router.put("/clientes/:id", authenticate, async (req: any, res: any) => {
  const client = await pool.connect();
  try {
    const { id } = req.params;
    console.log("id cliente es: ", id);
    console.log("Parametros del req.params: ", req.params); //Solo es el id
    const {
      razonComercial,
      nombreComercial,
      tipoDoc,
      nroDoc,
      ciudad,
      direccion,
      nombreVendedor,
      rubro,
      contacto,
    } = req.body;
    console.log("Datos del cliente a actualizar:", req.body);

    // Verificación de campos obligatorios
    if (
      !razonComercial ||
      !nombreComercial ||
      !tipoDoc ||
      !nroDoc ||
      !ciudad ||
      !direccion ||
      !nombreVendedor ||
      !rubro ||
      !contacto
    ) {
      return res.status(400).json({
        message: "Todos los campos son obligatorios. ",
      });
    }

    await client.query("BEGIN");

    // Actualizar cliente
    await client.query(
      `UPDATE clientes
      SET razon_comercial = $1, nombre_comercial = $2, tipo_doc = $3, nro_doc = $4, ciudad = $5, direccion = $6, nombre_vendedor = $7, rubro = $8
      WHERE id_cliente = $9`,
      [
        razonComercial,
        nombreComercial,
        tipoDoc,
        nroDoc,
        ciudad,
        direccion,
        nombreVendedor,
        rubro,
        id, //id Cliente
      ]
    );

    // Actualizar contactos si están presentes
    if (contacto && contacto.length > 0) {
      for (const contactos of contacto) {
        const {
          id_contacto,
          nombre_contacto,
          cargo_contacto,
          telefonos,
          correos,
        } = contactos;
        console.log("El contacto es: ", id_contacto);

        // Verificar si el id_contacto está definido
        if (!id_contacto) {
          console.error("id_contacto no definido para el contacto:", contactos);
          continue; // Saltar a la siguiente iteración si id_contacto no está definido
        }
        // Actualizar contacto
        await client.query(
          `UPDATE contactos
          SET nombre_contacto = $1, cargo_contacto = $2
          WHERE id_contacto = $3 AND id_cliente = $4`,
          [nombre_contacto, cargo_contacto, id_contacto, id]
        );

        // Actualizar teléfonos
        if (telefonos && telefonos.length > 0) {
          for (const telefono of telefonos) {
            const { id_telefono, numero, numero2 } = telefono;
            if (!id_telefono) {
              console.error(
                "id_telefono no definido para el teléfono:",
                telefono
              );
              continue; // Saltar a la siguiente iteración si id_telefono no está definido
            }
            await client.query(
              `UPDATE telefonos
              SET numero = $1, numero2 = $2
              WHERE id_contacto = $3 AND id_telefono = $4`,
              [numero, numero2, id_contacto, id_telefono]
            );
          }
        }

        // Actualizar correos
        if (correos && correos.length > 0) {
          for (const correo of correos) {
            const { id_correo, correo: email, correo2 } = correo;
            if (!id_correo) {
              console.error("id_correo no definido para el correo:", correo);
              continue; // Saltar a la siguiente iteración si id_correo no está definido
            }
            await client.query(
              `UPDATE correos
              SET correo = $1, correo2 = $2
              WHERE id_contacto = $3 AND id_correo = $4`,
              [email, correo2, id_contacto, id_correo]
            );
          }
        }
      }
    }

    await client.query("COMMIT");
    res.status(200).json({ message: "Cliente actualizado exitosamente" });
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Errsor actualizando cliente:", error);
    res.status(500).json({ message: "Error en el servidor" });
  } finally {
    client.release();
  }
});

// Endpoint para eliminar un cliente
router.delete("/clientes/:id", authenticate, async (req: any, res: any) => {
  const client = await pool.connect();
  try {
    const { id } = req.params;

    await client.query("BEGIN");

    // Eliminar correos asociados a los contactos del cliente
    await client.query(
      `DELETE FROM correos
      WHERE id_contacto IN (SELECT id_contacto FROM contactos WHERE id_cliente = $1)`,
      [id]
    );

    // Eliminar teléfonos asociados a los contactos del cliente
    await client.query(
      `DELETE FROM telefonos
      WHERE id_contacto IN (SELECT id_contacto FROM contactos WHERE id_cliente = $1)`,
      [id]
    );

    // Eliminar contactos asociados al cliente
    await client.query(
      `DELETE FROM contactos
      WHERE id_cliente = $1`,
      [id]
    );

    // Eliminar cliente
    await client.query(
      `DELETE FROM clientes
      WHERE id_cliente = $1`,
      [id]
    );

    await client.query("COMMIT");
    res.status(200).json({ message: "Cliente eliminado exitosamente" });
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Error eliminando cliente:", error);
    res.status(500).json({ message: "Error en el servidor" });
  } finally {
    client.release();
  }
});

// Endpoint para buscar clientes por coincidencias
router.get("/clientes/buscar", authenticate, async (req: any, res: any) => {
  const client = await pool.connect();
  try {
    const { query } = req.query;
    console.log("Consulta de búsqueda:", query);

    if (!query) {
      return res
        .status(400)
        .json({ message: "El parámetro de búsqueda es obligatorio" });
    }

    const result = await client.query(
      `SELECT c.id_cliente, c.razon_comercial, c.nombre_comercial, c.tipo_doc, c.nro_doc, c.ciudad, c.direccion, c.nombre_vendedor, c.rubro,
              STRING_AGG(DISTINCT con.nombre_contacto, ', ') AS contactos,
              STRING_AGG(DISTINCT t.numero, ', ') AS telefonos,
              STRING_AGG(DISTINCT co.correo, ', ') AS correos,
              STRING_AGG(DISTINCT co.correo2, ', ') AS correos2
       FROM clientes c
       LEFT JOIN contactos con ON c.id_cliente = con.id_cliente
       LEFT JOIN telefonos t ON con.id_contacto = t.id_contacto
       LEFT JOIN correos co ON con.id_contacto = co.id_contacto
       WHERE c.razon_comercial ILIKE $1
          OR c.nombre_comercial ILIKE $1
          OR c.ciudad ILIKE $1
          OR c.rubro ILIKE $1
          OR con.nombre_contacto ILIKE $1
          OR co.correo ILIKE $1
          OR co.correo2 ILIKE $1
       GROUP BY c.id_cliente, c.razon_comercial, c.nombre_comercial, c.tipo_doc, c.nro_doc, c.ciudad, c.direccion, c.nombre_vendedor, c.rubro`,
      [`%${query}%`]
    );

    res.json(result.rows);
  } catch (error) {
    console.error("Error buscando clientes:", error);
    res.status(500).json({ message: "Error en el servidor" });
  } finally {
    client.release();
  }
});

export default router;
