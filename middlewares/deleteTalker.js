const fs = require('fs');

const deleteTalker = (req, res) => {
    const { authorization } = req.headers;
    const { id } = req.params;
    const talkerJson = fs.readFileSync('talker.json', 'utf-8');
    const talkers = JSON.parse(talkerJson);

    if (!authorization || !authorization.length) {
    return res.status(401).json({ message: 'Token não encontrado' });
        }

    if (authorization.length < 16) {
    return res.status(401).json({ message: 'Token inválido' });
    }

    const talkerIndex = talkers.findIndex((r) => r.id === id);
    // deletar
    talkers.splice(talkerIndex, 1);
    fs.writeFileSync('talker.json', JSON.stringify(talkers));
        return res.status(204).end();
            };
module.exports = deleteTalker;