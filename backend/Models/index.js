import dotenv from 'dotenv';
dotenv.config({ path: path.resolve(process.cwd(), 'backend', '.env') });
import { Sequelize } from 'sequelize';
import path from 'path';

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false,
  }
);

import defineUser from './User.js';
import ticketImage from './ticketImage.js';
import difineAIContent from './AIContent.js';
const User = defineUser(sequelize);
const Image = ticketImage(sequelize);
const AIContent = difineAIContent(sequelize);

User.hasMany(Image, { foreignKey: 'userId' });
Image.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(AIContent, { foreignKey: 'contentId' });
AIContent.belongsTo(User, { foreignKey: 'contentId' });

export const models = { sequelize, User, Image, AIContent };
