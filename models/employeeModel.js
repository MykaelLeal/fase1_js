'use strict'
const mongoose = require('mongoose');

// Definindo o modelo de dados para o funcionário
const Employee = mongoose.model('Employee',{
  // Adicione 'trabalho' como um campo obrigatório
  role: { type: String, required: true },
  // Adicionando 'nome' como um campo obrigatório
  name: { type: String, required: true },
  // Adicionando 'email' como um campo obrigatório e a aplicação de validação de formato de email
  email: { type: String, required: true, unique: true, match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ },
  // Adicionando 'senha' como um campo obrigatório para autenticação
  password: { type: String, required: true },
  // Adicionando 'CPF' como um campo obrigatório (você pode usar uma biblioteca para formatar e validar CPF, se necessário)
  CPF: { type: Number, required: true },
  // Adicionando 'idade' com restrições mínimas e máximas de idade
  age: { type: Number, min: 18, max: 150 }

});

// Exportar o módulo
module.exports = Employee;