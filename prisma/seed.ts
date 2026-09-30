import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient, Role } from "../src/generated/prisma/client";
import * as bcrypt from "bcryptjs";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL no está definida");
}

const adapter = new PrismaPg({
  connectionString,
});

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  // Limpiamos primero los datos para evitar duplicados
  await prisma.user.deleteMany();
  await prisma.tenant.deleteMany();

  // Crear tenants
  const tenant1 = await prisma.tenant.create({
    data: {
      name: "Tech Solutions",
    },
  });

  const tenant2 = await prisma.tenant.create({
    data: {
      name: "Marketing Pro",
    },
  });

  const tenant3 = await prisma.tenant.create({
    data: {
      name: "Consulting Experts",
    },
  });

  // Cifrar contraseña de prueba
  const passwordHash = await bcrypt.hash("123456", 10);

  // Crear usuarios relacionados con los tenants
  await prisma.user.create({
    data: {
      email: "admin@techsolutions.com",
      name: "Administrador",
      password: passwordHash,
      telephone: "88888888",
      role: Role.ADMIN,
      tenantId: tenant1.id,
    },
  });

  await prisma.user.create({
    data: {
      email: "usuario@marketingpro.com",
      name: "Usuario Marketing",
      password: passwordHash,
      telephone: "77777777",
      role: Role.USER,
      tenantId: tenant2.id,
    },
  });

  await prisma.user.create({
    data: {
      email: "usuario@consulting.com",
      name: "Usuario Consulting",
      password: passwordHash,
      telephone: "66666666",
      role: Role.USER,
      tenantId: tenant3.id,
    },
  });

  console.log("Seeder ejecutado correctamente.");
}

main()
  .catch((error) => {
    console.error("Error al ejecutar el seeder:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });