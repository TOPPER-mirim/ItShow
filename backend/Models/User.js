import { DataTypes } from "sequelize";

const defineUser = (sequelize) => {
  const User = sequelize.define("User", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
  });

  return User;
};

export default defineUser;
