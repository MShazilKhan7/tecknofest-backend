import { url } from "inspector";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "src/prisma/schema.prisma",
  datasource: {
    url: process.env.DATABASE_URL || "prisma+postgres://accelerate.prisma-data.net/?api_key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqd3RfaWQiOjEsInNlY3VyZV9rZXkiOiJza19weUNVaWdwQmg4Z1JHYU1ZNGxNVUsiLCJhcGlfa2V5IjoiMDFLRTBCUVBWUlkxRFQ4WjlENUdFNVYwS1MiLCJ0ZW5hbnRfaWQiOiJiYjY1YmI2ODE2OTVlMzYwYTQ5YWU0Y2FmYTNjMWE1MTQ5Njc2ZTY0MTE4NjE2MDYwNmZkMzQwYTAwYzllMjdmIiwiaW50ZXJuYWxfc2VjcmV0IjoiYzkyY2Y1YzYtZjZiZS00OGJhLWI4NzgtMTBkZmFjNGQ0YjZiIn0.vmMXKci1Zox1EEy6xe0f7LoWZ2f5CW8LQoCycFJMcuM",
  }
});
