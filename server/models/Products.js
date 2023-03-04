const { Schema, model } = require('mongoose')

const productSchema = new Schema({
    stock: Number,
    producto: String, 
    precio: Number,
    descripcion: String,
    categoria: String,
    img: String
},
{
    timestamps: true
})


module.exports = model( 'product', productSchema )