const fs = require('fs');

const searchTalker = (req, res) => {
const { q } = req.query;

const talkerJson = fs.readFileSync('talker.json', 'utf-8');
const talkers = JSON.parse(talkerJson);

const filteredTalkers = talkers.filter((t) => t.name.includes(q));
return res.status(200).json(filteredTalkers);
};

module.exports = searchTalker;