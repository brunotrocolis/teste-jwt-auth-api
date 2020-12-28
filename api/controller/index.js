const fs = require('fs');
const path = require('path');

const controllers = {};

fs.readdirSync(__dirname)
    .filter(file => {
        return (file.indexOf('.' !== 0))
            && (file !== path.basename(__filename))
            && (file.slice(-3) === '.js');
    })
    .forEach(file => {
        controllers[file.slice(0, -3)] = require(path.join(__dirname, file));
    });

module.exports = controllers;