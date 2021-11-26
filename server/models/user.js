const db = require("../db/connection");
const tableName = "users";

const create = (user) => db(tableName).insert(user);
const del = (id) => db(tableName).where({ id }).del();
const findAll = () => db(tableName);
const find = (filters) => db(tableName).where(filters);
const findOneWithPW = (filters) => db(tableName).where(filters).first();
const findOne = (filters) =>
  db
    .select(["id", "email", "created_at", "updated_at"])
    .from(tableName)
    .where(filters)
    .first();

const update = (id, users) => {
  delete users.id; // not allowed to set `id`
  return db(tableName).where({ id }).update(users);
};

module.exports = {
  create,
  del,
  find,
  findAll,
  findOne,
  update,
  findOneWithPW,
};
