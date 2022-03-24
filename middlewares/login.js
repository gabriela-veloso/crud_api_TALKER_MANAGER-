const cryptoRandomString = require('crypto');

const getToken = (_req, res) => {
  const randomToken = cryptoRandomString.randomBytes(8).toString('hex');
  return res.status(200).json({ token: randomToken });
};

const validateEmail = (req, res, next) => {
  const { email } = req.body;
  const regexEmail = /\S+@\S+\.\S+/;
    if (!email || !email.length) {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
      } if (!regexEmail.test(email)) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
              }
    return next();
      };

const validatePassword = (req, res, next) => {
  const { password } = req.body;
    if (!password || !password.length) {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
      } if (password.length < 6) {
      return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
    } 
    return next();
        };  

module.exports = { getToken, validateEmail, validatePassword };