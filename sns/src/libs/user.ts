import prisma from "@/libs/prisma";

export async function getUserById(userId: number) {
  return await prisma.users.findUnique({
    where: { id: userId },
    select: { username: true },
  });
}
