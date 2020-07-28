# Post Here Back-end

## Database Schemas

The _Database Schemas_ for the `users` and `posts` resources are:

### Users

| field | data type        | metadata                                            |
| ----- | ---------------- | --------------------------------------------------- |
| id    | unsigned integer | primary key, auto-increments, generated by database |
| name  | string           | required, unique                                    |
| password | string        | required                                            |

### Posts

| field   | data type        | metadata                                            |
| ------- | ---------------- | --------------------------------------------------- |
| id      | unsigned integer | primary key, auto-increments, generated by database |
| user_id | unsigned integer | required, must be the `id` of an existing `user`    |
| title   | string           | required                                            |
| content | string           |                                                     |
| subreddit | string         |                                                     |

## Endpoints

The API handles the following routes:

| Method | Endpoint                | Description                                                                                                                                                                 | Auth Required? |
| ------ | ----------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| POST   | /api/auth/register      | Creates a user using the information sent inside the `request body`.                                                                                                        | NO             |
| POST   | /api/auth/login         | Verifies credentials sent in the `request body` and returns a JWT used for the Authorization header.                                                                        | NO             |
| GET    | /api/posts/:id          | Returns the post with specified id                                                                                                                                          | YES            |
| DELETE | /api/posts/:id          | Removes the post with the specified id and returns the **deleted post object**.                                                                                             | YES            |
| PUT    | /api/posts/:id          | Updates the post with the specified `id` using data from the `request body`. Returns the modified post.                                                                     | YES            |
| GET    | /api/posts/user/:user_id | Returns an array of all post objects associated with the specified user id                                                                                                 | YES            |
