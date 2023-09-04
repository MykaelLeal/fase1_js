// authMiddleware.js
const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  // Verifica se o token está presente no cabeçalho da requisição
  if (!token) {
    return res.status(401).json({ message: 'Token não fornecido.' });
  }

  try {
    // Verifica e decodifica o token usando a chave 'seuSegredo'
    const decodedToken = jwt.verify(token, 'seuSegredo');

    // Armazena o ID do usuário decodificado na requisição
    req.userId = decodedToken.userId;

    // Chama a próxima função de middleware
    next();
  } catch (error) {
    // Retorna um erro caso o token seja inválido ou tenha expirado
    res.status(401).json({ message: 'Token inválido.' });
  }
};
