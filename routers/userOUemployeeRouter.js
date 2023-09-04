const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Employee = require('../models/employeeModel'); 
const User = require('../models/userModel'); 

const router = express.Router();

// Rota para login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Verificar se o login e a senha correspondem a um funcionário
    const employee = await Employee.findOne({ email });

    if (employee) {
      // Comparar a senha fornecida com a senha armazenada no banco de dados
      const isPasswordValid = await bcrypt.compare(password, employee.password);

      if (isPasswordValid) {
        // Gerar um token de autenticação usando o ID do funcionário
        const token = jwt.sign({ userId: employee._id, role: 'employee' }, 'seuSegredo', { expiresIn: '1h' });

        // Retornar o token para o funcionário
        return res.json({ token });
      }
    }

    // Se o login e a senha não corresponderem a um funcionário, verifique os usuários
    const user = await User.findOne({ email });

    if (user) {
      // Comparar a senha fornecida com a senha armazenada no banco de dados
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (isPasswordValid) {
        // Gerar um token de autenticação usando o ID do usuário
        const token = jwt.sign({ userId: user._id, role: 'user' }, 'seuSegredo', { expiresIn: '1h' });

        // Retornar o token para o usuário
        return res.json({ token });
      }
    }

    // Se nenhum login ou senha corresponder a um funcionário ou usuário, retorne um erro
    res.status(401).json({ message: 'Credenciais inválidas.' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao fazer login.' });
  }
});

module.exports = router;
