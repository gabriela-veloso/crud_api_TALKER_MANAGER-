const fs = require('fs');

const talkValidate = (req, res, next) => {
    const { talk } = req.body;

if (!talk || talk.watchedAt === undefined || talk.rate === undefined) {
    return res.status(400).json({
        message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    });
} 
next();
};

const watchedValidate = (req, res, next) => {
    const regexValidate = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/;
    const { talk } = req.body;
    
    if (!regexValidate.test(talk.watchedAt)) {
        return res.status(400).json({
            message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
        });
    }
    next();
    };  

    const rateValidate = (req, res, next) => {
        const { talk: { rate } } = req.body;
      if (rate < 1 || rate > 5) {
        return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
      }
      
      return next();
            }; 

const validateEditTalker = (req, res) => {
const { name, age, talk: { watchedAt, rate } } = req.body;
const { id } = req.params;
const readJSON = fs.readFileSync('talker.json', 'utf-8');
const talkers = JSON.parse(readJSON);
const talkerIndex = talkers.findIndex((r) => r.id === Number(id));
const editedObject = { 
        name, 
        age,
        id: Number(id), 
        talk: { 
            watchedAt, 
            rate }, 
    };
// arr.splice(2, 1, 'tmp') - Replaces 1 item at index 2 with 'tmp'
talkers.splice(talkerIndex, 1, editedObject);
fs.writeFileSync('talker.json', JSON.stringify(talkers));
return res.status(200).json(editedObject);  
};          

module.exports = { talkValidate, watchedValidate, rateValidate, validateEditTalker };