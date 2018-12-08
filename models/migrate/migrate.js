const knex = require('knex');

const config = require('../../config').pg;

const db = knex(config);

db.migrate.latest(config);