import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    db: {
      provider: "sqlite",
      adapter: "file:./dev.db", // ملف قاعدة البيانات
    },
  },
});
