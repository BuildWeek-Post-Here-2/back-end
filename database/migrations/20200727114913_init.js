
exports.up = function(knex) {
    return knex.schema
        .createTable('users', users => {
            users.increments();
            users
                .string('username', 255)
                .notNullable()
                .unique();
            users.string('password', 255).notNullable();
        })
        .createTable('posts', posts => {
            posts.increments();
            posts.integer('user_id')
                .unsigned()
                .notNullable()
                .references("id")
                .inTable("users")
                .onUpdate('CASCADE')
                .onDelete('CASCADE');
            posts.string('title').notNullable()
            posts.string('content')
            posts.string('subreddit')
        })
  };
  
exports.down = function(knex, Promise) {
    return knex.schema
        .dropTableIfExists('posts')
        .dropTableIfExists('users');
};