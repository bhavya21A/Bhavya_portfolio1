import { randomUUID } from "crypto";
import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import express from "express";
import mongoose from "mongoose";
import nodemailer from "nodemailer";
import Contact from "../models/contact.js";

const router = express.Router();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataFile = path.join(__dirname, "..", "data", "contacts.json");

router.get("/health", (req, res) => {
  res.json({
    success: true,
    route: "contact",
    storage: mongoose.connection.readyState === 1 ? "mongodb" : "fallback-json",
  });
});

router.post("/", async (req, res, next) => {
  try {
    const payload = normalizePayload(req.body, req);
    const errors = validatePayload(payload);

    if (Object.keys(errors).length) {
      res.status(422).json({
        success: false,
        message: "Validation failed",
        errors,
      });
      return;
    }

    const savedContact =
      mongoose.connection.readyState === 1
        ? await Contact.create(payload)
        : await saveToJson(payload);

    const emailQueued = await sendEmailNotification(payload);

    res.status(201).json({
      success: true,
      message: "Message received",
      id: savedContact._id || savedContact.id,
      storage: savedContact.storage || "mongodb",
      emailQueued,
    });
  } catch (error) {
    next(error);
  }
});

function normalizePayload(body, req) {
  return {
    name: clean(body.name),
    email: clean(body.email).toLowerCase(),
    subject: clean(body.subject),
    message: clean(body.message),
    source: clean(body.source || "portfolio"),
    ipAddress: req.ip,
    userAgent: req.get("user-agent") || "",
  };
}

function clean(value) {
  return String(value || "")
    .trim()
    .replace(/[<>]/g, "");
}

function validatePayload(payload) {
  const errors = {};
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (payload.name.length < 2 || payload.name.length > 80) {
    errors.name = "Name must be between 2 and 80 characters.";
  }

  if (!emailPattern.test(payload.email)) {
    errors.email = "A valid email address is required.";
  }

  if (payload.subject.length < 4 || payload.subject.length > 120) {
    errors.subject = "Subject must be between 4 and 120 characters.";
  }

  if (payload.message.length < 12 || payload.message.length > 1500) {
    errors.message = "Message must be between 12 and 1500 characters.";
  }

  return errors;
}

async function saveToJson(payload) {
  await fs.mkdir(path.dirname(dataFile), { recursive: true });

  let contacts = [];

  try {
    const existing = await fs.readFile(dataFile, "utf8");
    contacts = JSON.parse(existing);
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
  }

  const record = {
    id: randomUUID(),
    ...payload,
    storage: "fallback-json",
    createdAt: new Date().toISOString(),
  };

  contacts.push(record);
  await fs.writeFile(dataFile, JSON.stringify(contacts, null, 2));

  return record;
}

async function sendEmailNotification(payload) {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, NOTIFY_TO } = process.env;

  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS || !NOTIFY_TO) {
    return false;
  }

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: Number(SMTP_PORT) === 465,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  });

  await transporter.sendMail({
    from: `"Portfolio Contact" <${SMTP_USER}>`,
    to: NOTIFY_TO,
    replyTo: payload.email,
    subject: `Portfolio inquiry: ${payload.subject}`,
    text: `Name: ${payload.name}
Email: ${payload.email}
Subject: ${payload.subject}

${payload.message}`,
  });

  return true;
}

export default router;
