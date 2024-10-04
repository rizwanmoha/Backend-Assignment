import express, { NextFunction, Request, Response } from 'express';
import { body } from 'express-validator';
import { prismaClient } from '../lib/db';
import { Password } from '../utils/password';
import { validateRequest } from '../middlewares/validate-request';
import { BadRequestError } from '../errors/bad-request-error';
import jwt from 'jsonwebtoken';

const router = express.Router();

const validateGetUserToken = [
  body('email')
    .trim()
    .isEmail()
    .withMessage('Email must be valid')
    .customSanitizer((value) => value.toLowerCase()),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
];

router.post(
  '/api/users/token',
  validateGetUserToken,
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    try {
      
      if (!email || !password) {
        throw new BadRequestError('Email and password must be provided');
      }

   
      const user = await prismaClient.user.findUnique({
        where: { email },
      });

    
      if (!user) {
        throw new BadRequestError('Invalid credentials');
      }

     
      const passwordMatch = await Password.comparePassword(user.password,password);
      if (!passwordMatch) {
        throw new BadRequestError('Invalid credentials');
      }

      const tokenPayload = {
        userId: user.id,
        email: user.email,
        ...(user.role === 'admin' && { role: 'admin' }), 
      };

      const token = jwt.sign(
        tokenPayload,
        process.env.JWT_SECRET as string || 'asdf',
        { expiresIn: '3h' }
      );

      res.status(200).json({
        success: true,
        token,
      });
    } catch (error) {
      next(error); 
    }
  }
);

export { router as getUserTokenRouter };
