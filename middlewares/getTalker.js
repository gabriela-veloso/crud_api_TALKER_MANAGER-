const fs = require('fs');

const getTalker = (_req, res) => {
    // in fs.readFileSync() method, we can read files in a synchronous way
    // we are telling node.js to block other parallel process and do the current file reading process.
    const talkersJSON = fs.readFileSync('talker.json', 'utf-8');
    const talkers = JSON.parse(talkersJSON);

    if (talkers.length === 0) {
        return res.status(200).send([]);
    } (res.status(200).send(talkers));
};

module.exports = getTalker;