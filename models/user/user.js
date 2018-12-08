const fp = require('lodash/fp');
const joi = require('joi');
const db = require('../db');

const tableName = 'users';

const insertSchema = joi
  .object({
    login: joi.string().required(),
    display_name: joi.string(),
    avatar_url: joi
      .string()
      // .uri()
      .required(),
    html_url: joi.string().required(),
    phone: joi.string().required()
  })
  .required();

async function insert(params) {
  const user = joi.attempt(params, insertSchema);

  return db(tableName)
    .insert(user)
    .returning('*')
    // Note!! This is Lodash/FP ==> Functional Programing!! 
    // fp.first is a function that returns the first element of an array.
    // It knows it's data so you don't have to pass anything!! Awesome!!!
    .then(fp.first); 
    // .then((data) => fp.first(data));
}

const readSchema = joi
  .object({
    id: joi
      .number()
      .integer(),
    login: joi.string(),
    limit: joi.number().integer()
  })
  .xor('id', 'login')
  .required();

async function read(params) {
  const selection = joi.attempt(params, readSchema);
  
  return db(tableName)
    .where(selection)
    .select()
    .first();
}

module.exports = {
  tableName,
  insert,
  read
};
