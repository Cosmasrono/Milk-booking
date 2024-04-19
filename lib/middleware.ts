import {getSession}  from '@/lib/session';

export const authMiddleware = async (req: { cookies: { sessionToken: any; }; userId: any; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { message: string; }): void; new(): any; }; }; }, next: () => void) => {
  const sessionToken = req.cookies.sessionToken;

  if (!sessionToken) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const userId = await getSession(sessionToken);

    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Attach the user ID to the request object
    req.userId = userId;
    next();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};