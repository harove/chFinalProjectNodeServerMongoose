import { Router } from 'express';
import { productsManager } from '../services/productsManager.js';

export const webRouter = Router();
webRouter.get('/products', async (req, res) => {
    const products = await productsManager.findAll();
    res.render('home.handlebars', {
        products,
        titulo: 'Products'
    });
});

webRouter.get('/realtimeproducts', async (req, res) => {
    const products = await productsManager.findAll();
    res.render('realTimeProducts.handlebars', {
        products,
        titulo: 'Realtime Products'
    });
});