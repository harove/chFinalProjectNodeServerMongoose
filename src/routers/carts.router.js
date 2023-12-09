import { Router } from 'express';
import { getController, postController, getByIdController, updateController, deleteController, addProductToCartController } from '../controllers/carts.controller.js';


export const cartsRouter = Router()
cartsRouter.get('/:id', getByIdController)
cartsRouter.get('/', getController)
cartsRouter.post('/:cid/product/:pid', addProductToCartController)
cartsRouter.post('/', postController)
cartsRouter.put('/:id', updateController)
cartsRouter.delete('/:id', deleteController)

