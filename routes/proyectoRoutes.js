import express from "express";
import {

    obtenerProyecto,
    nuevoProyecto,
    obtenerProyectos,
    editarProyecto,
    eliminarProyecto,
    agregarColaborador,
    eliminarColaborador,
    obtenerTareas

} from '../controllers/proyectoController.js'

import checkAuth from '../middleware/checkAuth.js'

const router = express.Router();

router.get('/', checkAuth, obtenerProyectos);
router.post('/', checkAuth, nuevoProyecto);

router.get("/:id", checkAuth,obtenerProyecto);
router.put("/:id", checkAuth,editarProyecto);
router.delete("/:id", checkAuth,eliminarProyecto);

router.get("/tareas/:id", checkAuth,obtenerTareas);
router.post("/agregar-colaborador/:id", checkAuth,agregarColaborador);
router.post("/eliminar-colaborador/:id", checkAuth,eliminarColaborador);


export default router;
