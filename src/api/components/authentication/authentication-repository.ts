import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getUserByEmail(email: string) {
  const result = await prisma.user.findUnique({
    where: { email: email },
  });

  return result;
}
