'use strict'
const mongoose = require('mongoose');

// Definindo o modelo de dados para promotion
const Promotion = new mongoose.model('Promotion',{
    name: String,
    type: String,
    discount: Number

});

module.exports = Promotion;
  
