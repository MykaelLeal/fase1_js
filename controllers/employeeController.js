const EmployeeModel = require('../models/employeeModel')

module.exports = {
  getEmployees: (req, res) => {
    //O find vai voltar todos os objetos do tipo pois não foi passado nenhuma condição como parametro
    EmployeeModel.find({}).select(["-__v", "-_id"]).then((result) => {
      res.status(200).json(result)
    }).catch(() => {
      res.status(500).json({ message: "Não foi possível recuperar os Employees" })
    })
  },
  deleteEmployeeById: async (req, res) => {
    //Remove um Employee pelo numero da matricula
    try {
      const result = await EmployeeModel.deleteOne({ mat: req.params.id })
      res.status(200).send({ message: "Employee removido com sucesso!" })
    } catch (err) {
      res.status(500).json({ message: "Não foi possível remover o Employee" })
    }
  },
  getEmployee: async (req, res) => {
    //Pega um unico Employee pelo identificador que neste caso é a matricula
    try {
      const result = await EmployeeModel.findById({ mat: req.body.mat })
      res.status(200).send(result)
    } catch (err) {
      //Testem os erros e tratem da forma correta
      //Todos os tratamentos de erro que fiz neste código foram feitos de forma genérica (erro 500)
      res.status(500).json({ message: "Não foi possível recuperar o Employee no momento" })
    }
  },
  updateEmployee: async (req, res) => {
    //Atualiza os dados de um Employee específico
    try {
      const result = await EmployeeModel.updateOne({ mat: req.body.mat }, req.body)
      res.status(200).send({ message: "Employee atualizado com sucesso!" })
    } catch (err) {
      res.status(500).json({ message: "Não foi possível atualizar os dados" })
    }
  },
  //Criar um Employee
  createEmployee: async (req, res) => {
    // Usando o await, o erro do reject pode ser capturado com um try catch
    try {
      // Sempre que o resultado for uma promise da pra usar o await e esperar a "promessa" terminar
      // Lembre-se que o await só da pra usar dentro de funções async
      const result = await EmployeeModel.create(req.body)

      /**
       * res é o objeto resposta que damos para o servidor e ele possui alguns métodos como em java que criamos 
       * a classe com atributos e também métodos que realizam alguma ação internamente na classe
       *
       * A função .json transforma o que você passar por parâmetro em formato json, se ja for um json ele nada faz
       */

      /**
       * 201 significa que o recurso foi criado e a mensagem de volta é uma mensagem indicando o que aconteceu 
       * com a chamada ao servidor
       */
      res.status(201).json({ message: `O Employee ${result._doc.name} foi criado com sucesso!` })
    } catch (err) {

      /**
       * Mesma lógica do caso anterior só que aqui nós temos uma response que deu errado
       */
      res.status(500).json({ message: `Não foi possível criar o Employee ${req.body.name}` })

    }
  }
}