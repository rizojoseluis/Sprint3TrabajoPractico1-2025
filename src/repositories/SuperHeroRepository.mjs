//Capa SuperHeroRepository.mjs

import SuperHero from "../models/superHero.mjs";
import IRepository from "./Irepository.mjs";

class SuperHeroRepository extends IRepository{

    //Creamos un nuevo Super Heroe
    
    async crearSuperHeroe(data){
        const nuevoSuperHeroe = new SuperHero(data);
        return await nuevoSuperHeroe.save(); //Guardamos el superheroe en la db
    }

    //Actualizamos super héroe por su ID

    async actualizarSuperHeroe (id, data) {
        return await SuperHero.findByIdAndUpdate(id, data, {new: true, runValidators: true});
    }

    //Obtengo los super heroes por ID

    async obtenerPorId(id){
        return await SuperHero.findById(id);
    }

    async obtenerTodos(){
        return await SuperHero.find({});
    }

    async buscarPorAtributo(atributo, valor) {
        const query = { [atributo]: valor }; 

        return await SuperHero.find(query);
        
    }
    async obtenerMayoresDe30(){            
        return await SuperHero.find({ 
            edad: { $gt: 30 }, 
            planetaOrigen: 'Tierra',
            poderes: { 
                $exists: true, //Me aseguro que el campo existe
                $type: "array", // Verifico que sea un array 
                $gte: 2 } //Que tenga 2 o más elementos.
        });
  
}}

export default new SuperHeroRepository();