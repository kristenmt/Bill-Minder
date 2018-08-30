module.exports = function(sequelize, DataTypes) {
  var Bills = sequelize.define("Bills", {
    userID: DataTypes.INTEGER,
    name: DataTypes.STRING,
    amount: DataTypes.INTEGER,
    dueDay: DataTypes.INTEGER,
    URL: DataTypes.STRING,
    remind: DataTypes.INTEGER,
    paid: DataTypes.BOOLEAN
  });
  return Bills;
};
