// Capa superheroesController.mjs

import{obtenerSuperheroePorId, obtenerTodosLosSuperheroes,
    buscarSuperheroesPorAtributo, obtenerSuperheroesMayoresDe30, crearSuperHeroeService,
    actualizarSuperHeroeService}
    from '../services/superheroesService.mjs';

import {renderizarSuperheroe, renderizarListaSuperheroes}
    from '../views/responseView.mjs';



export async function actualizarSuperHeroeController(req, res){
    try{
        const {id} = req.params; // Obtener el ID de los Superhéroes
        const data = req.body; // Obtener los datos desde el cuerpo de la solicitud
        
        const superheroeActualizado = await actualizarSuperHeroeService(id, data);

        res.status(200).send({
            mensaje: "Superhéroe actualizado exitosamente",
            data: superheroeActualizado
        });
    } catch (error){
        res.status(400).send({
            mensaje: "Error al actualizar el superhéroe",
            error: error.message
        });
    }
}


export async function crearSuperHeroeController(req, res) {
    try{
        console.log("entramos a superheroes controller");
        const nuevoSuperHeroe = await crearSuperHeroeService(req.body);
        res.status(201).send({
            mensaje: "Superhéroe creado exitosamente.",
            data: nuevoSuperHeroe
        });
    }catch(error){
        res.status(400).send({
            mensaje: "Error al crear el superheroe.",
            error: error.mensaje
        });

    }
}
    
export async function obtenerSuperheroePorIdController(req, res) {
    try{
        const {id} = req.params;
        const superheroe = await obtenerSuperheroePorId(id);
        if(!superheroe){
            return res.status(404).send({mensaje: 'Superheroe no encontrado'});
        }

        const superheroeFormateado = renderizarSuperheroe(superheroe);
        res.status(200).json(superheroeFormateado);
        } catch (error){
            res.status(500).send({mensaje: 'Error al obtener el superhéroe',
                error: error.message});
        }
}

export async function obtenerTodosLosSuperheroesController(req, res) {
    try{
        const superheroes = await obtenerTodosLosSuperheroes();
        const superheroeFormateados = renderizarListaSuperheroes(superheroes);
        res.status(200).json(superheroeFormateados);
    }catch (error){
        res.status(500).send({mensaje: 'Error al obtener los superhéroes',
            error: error.message});
    }
}

export async function buscarSuperheroesPorAtributoController(req, res) {
    try{
        const{atributo, valor} = req.params;
        const superheroes = await buscarSuperheroesPorAtributo(atributo, valor);
        if (superheroes.length ===0){
            return res.status(404).send(
                {mensaje: 'No se encontraron superhéroes con ese atributo'});
            }

            const superheroeFormateados = renderizarListaSuperheroes(superheroes);
            res.status(200).json(superheroeFormateados);
        } catch (error){
            res.status(500).send({mensaje: 'Error al buscar los superheroes',
                error: error.message});
        }
    }


    export async function obtenerSuperheroesMayoresDe30Controller(req, res) {
        try {
            console.log("Entrando a obtenerSuperheroesMayoresDe30Controller");
            const superheroes = await obtenerSuperheroesMayoresDe30();
            console.log("Superhéroes obtenidos:", superheroes);
            if (!superheroes || superheroes.length === 0) {
                console.log("No se encontraron superhéroes mayores de 30.");
                return res.status(404).send({
                    mensaje: 'No se encontraron superhéroes mayores de 30 años, del planeta Tierra y con al menos dos poderes.'
                });
            }
            const superheroeFormateados = renderizarListaSuperheroes(superheroes);
            console.log("Superhéroes formateados:", superheroeFormateados);
            res.status(200).json(superheroeFormateados);
        } catch (error) {
            console.error("Error al obtener superhéroes mayores de 30:", error.message);
            res.status(500).send({
                mensaje: 'Error al obtener superhéroes mayores de 30',
                error: error.message
            });
        }
    }