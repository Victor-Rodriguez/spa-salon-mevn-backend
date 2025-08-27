import express from "express";
import {
  createService,
  getServices,
  getServiceById,
  updateService,
  deleteService,
} from "../controllers/servicesController.js";

const router = express.Router();

router
  .route("/")
  .post(createService) // Crear un nuevo servicio
  .get(getServices); // Obtener todos los servicios

router
  .route("/:id")
  .get(getServiceById) // Obtener un servicio por su id
  .put(updateService) // Actualizar un servicio
  .delete(deleteService); // Eliminar un servicio

export default router;
