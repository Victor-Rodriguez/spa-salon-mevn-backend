import Services from "../models/Services.js";
import { validateObjectId, handleNotFoundError } from "../utils/index.js";

const createService = async (req, res) => {
  if (Object.values(req.body).includes("")) {
    return res
      .status(400)
      .json({ message: "Todos los campos son obligatorios" });
  }

  // Almacenamos el nuevo servicio
  try {
    const services = new Services(req.body);
    await services.save();
    return res.status(201).json({ message: "Servicio creado correctamente" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error al crear el servicio" });
  }
};

// Obtener todos los servicios
const getServices = async (req, res) => {
  try {
    const services = await Services.find();
    return res.json(services);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error al obtener los servicios" });
  }
};

// Obtener un servicio por su id
const getServiceById = async (req, res) => {
  const { id } = req.params;
  // Validar un object id
  if (validateObjectId(id, res)) return;

  // Validar si existe el servicio
  const service = await Services.findById(id);
  if (!service) {
    return handleNotFoundError("Servicio no encontrado", res);
  }

  // Mostrar el servicio
  return res.json(service);
};

// Actualizar un servicio
const updateService = async (req, res) => {
  const { id } = req.params;

  if (validateObjectId(id, res)) return;

  const service = await Services.findById(id);
  if (!service) {
    return handleNotFoundError("Servicio no encontrado", res);
  }

  // Actualizar el servicio
  service.set(req.body);

  try {
    await service.save();
    return res.json({ message: "Servicio actualizado correctamente" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error al actualizar el servicio" });
  }
};

// Eliminar un servicio
const deleteService = async (req, res) => {
  const { id } = req.params;

  if (validateObjectId(id, res)) return;

  const service = await Services.findById(id);
  if (!service) {
    return handleNotFoundError("Servicio no encontrado", res);
  }

  try {
    await service.deleteOne();
    return res.json({ message: "Servicio eliminado correctamente" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error al eliminar el servicio" });
  }
};

export {
  createService,
  getServices,
  getServiceById,
  updateService,
  deleteService,
};
