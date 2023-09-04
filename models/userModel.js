'use strict'
const mongoose = require('mongoose');

// Definindo o modelo de dados para o Usuário
const User = mongoose.model('User',{
    //Adicionando 'nome' como campo obrigatório
    name: { type: String, required: true },
    // Adicionando 'email' como um campo obrigatório e a aplicação de validação de formato de email
    email: { type: String, required: true, unique: true, match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ },
    //Adicionando 'senha' como campo obrigatório para autenticação
    password: { type: String, required: true },
    //Adicionando 'CPF' como campo obrigatório
    CPF: { type: Number, required: true },
    //Adiciona 'idade' com restrições de idade mínima e máxima
    age: { type: Number, min: 18, max: 150 },
    //Adicionando um array para armazenar temporareamente os itens
    preferences: [String]

  });

//Exportar o modulo
module.exports = User;