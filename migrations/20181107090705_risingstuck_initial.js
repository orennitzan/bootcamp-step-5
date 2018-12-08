const usersCreate = require('../models/db/scripts/users-create');
const repoCreate = require('../models/db/scripts/repository-create');
const contributionCreate = require('../models/db/scripts/contribution-create');

exports.up = (knex, Promise) =>
  Promise.all([
    knex.schema.raw(usersCreate),
    knex.schema.raw(repoCreate),
    knex.schema.raw(contributionCreate)
  ]);

exports.down = (knex, Promise) =>
  Promise.all([
    knex.schema.dropTable('contribution'),
    knex.schema.dropTable('repository'),
    knex.schema.dropTable('users')
  ]);
