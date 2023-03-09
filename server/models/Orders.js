const { Schema, model } = require('mongoose');

const orderSchema = new Schema({
    comprador: {
        nombre: String,
        email: String
    },
    items: [{
        producto: String,
        cantidad: Number,
        precio: Number
    }],
    total: Number
},
{
    timestamps: true
});

module.exports = model( 'order', orderSchema );