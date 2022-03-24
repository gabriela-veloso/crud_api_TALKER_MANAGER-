const fs = require('fs');

const validateToken = (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization || !authorization.length) {
    return res.status(401).json({ message: 'Token não encontrado' });
        }

    if (authorization.length < 16) {
    return res.status(401).json({ message: 'Token inválido' });
    }
    return next();
        };

const validateName = (req, res, next) => {
    const { name } = req.body;
        
    if (!name || !name.length) {
        return res.status(400).json({ message: 'O campo "name" é obrigatório' });
        }
        
    if (name.length < 3) {
        return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
            }
        return next();
        };

const validateAge = (req, res, next) => {
    const { age } = req.body;

    if (!age) {
    return res.status(400).json({ message: 'O campo "age" é obrigatório' });
        }

    if (parseInt(age, 10) < 18) {
    return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
    }
    return next();
        };

const validateTalk = (req, res, next) => {
    const { talk } = req.body;

    if (!talk || !talk.watchedAt || !talk.rate) {
    return res.status(400).json({
        message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    });
        }
    
    return next();
        };  
        
const validateRate = (req, res, next) => {
    const { talk: { rate } } = req.body;
  if (rate < 1 || rate > 5) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  
  return next();
        };  

const validateWatched = (req, res, next) => {
const regexValidate = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/;
const { talk: { watchedAt } } = req.body;

if (!regexValidate.test(watchedAt)) {
    return res.status(400).json({
        message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
    });
}
next();
};       

const addTalker = (req, res) => {
const { name, age, talk: { watchedAt, rate } } = req.body;

const readJSON = fs.readFileSync('talker.json', 'utf-8');
const talkers = JSON.parse(readJSON);

const newObject = {
    name,
    id: talkers.length + 1,
    age,
    talk: {
      watchedAt,
      rate,
    },
  };
talkers.push(newObject);
fs.writeFileSync('talker.json', JSON.stringify(talkers));
  return res.status(201).json(newObject);  
};

module.exports = {
validateToken,
validateName,
validateAge,
validateTalk,
validateRate,
validateWatched,
addTalker,
};