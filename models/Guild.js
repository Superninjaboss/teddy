module.exports = (sequelize, DataTypes) => {
  return Guild = sequelize.define("guild", {
    id: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    prefix: DataTypes.STRING,
    modRole: DataTypes.STRING,
    logs: DataTypes.STRING
  })
}