module.exports = {
  up: async (queryInterface) => {
    const userList = [
      {
        name: 'test2',
        email: 'test2@test.com',
        password: 'test2',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];
    await queryInterface.bulkInsert('users', userList);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('users', null, {});
  },
};
