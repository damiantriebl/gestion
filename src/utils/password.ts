import { createHmac, randomBytes } from "crypto";

export function saltAndHashPassword(plainPassword: string): { hash: string; salt: string } {
  const salt = randomBytes(16).toString("hex"); 
  const hash = createHmac("sha256", salt).update(plainPassword).digest("hex"); 

  return { hash, salt };
}
