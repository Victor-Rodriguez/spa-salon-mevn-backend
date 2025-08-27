import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import cors from "cors";
import { db } from "./config/db.js";
import servicesRoutes from "./routes/servicesRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import appointmentRoutes from "./routes/appointmentRoutes.js";
import userRoutes from "./routes/userRoutes.js";

// Cargar variables de entorno
dotenv.config();

// Configuración de la app
const app = express();

// Middleware para leer datos via body
app.use(express.json());

// Conectar a la base de datos
db();

// Configurar CORS
const whitelist = [process.env.FRONTEND_URL, undefined];

const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.includes(origin)) {
      // Permite la conexión
      callback(null, true);
    } else {
      // No permite la conexión
      callback(new Error("Not allowed by CORS"));
    }
  },
};
app.use(cors(corsOptions));

// Definir una ruta
app.use("/api/services", servicesRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/users", userRoutes);

// Definir puerto
const PORT = process.env.PORT || 4000;

// Arrancar el servidor
app.listen(PORT, () => {
  console.log(colors.blue(`Servidor corriendo en http://localhost:${PORT}`));
});
