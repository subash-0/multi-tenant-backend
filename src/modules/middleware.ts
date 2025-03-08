import { validationResult } from "express-validator";
import { Request, Response, NextFunction } from 'express';

const validator = (req : Request, res : Response, next : NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
         res.status(402).json({ errors: errors.array() });
        return;
    }
    next();
}
export default validator;