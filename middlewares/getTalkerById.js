// const talkers = require('../talker.json');
const fs = require('fs');

const getTalkerById = (req, res) => {
    // conteúdo Bloco 22 HTTP com Node: parâmetros de rota 
    const talkerJson = fs.readFileSync('talker.json', 'utf-8');
    const talkers = JSON.parse(talkerJson);
    
    const { id } = req.params;
    const talker = talkers.find((r) => r.id === parseInt(id, 2));
    if (!talker) { return res.status(404).json({ message: 'Pessoa palestrante não encontrada' }); }
    return res.status(200).json(talker);
};

module.exports = getTalkerById;