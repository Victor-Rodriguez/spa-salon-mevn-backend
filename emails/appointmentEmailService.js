import { createTransport } from "../config/nodemailer.js";

export async function sendEmailNewAppointment({ date, time }) {
  const transporter = createTransport(
    process.env.EMAIL_HOST,
    process.env.EMAIL_PORT,
    process.env.EMAIL_USER,
    process.env.EMAIL_PASS
  );

  //Send email
  const info = await transporter.sendMail({
    from: '"Spa Salon" <citas@spasalon.com>',
    to: "admin@spasalon.com",
    subject: "Spa Salon - Nueva Cita",
    text: "Spa Salon - Nueva Cita",
    html: `<p>Hola Administrador, tienes una nueva cita programada.</p>
           <p>La cita será el día ${date} a las ${time} horas.</p>`,
  });

  console.log("Email sent:", info.messageId);
}

export async function sendEmailUpdateAppointment({ date, time }) {
  const transporter = createTransport(
    process.env.EMAIL_HOST,
    process.env.EMAIL_PORT,
    process.env.EMAIL_USER,
    process.env.EMAIL_PASS
  );

  //Send email
  const info = await transporter.sendMail({
    from: '"Spa Salon" <citas@spasalon.com>',
    to: "admin@spasalon.com",
    subject: "Spa Salon - Cita Actualizada",
    text: "Spa Salon - Cita Actualizada",
    html: `<p>Hola Administrador, un usuario ha modificado una cita.</p>
           <p>La nueva cita será el día ${date} a las ${time} horas.</p>`,
  });

  console.log("Email sent:", info.messageId);
}

export async function sendEmailCancelAppointment({ date, time }) {
  const transporter = createTransport(
    process.env.EMAIL_HOST,
    process.env.EMAIL_PORT,
    process.env.EMAIL_USER,
    process.env.EMAIL_PASS
  );

  //Send email
  const info = await transporter.sendMail({
    from: '"Spa Salon" <citas@spasalon.com>',
    to: "admin@spasalon.com",
    subject: "Spa Salon - Cita Cancelada",
    text: "Spa Salon - Cita Cancelada",
    html: `<p>Hola Administrador, un usuario ha cancelado una cita.</p>
           <p>La cita cancelada era el día ${date} a las ${time} horas.</p>`,
  });

  console.log("Email sent:", info.messageId);
}
