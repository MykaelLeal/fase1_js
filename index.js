'use strict'
//Imports
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

//Conexão com o MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/Supermercado');

//Criação da aplicação
const app = express();

// Middlewares
app.use(express.json()); // Para lidar com JSON no corpo das solicitações
app.use(express.urlencoded({ extended: true })); // Para lidar com parâmetros de URL codificados

//importando os Models
const User = require('./models/userModel');
const Employee = require('./models/employeeModel');
const Product = require('./models/productModel');
const Promotion = require('./models/promotionModel');


//Utilizando os Models
app.use(User);
app.use(Employee);
app.use(Product);
app.use(Promotion);   

// Importando as rotas
const authRouter = require('./routers/authRouter');
const employeeRouter = require('./routers/employeeRouter');
const preferencesUserRouter = require('./routers/preferencesUserRouter');
const userRouter = require('./routers/userRouter');
const productRouter = require('./routers/productRouter');
const promotionRouter = require('./routers/promotionRouter');
const updateRouter = require('./routers/updateRouter');
const userOUemployeeRouter = require('./routers/userOUemployeeRouter');

// Definindo as rotas utilizadas
app.use(authRouter);
app.use(userRouter);
app.use(productRouter);
app.use(promotionRouter);
app.use(employeeRouter);
app.use(updateRouter);
app.use(preferencesUserRouter);
app.use(userOUemployeeRouter);


//Definindo a porta
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
