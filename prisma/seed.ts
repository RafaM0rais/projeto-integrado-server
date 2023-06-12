import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";
const prisma = new PrismaClient();

async function main() {
  const passwordHash = await hash("admin", 8);
  await prisma.cliente.create({
    data: {
      fullname: "Rafael Felipe",
      email: "admin@admin.com",
      password: passwordHash,
      cellphone: "00900000000",
      isAdmin: true,
    },
  });
}

main();
