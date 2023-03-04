const orderSchema = require('../models/Orders');

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
        const { nombre, telefono, email, total } = req.body;
        
        const items = req.body.items;

        const newOrder = new orderSchema( 
            {   comprador: {
                nombre: nombre,
                telefono: telefono,
                email: email, 
                },
                items: [],
                total: total }
        );
        items.map( (item) => {
            const order = newOrder.items;
            order.push(item);
        });

        const orderSaved = await newOrder.save();
               
        res.json(orderSaved);
        res.status(200);
    } catch(err) {
        console.log(err);
    }
};

module.exports = {
    getOrders : getOrders,
    createOrder : createOrder
}