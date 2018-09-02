module.exports = function (sequelize, DataTypes) {
  var Bills = sequelize.define("Bills", {
    userID: DataTypes.INTEGER,
    name: DataTypes.STRING,
    amount: DataTypes.INTEGER,
    dueDay: DataTypes.INTEGER,
    URL: DataTypes.STRING,
    remind: DataTypes.INTEGER,
    paid: DataTypes.BOOLEAN,
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal("NOW()"),
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal("NOW()"),
    },
  });
  return Bills;
};
