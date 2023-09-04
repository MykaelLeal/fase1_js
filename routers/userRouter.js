'use strict';
const express = require('express');
const userRouter = express.Router();

const userController = require('../controllers/userController');

// Rota para listar todos os usuários
userRouter.get('/api/user', (req, res) => {
  userController.getUsers(req, res);
});

// Rota para criar um novo usuário
userRouter.post('/api/user', (req, res) => {
  userController.createUser(req, res);
});

// Rota para atualizar um usuário existente
userRouter.put('/api/user/:id', (req, res) => {
  userController.updateUser(req, res);
});

// Rota para buscar um usuário pelo ID
userRouter.get('/api/user/:id', (req, res) => {
  userController.getUserById(req, res);
});

// Rota para excluir um usuário pelo ID
userRouter.delete('/api/user/:id', (req, res) => {
  userController.deleteUser(req, res);
});

module.exports = userRouter;
