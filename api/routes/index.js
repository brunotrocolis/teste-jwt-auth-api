const fs = require('fs');
const path = require('path');

const routes = app => {
    fs.readdirSync(__dirname)
    .filter(file => {
        return (file.indexOf('.' !== 0))
            && (file !== path.basename(__filename))
            && (file.slice(-3) === '.js');
    }).forEach(file => {
        app.use(require(path.join(__dirname, file)));
    });
};

module.exports = routes;