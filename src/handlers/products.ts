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
            id: req.params.id,
            belongToId: req.user?.id
        }
    });

    if (!product) {
        res.status(404).json({error: 'Product not found'});
        return;
    }
    res.json({data: product});
}


// create product handler

export const createProduct = async (req: Request, res: Response): Promise<void> => {
    const product = await prisma.product.create({
        data:{
            name: req?.body?.name,
            description: req?.body?.description,
            belongToId: req.user?.id ? req.user.id.toString() : ''
        }
    })
    if (!product) {
        res.status(500).json({error: 'Product not created'});
        return;
    }
    res.json({data: product});
};


//  update product handler 

export const updateProduct = async (req: Request, res: Response) => {
    
    const updated = await prisma.product.update({
        where: {
            id: req.params.id
        },
        data: {
            name: req?.body?.name,
            description: req?.body?.description   
        }
    });

    if (!updated) {
        res.status(500).json({error: 'Product not updated'});
        return;
    }
    res.json({data: updated});
}



// delete product 


export const deleteProduct = async (req: Request, res: Response) => {
    const belongToId = req.user?.id;
    if (!belongToId) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
    }

    const deleted = await prisma.product.delete({
        where: {
            id_belongToId: {
                id: req.params.id,
                belongToId: belongToId
            }
        }
    });
    if (!deleted) {
        res.status(500).json({error: 'Product not deleted'});
        return;
    }

    res.json({data: deleted});
}