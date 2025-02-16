import nodemailer from 'nodemailer';
export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, message } = req.body;
    const transporter = nodemailer.createTransport({
      service: 'gmail', // ou qualquer outro serviço de email
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    try {
      await transporter.sendMail({
        from: email,
        to: process.env.EMAIL_TO, // Seu email de recebimento
        subject: `Contact form submission from ${name}`,
        text: message,
        html: `<p>You have a new contact form submission</p><p><strong>Name: </strong> ${name}</p><p><strong>Email: </strong> ${email}</p><p><strong>Message: </strong> ${message}</p>`,
      });
      res.status(200).json({ message: 'Email sent successfully!' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error sending email' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
