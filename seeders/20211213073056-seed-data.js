module.exports = {
  up: async (queryInterface) => {
    const featureList = [
      {
        name: "Angelic Daddy Foong's voice",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Professional instruction from Daddy Foong',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Top tier humour from Daddy Foong',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Daddy love from Foong',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];
    await queryInterface.bulkInsert('features', featureList);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('features', null, {});
  },
};
