'use strict';
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel'); 

// Função para autenticar e fazer login do usuário
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Busca o usuário pelo email fornecido
    const user = await User.findOne({ email });

    // Verifica se o usuário existe
    if (!user) {
      return res.status(401).json({ message: 'Credenciais inválidas.' });
    }

    // Compara a senha fornecida com a senha armazenada no banco de dados
    const isPasswordValid = await bcrypt.compare(password, user.password);

    // Se a senha não for válida, retorna erro de credenciais inválidas
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Credenciais inválidas.' });
    }

    // Gera um token de autenticação usando o ID do usuário
    const token = jwt.sign({ userId: user._id }, 'seuSegredo', { expiresIn: '1h' });

    // Retorna o token para o usuário
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao fazer login.' });
  }
};
