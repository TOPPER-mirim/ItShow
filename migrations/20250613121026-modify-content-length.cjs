'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // User 테이블 content 컬럼 길이 늘리기
    await queryInterface.changeColumn('Users', 'content', {
      type: Sequelize.STRING(1000),
      allowNull: false,
    });

    // AIContents 테이블 reContent 컬럼 길이 늘리기
    await queryInterface.changeColumn('AIContents', 'reContent', {
      type: Sequelize.STRING(1000),
      allowNull: false,
    });
  },

  async down(queryInterface, Sequelize) {
    // 변경 전 상태로 되돌리기
    await queryInterface.changeColumn('Users', 'content', {
      type: Sequelize.STRING(30),
      allowNull: false,
    });

    await queryInterface.changeColumn('AIContents', 'reContent', {
      type: Sequelize.STRING(30),
      allowNull: false,
    });
  }
};
