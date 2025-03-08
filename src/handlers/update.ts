
import prisma from "../modules/db";

import { Request, Response } from "express";



// get one update
export const getOneUpdate = async(req: Request, res: Response) => {
    const update = await prisma.update.findUnique({
        where: {
            id: req.params.id
        }
    })

    if (!update) {
        res.status(404).json({error: 'Update not found'});
        return;
    }
    res.json({data: update});
}
export const getUpdate = async(req: Request, res: Response) => {

    const products = await prisma.product.findMany({
        where:{
            belongToId: req.user?.id
        },
        include: {
            updates: true
        }
    });
   
    if (!products) {
        res.status(404).json({error: 'Product not found'});
        return;
    }

    const updates = products.reduce((acc: any[], product) => {
        return [...acc, ...product.updates];
    }
    ,[]);

    if (!updates) {
        res.status(404).json({error: 'Update not found'});
        return;
    }
    res.json({data: updates});
   
}
export const createUpdate = async(req:Request, res:Response) => {
    const productId = req.body.productId;
    const product = await prisma.product.findUnique({
        where: {
            id: productId
        }
    });
    if (!product) {
        res.status(404).json({error: 'Product not found'});
        return;
    }
    const update = await prisma.update.create({
        data: {
          productId: productId,
          title: req.body.title,
          body: req.body.body,
          status: req.body.status,
          version: req.body.version
        }
    });
    if (!update) {
        res.status(500).json({error: 'Update not created'});
        return;
    }
    res.json({data: update});
}
export const updateUpdate = async(req: Request, res: Response) => {
   const product = await prisma.product.findMany({
         where : {
            belongToId: req.user?.id?.toString()
         },
            include: {
                updates: true
            }
    });
    if (!product) {
        res.status(404).json({error: 'Product not found'});
        return;
    }
    const updates = product.reduce((acc: any[], product) => {
        return [...acc, ...product.updates];
    },[]);
    if (!updates) {
        res.status(404).json({error: 'Update not found'});
        return;
    }
   const match = updates.find((update) => update.id === req.params.id);
    if (!match) {
        res.status(404).json({error: 'Update not found'});
        return;
    }
    const update = await prisma.update.update({
        where: {
            id: match.id
        },
        data:req.body
    });
    if (!update) {
        res.status(500).json({error: 'Update not updated'});
        return;
    }
    res.json({data: update});
}
export const deleteUpdate = async(req: Request, res: Response) => {
    const product = await prisma.product.findMany({
        where : {
            belongToId: req.user?.id?.toString()
        },
        include: {
            updates: true
        }
    });
    if (!product) {
        res.status(404).json({error: 'Product not found'});
        return;
    }
    const updates = product.reduce((acc: any[], product) => {
        return [...acc, ...product.updates];
    },[]);
    if (!updates) {
        res.status(404).json({error: 'Update not found'});
        return;
    }
    const match = updates.find((update) => update.id === req.params.id);
    if (!match) {
        res.status(404).json({error: 'Update not found'});
        return;
    }
    const update = await prisma.update.delete({
        where: {
            id: match.id
        }
    });
    if (!update) {
        res.status(500).json({error: 'Update not deleted'});
        return;
    }
    res.json({data: update});
}