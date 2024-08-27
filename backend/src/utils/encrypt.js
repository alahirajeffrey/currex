import crypto from "node:crypto";
import dotenv from "dotenv";

dotenv.config();

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY;
const ENCRYPTION_ALGORITHM = process.env.ENCRYPTION_ALGORITHM;

export const encrypt = (string) => {
  const iv = crypto.randomBytes(16);

  const cipher = crypto.createCipheriv(
    ENCRYPTION_ALGORITHM,
    ENCRYPTION_KEY,
    iv
  );
  let encrypted = cipher.update(string, "utf-8", "hex");
  encrypted += cipher.final("hex");

  return iv.toString("hex") + ":" + encrypted;
};

export const decrypt = (encryptedString) => {
  const [ivHex, encrypted] = encryptedString.split(":");
  const iv = Buffer.from(ivHex, "hex");

  const decipher = crypto.createDecipheriv(
    ENCRYPTION_ALGORITHM,
    ENCRYPTION_KEY,
    iv
  );
  let decrypted = decipher.update(encrypted, "hex", "utf-8");
  decrypted += decipher.final("utf-8");

  return decrypted;
};
