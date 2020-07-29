const db = require("../database/dbConfig.js");

module.exports = {
    add,
    find,
    findBy,
    findById,
    update,
    remove
};

function find() {
    return db("posts as p")
        .orderBy("p.id");
}

function findBy(filter) {
    return db("posts as p")
        .where("p.user_id","=",filter)
        .select("p.*")
        .orderBy("p.id");
}

async function add(post) {
    try {
        const [id] = await db("posts").insert(post, "id");

        return findById(id);
    } catch (error) {
        throw error;
    }
}

function findById(id) {
    return db("posts").where({ id }).first();
}

function update(id, changes) {
    return db('posts')
      .where({ id })
      .update(changes)
      .then(() => {
        return findById(id);
      });
  }
  
  function remove(id) {
    return db('posts')
      .where('id', id)
      .del();
  }