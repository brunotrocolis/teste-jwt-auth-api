const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

const config = require('../config/database');
const sequelize = new Sequelize(config);
const models = {};

fs.readdirSync(__dirname)
    .filter(file => {
        return (file.indexOf('.' !== 0))
            && (file !== path.basename(__filename))
            && (file.slice(-3) === '.js');
    })
    .forEach(file => {
        const model = require(path.join(__dirname, file));
        model.init(sequelize);
        models[file.slice(0, -3)] = model;
    });

Object.keys(models).forEach(modelName => {
  if (models[modelName].associate) {
      models[modelName].associate(models);
  }
});

module.exports = models;
