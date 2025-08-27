import User from "../models/User.js";
import {
  sendVerificationEmail,
  sendEmailPasswordReset,
} from "../emails/authEmailService.js";
import { generateJWT, uniqueId } from "../utils/index.js";

const register = async (req, res) => {
  // Valida todos los campos
  if (Object.values(req.body).includes("")) {
    return res
      .status(400)
      .json({ message: "Todos los campos son obligatorios" });
  }

  const { email, password, name } = req.body;

  // Evitar registros duplicados
  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ message: "El usuario ya está registrado" });
  }

  //Validar la extensión del password
  const MIN_PASSWORD_LENGTH = 8;
  if (password.trim().length < MIN_PASSWORD_LENGTH) {
    return res.status(400).json({
      message: `La contraseña debe tener al menos ${MIN_PASSWORD_LENGTH} caracteres`,
    });
  }

  try {
    const user = new User(req.body);
    const result = await user.save();

    const { name, email, token } = result;
    sendVerificationEmail({ name, email, token });

    return res.status(201).json({
      message:
        "Usuario registrado exitosamente, revisa tu email para confirmar tu cuenta",
    });
  } catch (error) {
    console.error("Error al registrar usuario:", error);
    return res.status(500).json({ message: "Error al registrar usuario" });
  }
};

const verifyAccount = async (req, res) => {
  const { token } = req.params;

  // Buscar el usuario por el token
  const user = await User.findOne({ token });

  if (!user) {
    return res
      .status(401)
      .json({ message: "Token inválido o usuario no encontrado" });
  }

  // Si el token es válido, activar la cuenta del usuario
  try {
    user.verified = true;
    user.token = "";
    await user.save();
    return res.status(200).json({ message: "Cuenta verificada exitosamente" });
  } catch (error) {
    console.error("Error al verificar cuenta:", error);
    return res.status(500).json({ message: "Error al verificar cuenta" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  // Verificar que el usuario exista
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: "El usuario no existe" });
  }

  // Revisar si el usuario confirmo su cuenta
  if (!user.verified) {
    return res
      .status(401)
      .json({ message: "Tu cuenta no ha sido verificada aún" });
  }

  // Comprobar el password
  if (await user.comparePassword(password)) {
    // Generar el token
    const token = generateJWT(user._id);
    return res.status(200).json({ token });
  } else {
    return res.status(401).json({ message: "La contraseña es incorrecta" });
  }
};

// Forgot password
const forgotPassword = async (req, res) => {
  const { email } = req.body;

  // Verificar que el usuario exista
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({ message: "El usuario no existe" });
  }

  // Generar un token para restablecer la contraseña
  try {
    user.token = uniqueId();
    const result = await user.save();
    // Enviar correo electrónico con instrucciones para restablecer la contraseña
    await sendEmailPasswordReset({
      name: result.name,
      email: result.email,
      token: result.token,
    });
    return res.status(200).json({
      message:
        "Se ha enviado un correo electrónico para restablecer la contraseña",
    });
  } catch (error) {
    console.error("Error al generar token para restablecer contraseña:", error);
  }
};

const validateResetToken = async (req, res) => {
  const { token } = req.params;

  // Verificar si el token es válido
  const isValidToken = await User.findOne({ token });
  if (!isValidToken) {
    return res.status(400).json({ message: "Token inválido" });
  }
  return res.status(200).json({ message: "Token válido" });
};

const updatePassword = async (req, res) => {
  const { token } = req.params;

  // Verificar si el token es válido
  const user = await User.findOne({ token });
  if (!user) {
    return res.status(400).json({ message: "Token inválido" });
  }

  const { password } = req.body;

  try {
    user.token = "";
    user.password = password;
    await user.save();
    return res
      .status(200)
      .json({ message: "Contraseña actualizada correctamente" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Error al actualizar la contraseña" });
  }
};

// Obtener información del usuario autenticado
const user = async (req, res) => {
  const { user } = req;
  return res.status(200).json(user);
};

// Obtener información del usuario tipo admin
const admin = async (req, res) => {
  const { user } = req;
  if (!user.admin) {
    return res.status(403).json({ message: "Acceso no autorizado" });
  }

  return res.status(200).json(user);
};

export {
  register,
  verifyAccount,
  login,
  forgotPassword,
  validateResetToken,
  updatePassword,
  user,
  admin,
};
