'use strict'
const mongoose = require('mongoose');

// Definindo o modelo de dados para o Produto
const Product = mongoose.model('Product', {
  // Adicionando 'nome' como um campo obrigatório
  name: { type: String, required: true },
  // Adicionando 'preçoRegular' e 'preçoPromoção' como campos numéricos e obrigatórios
  regularPrice: { type: Number, required: true },
  // adicionando Preço Promocional
  promotionalPrice: { type: Number },
  // Adicionando 'tipo' como um campo de texto e obrigatório
  type: { type: String, required: true },
  // Adicionando 'descrição' como um campo de texto
  description: { type: String },
  // Adicionando 'dataExpiração' como um campo de data
  expireDate: { type: Date }

});

// Exportar o módulo
module.exports = Product;