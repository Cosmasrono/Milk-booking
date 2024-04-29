// // pages/api/protected.js
// import { verifyToken } from '@/lib/auth';
// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

// export default async function handler(req: { headers: { authorization: string; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { message: string; }): any; new(): any; }; }; }) {
//   const token = req.headers.authorization?.split(' ')[1];

//   if (!token) {
//     return res.status(401).json({ message: 'Authorization token missing' });
//   }

//   const decoded = verifyToken(token);

//   if (!decoded) {
//     return res.status(403).json({ message: 'Invalid token' });
//   }

//   // Use type assertion
//   const { userId } = decoded as { userId: string };
//   const user = await prisma.user.findUnique({
//     where: {
//       id: userId,
//     },
//   });

//   // ...
// }