import nodemailer from "nodemailer"; 
// 📧 Importa o Nodemailer
// Ele é a biblioteca responsável por enviar emails no Node.js

/* ======================================================
   🚀 CRIA O TRANSPORTER (CANAL DE ENVIO DE EMAILS)
====================================================== */
const transporter = nodemailer.createTransport({

  service: "gmail", 
  // 📌 Define que o serviço de email será o Gmail
  // Isso já configura automaticamente servidores SMTP do Google

  auth: {
    user: "luangabrieldsilva05@gmail.com",
    // 📤 Email que vai ENVIAR os emails (remetente)

    pass: "cedi fhnx lrln wnth",
    // 🔐 Senha de aplicativo do Gmail (App Password)
    // NÃO é a senha normal da conta
    // Serve para autenticar o sistema com segurança
  },
});

/* ======================================================
   📦 EXPORTA O TRANSPORTER
====================================================== */
export default transporter;
// 🔹 Isso permite usar esse sistema em qualquer arquivo
// Ex: ForgotPasswordService envia emails usando ele