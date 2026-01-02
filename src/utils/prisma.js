const { PrismaClient } = require("@prisma/client");
require('dotenv').config();


const prismaClientSingleton = () => {
  return new PrismaClient({
    accelerateUrl: process.env.DATABASE_URL || "prisma+postgres://accelerate.prisma-data.net/?api_key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqd3RfaWQiOjEsInNlY3VyZV9rZXkiOiJza19weUNVaWdwQmg4Z1JHYU1ZNGxNVUsiLCJhcGlfa2V5IjoiMDFLRTBCUVBWUlkxRFQ4WjlENUdFNVYwS1MiLCJ0ZW5hbnRfaWQiOiJiYjY1YmI2ODE2OTVlMzYwYTQ5YWU0Y2FmYTNjMWE1MTQ5Njc2ZTY0MTE4NjE2MDYwNmZkMzQwYTAwYzllMjdmIiwiaW50ZXJuYWxfc2VjcmV0IjoiYzkyY2Y1YzYtZjZiZS00OGJhLWI4NzgtMTBkZmFjNGQ0YjZiIn0.vmMXKci1Zox1EEy6xe0f7LoWZ2f5CW8LQoCycFJMcuM", // <-- Your Prisma Accelerate URL here
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });
};

// Singleton to prevent multiple clients in dev
const globalForPrisma = globalThis;

const prisma = globalForPrisma.prisma || prismaClientSingleton();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

module.exports = prisma;
