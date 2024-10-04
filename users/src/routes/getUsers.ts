import express, { NextFunction, Request, Response } from 'express';
import { prismaClient } from '../lib/db';

const router = express.Router();


router.get(
  '/api/users',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      
      const users = await prismaClient.user.findMany({
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          location: true,
          contactNumber: true,
          createdAt: true
        }
      });
    
      res.status(200).json({ success: true, users });
    } catch (error) {
      next(error); 
    }
  }
);

export { router as getAllUsersRouter };
