exports.seed = function(knex) {
  return knex('users')
    .truncate()
    .then(function() {
      return knex('users').insert([
        {
          id:1,
          name: 'Samwise Gamgee',
          bio: 'Gardener and poet. Married to Rose Cotton',
        },
        {
          id:2,
          name: 'Frodo Baggins',
          bio: 'The ring bearer',
        },
      ]);
    });
};
