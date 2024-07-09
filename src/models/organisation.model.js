  const { DataTypes } = require("sequelize");


  module.exports = (sequelize) => {
  const Organisation = sequelize.define(
    "Organisation",
    {
      orgId: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
      },
    },
    {
      tableName: "organisations",
    }
  );

  Organisation.associate = function (models) {
    Organisation.belongsToMany(models.User, {
      through: "UserOrganisations",
      as: "users",
      foreignKey: "orgId",
    });
  };

  return Organisation;
};