import { models } from '../Models/index.js';

// 이름, 내용 입력
const userController = {
  createUser: async (req, res) => {
    const { name, content } = req.body;
    try {
      const newUser = await models.User.create({ name, content });
      res.status(201).json(newUser);
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({
        error: 'Failed to create user',
        message: error.message,
        stack: process.env.NODE_ENV === 'production' ? undefined : error.stack
      });
    }
  },

  // 사용자 조회(id로)
  getUserById: async (req, res) => {
    const { id } = req.params;
    try {
      const user = await models.User.findByPk(id);

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      res.status(200).json(user);
    } catch (error) {
      console.error('Error fetching user:', error);
      res.status(500).json({ error: 'Failed to fetch user' });
    }
  },
};

export default userController;