import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import pool from './db';
import authRoutes from './routes/authRoutes';
import clienteRoutes from './routes/clienteRoutes';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

//Middlewares
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api', clienteRoutes);

/** 
pool.connect()
  .then(() => console.log('📌 Conectado a PostgreSQL'))
  .catch(err => {
    console.error('❌ Error de conexión a PostgreSQL', err);
    process.exit(1); // Detiene el servidor si falla la conexión
  });
 */

// Rutas básicas
app.get('/', (req, res) => {
  res.send('<h1>Servidor en ejecución</h1>');
});

app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});