const express = require('express');
const route = express.Router();
const { verifyUser }= require('../util')
const { getOrders,
        createOrder } = require('../controllers/ordersController');

route.get('/', verifyUser, getOrders);

route.post('/ordenar', verifyUser, createOrder);

module.exports = route