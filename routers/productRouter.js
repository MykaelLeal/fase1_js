'use strict';

// Importa o express
const express = require('express');

// Cria o roteador de Produto
const productRouter = express.Router();

// Importação do controller de produto que criamos
const productController = require('../controllers/productController');

// Define as rotas para manipular produtos
productRouter.route('/api/product')
  // Rota para obter todos os produtos
  .get((req, res) => productController.getProducts(req, res))
  
  // Rota para criar um novo produto
  .post((req, res) => productController.createProduct(req, res))
  
  // Rota para atualizar informações de um produto
  .put((req, res) => productController.updateProduct(req, res));

// Define as rotas para recursos relacionados a produtos, utilizando um ID como parâmetro
productRouter.route('/api/product/:id')
  // Rota para obter informações de um produto específico
  .get((req, res) => productController.getProduct(req, res))
  
  // Rota para excluir um produto pelo ID
  .delete((req, res) => productController.deleteProductById(req, res));

// Exporta o roteador de produtos
module.exports = productRouter;
