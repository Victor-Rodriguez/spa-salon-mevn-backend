import nodemailer from "nodemailer";

// Create a test account or replace with real credentials.
export function createTransport(host, port, user, pass) {
  // Looking to send emails in production? Check out our Email API/SMTP product!
  return nodemailer.createTransport({
    host: host,
    port: port,
    auth: {
      user: user,
      pass: pass,
    },
  });
}
