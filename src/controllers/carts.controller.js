import { cartsManager as manager } from "../services/cartsManager.js"

//para crear el carrito
export async function postController(req, res) {
    const pojo = req.body
    manager.create(pojo)
    const pojos = await manager.findAll()
    pojos.push(pojo)
    res.json(pojo)
}

//listar productos en el carrito
export async function getByIdController(req, res) {
    const id = req.params.id
    try {
        const pojo = await manager.listProductsInCart(id)
        res.json(pojo)
    } catch (error) {
        res.status(404).json({
            mensaje: error.message
        })
    }
}

//add product to cart
export async function addProductToCartController(req, res) {
    const cid = req.params.cid
    const pid = req.params.pid   
    try {
        const pojo = await manager.addProductToCart({cid,pid})
        res.json(pojo)
    } catch (error) {
        res.status(404).json({
            mensaje: error.message
        })
    }
}



//adicionales al desafio para otras funcionalidades

export async function getController(req, res) {
    const {limit} = req.query
    const pojos = await manager.findAll({limit})
    res.json(pojos)
}

export async function updateController(req, res) {
    const id = req.params.id
    const fields = req.body
    try {
        const pojos = await manager.updatePojo(id,fields)
        res.json(pojos)
    } catch (error) {
        res.status(404).json({
            mensaje: error.message
        })
    }
}

export async function deleteController(req, res) {
    const id = req.params.id
    try {
        const pojos = await manager.delete(id)
        res.json(pojos)
    } catch (error) {
        res.status(404).json({
            mensaje: error.message
        })
    }
}