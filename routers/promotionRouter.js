const express = require('express');
const promotionController = require('../controllers/promotionController');
const Promotion = require('../models/promotionModel');
const User = require('../models/userModel');

const promotionRouter = express.Router();

// Rota para criar uma nova promoção
promotionRouter.post('/api/promotion', promotionController.createPromotion);

// Rota para atualizar uma promoção pelo ID
promotionRouter.put('/api/promotion', promotionController.updatePromotion);

// Rota para buscar uma promoção pelo ID
promotionRouter.get('/api/promotion', promotionController.getPromotionById);

// Rota para remover uma promoção pelo ID
promotionRouter.delete('/api/promotion', promotionController.deletePromotion);

// Rota para obter promoções com base nas preferências do usuário
promotionRouter.get('/api/promotion/:id', async (req, res) => {
  const userId = req.params.userId;

  try {
    // Busque as preferências de compra do usuário pelo ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    const userPreferences = user.preferences;

    // Busque as promoções compatíveis com as preferências do usuário
    const promotions = await Promotion.find({ type: { $in: userPreferences } });

    res.json(promotions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = promotionRouter;
