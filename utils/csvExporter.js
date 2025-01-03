const { Parser } = require('json2csv');

const exportToCSV = (data) => {
    const fields = ['date', 'category', 'description', 'amount'];
    const opts = { fields };
    const parser = new Parser(opts);
    return parser.parse(data);
};

module.exports = exportToCSV;
