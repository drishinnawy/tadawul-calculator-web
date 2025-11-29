import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // أضف زيارة جديدة
  await prisma.visit.create({ data: {} });

  // احسب العدد
  const count = await prisma.visit.count();

  res.status(200).json({ count });
}
