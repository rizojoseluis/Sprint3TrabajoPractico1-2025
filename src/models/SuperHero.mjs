//Capa SuperHero.mjs

import mongoose from "mongoose";

const superheroSchema = new mongoose.Schema({
    nombreSuperHeroe: {type: String, required:true},
    nombreReal: {type: String, required:true},
    edad: {type: Number, min: 0, required: true},
    planetaOrigen: {type: String, default: 'Desconocido'},
    debilidad: {type: String},
    poderes: {type: [String], required: true}, //Valido en el modelo que sea un array
    aliados: {type: [String]},
    enemigos: {type:[String]},
    creador: String,
    createdAt: {type: Date, default: Date.now},

  });

  const SuperHero = mongoose.model('SuperHero', superheroSchema, 'Grupo-02');
  export default SuperHero