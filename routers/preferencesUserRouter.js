// preferencesUserRouter.js
const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const promotionController = require('../controllers/promotionController');
const PreferencesUser = express.Router();

// Rota protegida pelo middleware de verificação de token
PreferencesUser.get('/api/promotion', authMiddleware.verifyToken, (req, res) => {
  promotionController.getPromotionsForUser(req, res); // Chame o controlador aqui ou defina o código diretamente na rota
});

module.exports = PreferencesUser;
