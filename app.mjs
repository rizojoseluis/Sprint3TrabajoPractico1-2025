//Configuración de la Conexión con el usuario del Grupo 02

//Capa app.mjs

import express from 'express';
import {connectDB} from './src/config/dbConfig.mjs';
import superHeroRoutes from './src/routes/superHeroRoutes.mjs';

const app = express();
const PORT = process.env.PORT || 3000;

//Midleware para parsear JSON

app.use(express.json());

//Conexión a MongoDB
connectDB();

//Configuración de rutas
app.use('/api', superHeroRoutes);

//Manejo de erroes para rutas no encontradas
app.use((req, res)=>{
    res.status(404).send({mensaje: "Ruta no encontrada"});
});

//Iniciar el servidor
app.listen(PORT, ()=>{
    console.log(`Servidor escuchando en el puerto ${PORT}`);

});
