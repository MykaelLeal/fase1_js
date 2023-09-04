'use strict';
// Importe o express 
const express = require('express');
//define o roteador 
const authRouter = express.Router();

// Importe o controlador de autenticação
const authController = require('../controllers/authController');

// Rota para autenticação e login de usuário
authRouter.post('/login', authController.loginUser);

module.exports = authRouter;