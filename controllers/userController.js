import Appointment from "../models/Appointment.js";

const getUserAppointments = async (req, res) => {
  const { user } = req.params;

  // Verificar si el usuario tiene permiso para acceder a las citas
  if (user !== req.user._id.toString()) {
    return res.status(400).json({ message: "Acceso denegado" });
  }

  try {
    const query = req.user.admin
      ? {
          date: { $gte: new Date() }, // Si es admin, todas las citas futuras
        }
      : {
          user,
          date: { $gte: new Date() }, // Si no es admin, solo sus citas futuras
        };
    const appointments = await Appointment.find(query)
      .populate("services")
      .populate({ path: "user", select: "name email" })
      .sort({ date: "asc" });
    res.json(appointments);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Error al obtener las citas" });
  }
};

export { getUserAppointments };
