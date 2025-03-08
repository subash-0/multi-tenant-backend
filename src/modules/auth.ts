
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'


export const comparePassword =  (password: string, hash: string) => {
    return  bcrypt.compare(password, hash);  
}


export const hashPassword = (password : string) => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hash(password, salt);
}


export const createToken = (user:any) => {
    const token = jwt.sign({
        id: user.id,
        email: user.email
    }, process.env.JWT_SECRET as string, {
        expiresIn: 86400 // 24 hours
    });
    return token;
}


export const protect = (req: any, res: any, next: any) => {
    const bearer = req.headers.authorization;
    if(!bearer || !bearer.startsWith('Bearer ')){     
        return res.status(401).send('Barer token is missing');
    }   
    const [, token] = bearer.split('Bearer ');

    if(!token){
        return res.status(401).send('Not a valid toekn !');
    }

    try {
        const user = jwt.verify(token, process.env.JWT_SECRET as string);
        req.user = user;
        next();
        
    } catch (error) {
        return res.status(401).send('Unauthorized');
        
    }
}
