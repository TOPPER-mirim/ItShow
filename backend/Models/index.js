import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(process.cwd(), 'backend', '.env') });
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
    logging: false,
  }
);

import defineUser from './User.js';
import ticketImage from './ticketImage.js';
import defineAIContent from './AIContent.js';
const User = defineUser(sequelize);
const Image = ticketImage(sequelize);
const AIContent = defineAIContent(sequelize);

User.hasMany(Image, { foreignKey: 'userId' });
Image.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(AIContent, { foreignKey: 'contentId' });
AIContent.belongsTo(User, { foreignKey: 'contentId' });

export const models = { sequelize, User, Image, AIContent };
