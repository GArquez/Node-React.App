const express = require('express');
const route = express.Router();
const { getAllProducts, 
        createItem, 
        getVegetables, 
        getVegetableId, 
        getFruits, 
        getFruitId } = require('../controllers/productsController');

route.get('/', getAllProducts)

route.post('/', createItem)

route.get('/verduras', getVegetables)

route.get('/verduras/:product', getVegetableId)

route.get('/frutas', getFruits)

route.get('/frutas/:product', getFruitId)

module.exports = route