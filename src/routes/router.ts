import { Router, Request } from 'express';
import { body,oneOf,validationResult } from 'express-validator';
import validator from '../modules/middleware';

const router = Router();

//  proudcts routes
router.get('/products', (req,res) => {
    res.json({message: 'Hello World'});
});
router.get('/products/:id', () => {});
router.put('/products/:id',body('name')?.isString(), validator,(req,res) => {
 
  });
router.post('/products', () => {});
router.delete('/products/:id', () => {});





// UPdates
router.get('/updates', () => {});
router.get('/updates/:id', () => {});

router.put('/updates/:id', 
    body('title')?.optional(),
    body('body')?.optional(), 
    body('status')?.isIn(['IN_PROGRESS', 'SHIPPED', 'DEPRECATED']),
    body('version')?.optional(),
    (req,res,next) => {
      res.json({message: 'Hello World'});
    }
);
router.post('/updates',
  body('title')?.exists().isString(),
  body('body')?.exists().isString(), 
  () => {});
router.delete('/updates/:id', () => {});

/**
 * update points
 */
router.get('/update-points', () => {});
router.get('/update-points/:id', () => {});
router.put('/update-points/:id',
  body('name')?.optional().isString(),
  body('description')?.optional().isString(),

  () => {});
router.post('/update-points',
  body('name')?.exists().isString(),
  body('description')?.exists().isString(),
  body('updateId')?.exists().isString(),
  () => {});
router.delete('/update-points/:id', () => {});

export default router;