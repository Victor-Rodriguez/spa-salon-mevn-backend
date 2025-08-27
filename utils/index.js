import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { format } from "date-fns";
import { es } from "date-fns/locale";

function validateObjectId(id, res) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Id no válido" });
  }
}

function handleNotFoundError(message, res) {
  return res.status(404).json({ message: message });
}

const uniqueId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
};

const generateJWT = (id) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
  return token;
};

function formatDate(date) {
  return format(date, "PPPP", { locale: es });
}

export {
  validateObjectId,
  handleNotFoundError,
  uniqueId,
  generateJWT,
  formatDate,
};
