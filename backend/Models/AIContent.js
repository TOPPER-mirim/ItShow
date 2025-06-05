import { DataTypes } from "sequelize";

const defineAIContent = (sequelize) => {
  return sequelize.define("AIContent", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    reContent: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    filterStr: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    contentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
          model: 'Users', 
          key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
  },
  });
};

export default defineAIContent;
