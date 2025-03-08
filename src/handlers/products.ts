import { Request, Response } from 'express';
import prisma from '../modules/db';

declare module 'express-serve-static-core' {
    interface Request {
        user?: {
            id: string;
        }
    }
}


//  get products handler

export const getProducts = async (req: Request, res: Response) => {
    const user = await prisma.user.findUnique(
        {
            where: {
                id: req.user?.id?.toString()
            },
            include:{
                products: true
            }
        },
        
    );

    res.json({data: user?.products});

}


// get one products handler 

export const getOneProduct = async (req: Request, res: Response) => {
    const product = await prisma.product.findUnique({
        where: {
            id: req.params.id
        }
    });

    res.json({data: product});
}