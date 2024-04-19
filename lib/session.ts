import prisma from "./prisma";

export const createSession = async (userId: any) => {
    // Store the session in the database associated with the user ID
    await prisma.session.create({
      data: {
        userId: userId,
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // Expires in 30 days
      }
    });
  };