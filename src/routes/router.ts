import { Router, Request } from 'express';
import { body,oneOf,validationResult } from 'express-validator';
import validator from '../modules/middleware';
import { createProduct, deleteProduct, getOneProduct, getProducts, updateProduct } from '../handlers/products';
import { createUpdate, deleteUpdate, getOneUpdate, getUpdate, updateUpdate } from '../handlers/update';

const router = Router();

const productValidationRules = [
  body('name').isString(),
  body('description').isString(),
];
//  proudcts routes
router.get('/products',getProducts);
router.get('/products/:id', getOneProduct);
router.put('/products/:id',body('name')?.isString(), validator,updateProduct);
router.post('/products',productValidationRules, validator,createProduct);
router.delete('/products/:id', deleteProduct);





// UPdates
router.get('/updates', getUpdate);
router.get('/updates/:id', getOneUpdate);

router.put('/updates/:id', 
    body('title')?.optional(),
    body('body')?.optional(), 
    body('status')?.isIn(['IN_PROGRESS', 'SHIPPED', 'DEPRECATED']),
    body('version')?.optional(),
    updateUpdate
);
router.post('/updates',
  body('title')?.exists().isString(),
  body('body')?.exists().isString(),
  body('productId')?.exists().isString(), 
  createUpdate
);
router.delete('/updates/:id', deleteUpdate);

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