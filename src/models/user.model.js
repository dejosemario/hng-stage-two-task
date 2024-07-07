module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
      userId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING,
      },
    });
  
    User.associate = function(models) {
      User.belongsToMany(models.Organisation, {
        through: 'UserOrganisations',
        as: 'organisations',
        foreignKey: 'userId',
      });
    };
  
    return User;
  };

  
module.exports = User;