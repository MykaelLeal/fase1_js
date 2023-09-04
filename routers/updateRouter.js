const express = require('express');
const upadateRouter = express.Router();
const Product = require('../models/productModel'); 

// Rota para atualizar em lote
upadateRouter.put('/api/updateBatch', async (req, res) => {
  try {
    const { type, discount } = req.body;

    // Atualize todos os produtos do tipo especificado com o desconto
    const result = await Product.updateMany(
      { type: type },
      { $set: { promotionalPrice: discount } }
    );

    res.status(200).json({ message: 'Produtos atualizados com sucesso.', result });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar produtos em lote.' });
  }
});

module.exports = upadateRouter;
