import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import pool from './db';
import authRoutes from './src/routes/authRoutes';
import clienteRoutes from './src/routes/clienteRoutes';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

//Middlewares
app.use(cors());
app.use(express.json());
//app.use(express.urlencoded({ extended: true }));
app.use('/api/auth', authRoutes);
app.use('/api', clienteRoutes);


// Rutas básicas
app.get('/', (req, res) => {
  res.send('<h1>Servidor en ejecución</h1>');
});

app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});