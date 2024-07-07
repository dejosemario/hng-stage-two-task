module.exports = (sequelize, DataTypes) => {
    const Organisation = sequelize.define('Organisation', {
      orgId: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
      },
    });
  
    Organisation.associate = function(models) {
      Organisation.belongsToMany(models.User, {
        through: 'UserOrganisations',
        as: 'users',
        foreignKey: 'orgId',
      });
    };
  
    return Organisation;
  };