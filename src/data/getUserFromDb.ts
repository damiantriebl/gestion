import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getUserFromDb(email: string, passwordHash: string) {
  try {
    // Busca el usuario en la base de datos
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    // Verifica si el hash de la contraseña coincide
    if (user && user.password === passwordHash) {
      return {
        id: user.id,
        email: user.email,
        name: user.name,
        // Incluye otros campos necesarios
      };
    }

    // Si no coincide, devuelve null
    return null;
  } catch (error) {
    console.error("Error fetching user from database:", error);
    throw new Error("Database error");
  }
}
