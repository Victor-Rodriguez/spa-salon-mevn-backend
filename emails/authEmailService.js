import { createTransport } from "../config/nodemailer.js";

export async function sendVerificationEmail({ name, email, token }) {
  const transporter = createTransport(
    process.env.EMAIL_HOST,
    process.env.EMAIL_PORT,
    process.env.EMAIL_USER,
    process.env.EMAIL_PASS
  );

  //Send email
  const info = await transporter.sendMail({
    from: '"Spa Salon" <cuentas@spasalon.com>',
    to: email,
    subject: "Spa Salon - Confirma tu cuenta",
    text: "Spa Salon - Confirma tu cuenta",
    html: `<p>Hola ${name},</p>
           <p>Por favor confirma tu cuenta haciendo clic en el siguiente enlace:</p>
           <a href="${process.env.FRONTEND_URL}/auth/confirmar-cuenta/${token}">Confirmar cuenta</a>
           <p>Si no has creado una cuenta, puedes ignorar este email.</p>
           <p>Gracias,</p>
           <p>El equipo de Spa Salon</p>`,
  });

  console.log("Email sent:", info.messageId);
}

export async function sendEmailPasswordReset({ name, email, token }) {
  const transporter = createTransport(
    process.env.EMAIL_HOST,
    process.env.EMAIL_PORT,
    process.env.EMAIL_USER,
    process.env.EMAIL_PASS
  );

  //Send email
  const info = await transporter.sendMail({
    from: '"Spa Salon" <cuentas@spasalon.com>',
    to: email,
    subject: "Spa Salon - Restablece tu contraseña",
    text: "Spa Salon - Restablece tu contraseña",
    html: `<p>Hola ${name},</p>
           <p>Has solicitado restablecer tu contraseña. Haz clic en el siguiente enlace para continuar:</p>
           <a href="${process.env.FRONTEND_URL}/auth/olvide-password/${token}">Restablecer contraseña</a>
           <p>Si no solicitaste este cambio, puedes ignorar este email.</p>
           <p>Gracias,</p>
           <p>El equipo de Spa Salon</p>`,
  });

  console.log("Email sent:", info.messageId);
}

