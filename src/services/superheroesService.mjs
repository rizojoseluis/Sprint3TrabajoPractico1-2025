//Capa superheroesService.mjs

import SuperHeroRepository from "../repositories/SuperHeroRepository.mjs";

export async function actualizarSuperHeroeService(id, data) {
    if(!data || Object.keys(data).length===0){
        throw new Error("No se encontraron datos para actualizar el Super Héroe");
    }

    const superheroeActualizado = await SuperHeroRepository.actualizarSuperHeroe(id, data);
    if(!superheroeActualizado){
        throw new Error ("Superhéroe no encontrado o no se pudo actualizar");
    }
    return superheroeActualizado;
}

export async function crearSuperHeroeService(data) {

    console.log("Entrando al servicio para crear un nuevo superheroe");
    return await SuperHeroRepository.crearSuperHeroe(data);
    
}

export async function obtenerSuperheroePorId(id) {
    return await SuperHeroRepository.obtenerPorId(id);
}

export async function obtenerTodosLosSuperheroes(){
    return await SuperHeroRepository.obtenerTodos();
}

export async function buscarSuperheroesPorAtributo(atributo, valor){
    return await SuperHeroRepository.buscarPorAtributo(atributo, valor);
}

export async function obtenerSuperheroesMayoresDe30(){
    console.log("Entrando al servicio obtenerSuperheroesMayoresDe30");
    return await SuperHeroRepository.obtenerMayoresDe30();

}