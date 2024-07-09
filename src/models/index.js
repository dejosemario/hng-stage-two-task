const createSequelizeInstance = require("../config/db.js");
const UserModel = require('./user.model.js');
const OrganisationModel = require('./organisation.model.js');

let sequelize;
let models = {};


const initializeModels  = async () => {
 sequelize = await createSequelizeInstance();

  const User = UserModel(sequelize);
  const Organisation = OrganisationModel(sequelize);

  models = {
    User,
    Organisation,
  };

  Object.keys(models).forEach((modelName) => {
    if (models[modelName].associate) {
      models[modelName].associate(models);
    }
  });

    return {models, sequelize};
};

module.exports  = {initializeModels , models, sequelize }