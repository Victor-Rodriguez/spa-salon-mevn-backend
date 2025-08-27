import Appointment from "../models/Appointment.js";
import { parse, formatISO, startOfDay, endOfDay, isValid } from "date-fns";
import {
  validateObjectId,
  handleNotFoundError,
  formatDate,
} from "../utils/index.js";
import {
  sendEmailNewAppointment,
  sendEmailUpdateAppointment,
  sendEmailCancelAppointment,
} from "../emails/appointmentEmailService.js";

const createAppointment = async (req, res) => {
  const appointment = req.body;
  appointment.user = req.user._id.toString();

  try {
    const newAppointment = new Appointment(appointment);
    const result = await newAppointment.save();

    await sendEmailNewAppointment({
      date: formatDate(result.date),
      time: result.time,
    });

    return res.status(201).json({ message: "Cita agendada con éxito" });
  } catch (error) {
    console.error("Error al agendar cita:", error);
    return res.status(500).json({ error: "Error al agendar cita" });
  }
};

const getAppointmentByDate = async (req, res) => {
  const { date } = req.query;

  const newDate = parse(date, "dd/MM/yyyy", new Date()); //Formato que utiliza MongoDB
  if (!isValid(newDate)) {
    return res.status(400).json({ error: "Fecha inválida" });
  }
  const isoDate = formatISO(newDate);

  const appointments = await Appointment.find({
    date: {
      $gte: startOfDay(new Date(isoDate)),
      $lte: endOfDay(new Date(isoDate)),
    },
  }).select("time");

  return res.status(200).json(appointments);
};

const getAppointmentById = async (req, res) => {
  const { id } = req.params;
  // Validar un object id
  if (validateObjectId(id, res)) return;

  // Validar si existe la cita
  const appointment = await Appointment.findById(id).populate("services");

  if (!appointment) {
    return handleNotFoundError("Cita no encontrada", res);
  }

  // Validar que el usuario de la cita sea el mismo que el del token
  if (appointment.user.toString() !== req.user._id.toString()) {
    return res
      .status(403)
      .json({ error: "No tienes permiso para acceder a esta cita" });
  }

  // Mostrar la cita
  return res.json(appointment);
};

const updateAppointment = async (req, res) => {
  const { id } = req.params;
  // Validar un object id
  if (validateObjectId(id, res)) return;

  // Validar si existe la cita
  const appointment = await Appointment.findById(id).populate("services");

  if (!appointment) {
    return handleNotFoundError("Cita no encontrada", res);
  }

  // Validar que el usuario de la cita sea el mismo que el del token
  if (appointment.user.toString() !== req.user._id.toString()) {
    return res
      .status(403)
      .json({ error: "No tienes permiso para acceder a esta cita" });
  }

  // Actualizar la cita
  const { date, time, totalAmount, services } = req.body;

  appointment.date = date;
  appointment.time = time;
  appointment.totalAmount = totalAmount;
  appointment.services = services;

  try {
    const result = await appointment.save();
    await sendEmailUpdateAppointment({
      date: formatDate(result.date),
      time: result.time,
    });
    return res.status(200).json({ message: "Cita actualizada con éxito" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Error al actualizar cita" });
  }
};

const deleteAppointment = async (req, res) => {
  const { id } = req.params;
  console.log(id);

  // Validar un object id
  if (validateObjectId(id, res)) return;

  // Validar si existe la cita
  const appointment = await Appointment.findById(id).populate("services");

  if (!appointment) {
    return handleNotFoundError("Cita no encontrada", res);
  }

  // Validar que el usuario de la cita sea el mismo que el del token
  if (appointment.user.toString() !== req.user._id.toString()) {
    return res
      .status(403)
      .json({ error: "No tienes permiso para acceder a esta cita" });
  }

  // Cancelar la cita
  try {
    await appointment.deleteOne();
    await sendEmailCancelAppointment({
      date: formatDate(appointment.date),
      time: appointment.time,
    });

    return res.status(200).json({ message: "Cita cancelada con éxito" });
  } catch (error) {
    console.error("Error al cancelar cita:", error);
    return res.status(500).json({ error: "Error al cancelar cita" });
  }
};

export {
  createAppointment,
  getAppointmentByDate,
  getAppointmentById,
  updateAppointment,
  deleteAppointment,
};
