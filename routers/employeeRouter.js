// Cria o roteador de employees (funcionários)
const express = require('express');
const employeeRouter = express.Router();

// Importação do controller de Funcionario que criamos
const employeeController = require('../controllers/employeeController');

// Define as rotas para manipular funcionários
employeeRouter.route('/api/employee')
  // Rota para obter todos os funcionários
  .get((req, res) => employeeController.getEmployees(req, res))
  
  // Rota para criar um novo funcionário
  .post((req, res) => employeeController.createEmployee(req, res))
  
  // Rota para atualizar informações de funcionário
  .put((req, res) => employeeController.updateEmployee(req, res))

// Define as rotas para recursos relacionados a funcionários, utilizando um ID como parâmetro
employeeRouter.route('/api/employee/:id')
  // Rota para obter informações de um funcionário específico
  .get((req, res) => employeeController.getEmployee(req, res))
  
  // Rota para excluir um funcionário pelo ID
  .delete((req, res) => employeeController.deleteEmployeeById(req, res))

// Exporta o roteador de funcionários
module.exports = employeeRouter;
