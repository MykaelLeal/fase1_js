'use strict'

const Promotion = require('../models/promotionModel');
const User = require('../models/userModel');

// Função para criar uma nova promoção
exports.createPromotion = async (req, res) => {
  const { name, type, discount } = req.body;

  try {
    // Cria uma nova promoção com os dados fornecidos
    const promotion = await Promotion.create({ name, type, discount });
    res.status(201).json({ message: 'Promoção criada com sucesso.', promotion });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar promoção.' });
  }
};

// Função para atualizar uma promoção existente
exports.updatePromotion = async (req, res) => {
  const promotionId = req.params.id;
  const { name, type, discount } = req.body;

  try {
    // Procura e atualiza a promoção pelo ID, retornando a promoção atualizada
    const promotion = await Promotion.findByIdAndUpdate(promotionId, { name, type, discount }, { new: true });
    if (!promotion) {
      return res.status(404).json({ message: 'Promoção não encontrada.' });
    }
    res.json({ message: 'Promoção atualizada com sucesso.', promotion });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar promoção.' });
  }
};

// Função para buscar uma promoção pelo ID
exports.getPromotionById = async (req, res) => {
  const promotionId = req.params.id;

  try {
    // Busca a promoção pelo ID fornecido
    const promotion = await Promotion.findById(promotionId);
    if (!promotion) {
      return res.status(404).json({ message: 'Promoção não encontrada.' });
    }
    res.json(promotion);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar promoção.' });
  }
};

// Função para remover uma promoção pelo ID
exports.deletePromotion = async (req, res) => {
  const promotionId = req.params.id;

  try {
    // Busca e remove a promoção pelo ID, se encontrada
    const promotion = await Promotion.findByIdAndDelete(promotionId);
    if (!promotion) {
      return res.status(404).json({ message: 'Promoção não encontrada.' });
    }
    res.json({ message: 'Promoção removida com sucesso.' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao remover promoção.' });
  }
};

// Função para buscar promoções específicas para um usuário com base em suas preferências
exports.getPromotionsForUser = async (req, res) => {
  const userId = req.params.userId;

  try {
    // Buscar as preferências de compra do usuário
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    const userPreferences = user.preferences;

    // Buscar as promoções compatíveis com as preferências do usuário
    const promotions = await Promotion.find({ type: { $in: userPreferences } });

    res.json(promotions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
