'use strict';
const UserModel = require('../models/userModel');

module.exports = {
  // Função para recuperar todos os usuários
  getUsers: (req, res) => {
    // Recupere todos os usuários do UserModel
    UserModel.find({}).select(["-__v", "-_id"]).then((result) => {
      // Envie uma resposta JSON com a lista de usuários
      res.status(200).json(result);
    }).catch(() => {
      // Se houver um erro, envie uma resposta de erro interno do servidor 500
      res.status(500).json({ message: "Não foi possível recuperar os Usuários" });
    });
  },

  // Função para criar um novo usuário
  createUser: async (req, res) => {
    try {
      // Crie um novo usuário com base nos dados fornecidos no corpo da solicitação
      const result = await UserModel.create(req.body);
      // Envie um código de status 201 criado com uma mensagem de sucesso se o usuário for criado com sucesso
      res.status(201).json({ message: `O usuário ${result.name} foi criado com sucesso!` });
    } catch (err) {
      // Se houver um erro, envie uma resposta de erro interno do servidor 500
      res.status(500).json({ message: `Não foi possível criar o usuário ${req.body.name}` });
    }
  },

 // Função para atualizar os dados de um usuário
  updateUser: async (req, res) => {
    try {
      // Atualize os dados de um usuário com base no seu identificador exclusivo (ID)
      const result = await UserModel.updateOne({ _id: req.params.id }, req.body);
      // Envie uma mensagem de sucesso se a atualização for bem-sucedida
      res.status(200).send({ message: "Usuário atualizado com sucesso!" });
    } catch (err) {
      // Se houver um erro, envie uma resposta de erro interno do servidor 500
      res.status(500).json({ message: "Não foi possível atualizar os dados do usuário" });
    }
  },

  // Função para recuperar um usuário pelo ID
  getUser: async (req, res) => {
  try {
    // Recupere um usuário pelo seu identificador exclusivo (ID)
    const result = await UserModel.findById(req.params.id);
    // Envie os dados do usuário na resposta se encontrado
    res.status(200).send(result);
  } catch (err) {
    // Se houver um erro ou o usuário não for encontrado, envie uma resposta de erro interno do servidor 500
    res.status(500).json({ message: "Não foi possível recuperar o usuário no momento" });
  }
},


  // Função para excluir um usuário pelo ID
  deleteUserById: async (req, res) => {
    try {
      // Exclua um usuário pelo seu identificador exclusivo (ID)
      const result = await UserModel.deleteOne({ mat: req.params.id });
      // Envie uma mensagem de sucesso se a exclusão for bem-sucedida
      res.status(200).send({ message: "Usuário removido com sucesso!" });
    } catch (err) {
      // Se houver um erro, envie uma resposta de erro interno do servidor 500
      res.status(500).json({ message: "Não foi possível remover o usuário" });
    }
  },
};
 
  
