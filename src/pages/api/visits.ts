import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  // أضف زيارة جديدة
  await prisma.visit.create({ data: {} });

  // احسب العدد
  const count = await prisma.visit.count();

  res.status(200).json({ count });
}
