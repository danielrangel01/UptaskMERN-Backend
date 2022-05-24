import Proyecto from "../models/Proyecto.js";
import Tarea from '../models/Tarea.js'

const agregarTarea = async (req, res) => {

  const { proyecto } = req.body;

  const existeProyecto = await Proyecto.findById(proyecto);
  if (!existeProyecto) {
    const error = new Error("El proyecto no existe");
    return res.status(404).json({ msg: error.message });
  }

  if (existeProyecto.creador.toString() !== req.usuario._id.toString()) {
    const error = new Error("No tiene los permisos para añadir tareas");
    return res.status(404).json({ msg: error.message });
  }

  try {
    const tareAlmacenada = await Tarea.create(req.body);
    res.json(tareAlmacenada)
  } catch (error) {
    conso.log(error);
  }
};

const obtenerTarea = async (req, res) => {

  const {id} = req.params

  const tarea = await Tarea.findById(id).populate("proyecto");

  if(tarea.proyecto.creador.toString() !== req.usuario._id.toString()){
    
  }

  console.log(tarea)

};

const actualizarTarea = async (req, res) => {};

const eliminarTarea = async (req, res) => {};

const cambiarEstado = async (req, res) => {};

export {
  agregarTarea,
  obtenerTarea,
  actualizarTarea,
  eliminarTarea,
  cambiarEstado,
};
