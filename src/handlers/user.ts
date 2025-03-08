import { comparePassword, createToken, hashPassword } from './../modules/auth';
import prisma from "../modules/db";
import { NextFunction, Request, Response } from 'express';


export const createUser = async (req: Request, res: Response) => {
    const { username, email, password } = req.body;
    
    const hashedPassword = await hashPassword(password);
    try {
       const user = await prisma.user.create({
        data:{
            email,
            username: username,
            password: hashedPassword

        }
       });

       console.log(user);

        const token = createToken(user);
        res.status(201).json({ token });
    } catch (error : any) {
        res.status(400).json({ error: error.message });
    }
};




export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
  
      try {
        const user = await prisma.user.findUnique({
            where :{
                email
            }
        })
        if (!user) {
          throw new Error("User not found");
        }
        const passwordMatch = await comparePassword(password, user.password);
        if (!passwordMatch) {
          res.status(400).json({ error: "Invalid password" });
          return;
        }
        const token = createToken(user);
        res.status(200).json({ token });
        
      } catch (error : any) {
        res.status(400).json({ error: error.message });
        
      }
};

