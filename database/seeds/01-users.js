
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      return knex('users').insert([
        {
          "id": 1,
          "username": "testuser",
          "password": "$2a$08$2VYPUIVpwZwgl.48skAlJOicStuJbMnxGdfl2YtgMAkHiN5PXvpnm"
        }
      ]);
    });
};
