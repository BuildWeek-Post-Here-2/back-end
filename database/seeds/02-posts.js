
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('posts').del()
    .then(function () {
      // Inserts seed entries
      return knex('posts').insert([
        {
          "id": 1,
          "user_id": 1,
          "title": "A test",
          "content": "This post is to test if the post works!",
          "subreddit": "r/all"
        },
      ]);
    });
};
