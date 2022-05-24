import Proyecto from "../models/Proyecto.js";

const obtenerProyectos = async (req, res) => {
  const proyectos = await Proyecto.find().where("creador").equals(req.usuario);
  res.json(proyectos);
};

const nuevoProyecto = async (req, res) => {
  const proyecto = new Proyecto(req.body);
  proyecto.creador = req.usuario._id;

  try {
    const proyectoAlmacenado = await proyecto.save();
    res.json(proyectoAlmacenado);
  } catch (error) {
    console.log(error);
  }
};

const obtenerProyecto = async (req, res) => {
  const { id } = req.params;
  const proyecto = await Proyecto.findById(id);
  if (!proyecto) {
    return res.status(404).json({ msg: "No encontrado" });
  }
  if (proyecto.creador.toString() !== req.usuario._id.toString()) {
    return res.status(404).json({ msg: "Accion no valida" });
  }

  res.json(proyecto);
};

const editarProyecto = async (req, res, next) => {

  const { id } = req.params;
  const proyecto = await Proyecto.findById(id);
  if (!proyecto) {
    return res.status(404).json({ msg: "No encontrado" });
  }
  if (proyecto.creador.toString() !== req.usuario._id.toString()) {
    return res.status(404).json({ msg: "Accion no valida" });
  }

  proyecto.nombre = req.body.nombre || proyecto.nombre;
  proyecto.descripcion = req.body.descripcion || proyecto.descripcion;
  proyecto.fechaEntrega = req.body.fechaEntrega || proyecto.fechaEntrega;
  proyecto.cliente = req.body.cliente || proyecto.cliente;

  try {

    const proyectoAlmacenado = await proyecto.save()
    res.json(proyectoAlmacenado);
  } catch (error) {

    console.log(error);
    
  }



};

const eliminarProyecto = async (req, res, next) => {

  const { id } = req.params;
  const proyecto = await Proyecto.findById(id);
  if (!proyecto) {
    return res.status(404).json({ msg: "No encontrado" });
  }
  if (proyecto.creador.toString() !== req.usuario._id.toString()) {
    return res.status(404).json({ msg: "Accion no valida" });
  }

  try {

    await proyecto.deleteOne();
    res.json({ msg: "Proyecto Eliminado"})
    
  } catch (error) {
    console.log(error)
  }


};

const agregarColaborador = async (req, res, next) => {};

const eliminarColaborador = async (req, res, next) => {};

const obtenerTareas = async (req, res, next) => {};

export {
  obtenerProyecto,
  nuevoProyecto,
  obtenerProyectos,
  editarProyecto,
  eliminarProyecto,
  agregarColaborador,
  eliminarColaborador,
  obtenerTareas,
};
