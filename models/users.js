module.exports = function(sequelize, DataTypes) {
  var Users = sequelize.define("Users", {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.INTEGER,
    address: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING
  });
  return Users;
};
