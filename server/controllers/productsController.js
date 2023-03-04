const productSchema = require('../models/Products.js');

const getAllProducts = async (req, res) => {
    try {
        const products = await productSchema.find();
        res.status(200);
        res.json(products);
    } catch {
        res.status(500).json({ message: 'Error del servidor' });
    }
};

const createItem = async (req, res) => {
    try {
        const { stock, producto, precio, descripcion, categoria, img} = req.body;

        if(!stock || !producto || !precio || !descripcion || !categoria) {
            return res.status(400).json({message: "Please, put all fields"});
        };

        const newProduct = new productSchema({stock, producto, precio, descripcion, categoria, img});
        const productSaved = await newProduct.save();

        res.json(productSaved).status(200);
    } catch (err) {
        console.log(err);
    }
};

const getVegetables = async (req, res) => {
    try{

        const vegetables = await productSchema.find({ categoria: "Verdura"});

        res.json(vegetables).status(200);
    } catch (err) {
        console.log(err);
        res.json({ "message": "error" }).status(500);
    }
};

const getVegetableId = async (req, res) => {
    try{
        const product = req.params.product;

        const vegetableId = await productSchema.find({ _id: product });

        res.json(vegetableId).status(200);
    } catch(err) {
        console.log(err);
        res.status(500).json({ message: "server error" });
    }
};

const getFruits = async (req, res) => {
    try{
        const fruits = await productSchema.find({ categoria: "Fruta" });

        res.json(fruits).status(200);
    } catch(err){
        console.log(err);
        res.json({ message: "server error" }).status(500);
    }
};

const getFruitId = async (req, res) => {
    try {
        const product = req.params.product;

        const vegetableId = await productSchema.find({ _id: product });

        res.json(vegetableId).status(200);
    } catch(err){
        console.log(err);
    }
};

module.exports = {
    getAllProducts : getAllProducts,
    createItem : createItem,
    getVegetables : getVegetables,
    getVegetableId : getVegetableId,
    getFruits: getFruits,
    getFruitId: getFruitId
}