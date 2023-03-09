const orderSchema = require('../models/Orders');
const productSchema = require('../models/Products')
const mongoose = require('mongoose')

const getOrders = async (req, res) => {
    try {
        const orders = await orderSchema.find();
        res.json(orders);
        res.status(200);
    } catch (err) {
        console.log(err);
        res.json( {message: `${err}`} );
        res.status(500);
    }
};

const createOrder = async (req, res) => {
    try {
        const { nombre, email, total, items } = req.body;

        const itemsId = items.map( el => el._id)
        const productsDb = await productSchema.find({_id: itemsId});
        

        const newOrder = new orderSchema( 
            {   comprador: {
                nombre: nombre,
                email: email, 
                },
                items,
                total: total }
            );
        
        let noStock = []
        
        productsDb.forEach( async (item) => {
            let stockDb = item.stock
            const idx = items.findIndex( e => e._id == item._id)
            const cart = items[idx]
            console.log(cart)
            const quantity = cart.cantidad
            if(quantity <= stockDb) {
                await item.updateOne({stock: stockDb - quantity})
            } else {
                noStock.push({ _id: item._id, ...cart})
            }
        });
        if (noStock.length === 0) {
            await newOrder.save()
            res.status(200).json({succes: true, newOrder});
        } else {
            res.status(500).json({succes: false, noStock})
        }
    } catch(err) {
        console.log(err);
        res.status(500).json('Something was wrong. Try again')
    }
};

module.exports = {
    getOrders : getOrders,
    createOrder : createOrder
}