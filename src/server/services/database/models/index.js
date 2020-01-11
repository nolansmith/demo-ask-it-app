let Sequelize = require('sequelize');

    require('babel-plugin-require-context-hook/register')()


module.exports = (sequelize) => {
    //create empty database object
    let db = {};
    //context grabbing .js files in directory
    const context = require.context('.', true, /^\.\/(?!index\.js).*\.js$/, 'sync');
    //console.log('Context: ', context);
    
    context.keys().map(context).forEach(module => {
        const model = module(sequelize, Sequelize);
        db[model.name] = model;
    });
    Object.keys(db).forEach((modelName) => {
        if (db[modelName].associate) {
            db[modelName].associate(db);
        }
    });
    return db;
};