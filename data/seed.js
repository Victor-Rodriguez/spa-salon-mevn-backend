import dotenv from "dotenv";
import colors from "colors";
import { db } from "../config/db.js";
import Services from "../models/Services.js";
import { services } from "./spaServices.js";

dotenv.config();

await db();

async function seedDatabase() {
  try {
    await Services.insertMany(services);
    console.log(colors.green.bold("Datos importados correctamente"));
    process.exit(0);
  } catch (error) {
    console.error(colors.red.bold("Error al importar los datos:", error));
    process.exit(1);
  }
}

async function clearDatabase() {
  try {
    await Services.deleteMany();
    console.log(colors.green.bold("Base de datos limpiada correctamente"));
    process.exit(0);
  } catch (error) {
    console.error(colors.red.bold("Error al limpiar la base de datos:", error));
    process.exit(1);
  }
}

if (process.argv[2] === "--import") {
  seedDatabase();
} else {
  clearDatabase();
}
