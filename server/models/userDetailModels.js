const db = require("../db/connection");
const tableName = "users";
const { v4: uuidv4 } = require("uuid");

const del = (id) => db(tableName).where({ id }).del();
const findAll = () => db(tableName);
const find = (filters) => db(tableName).where(filters);
const findOne = (filters) => db(tableName).where(filters).first();

// create
const create = (obj) => {
  const id = uuidv4();
  return db(tableName)
    .insert({ ...obj, id })
    .then(() => findOne({ id }));
};

// update
const update = (id, obj) => {
  delete obj.id;
  return db(tableName)
    .where({ id })
    .uipdate(obj)
    .then(() => findOne({ id }));
};

module.exports = {
  create,
  del,
  find,
  findAll,
  findOne,
  update,
};
