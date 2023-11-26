const sellModel = require('../model/sellModel');


const getSell = (req, res) => {
    const sell = sellModel.getSell();
    res.json(sell);
};

module.exports = {
    getSell
}