const db = require("../database/dbConfig.js");

module.exports = {
    add,
    find,
    findBy,
    findById,
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