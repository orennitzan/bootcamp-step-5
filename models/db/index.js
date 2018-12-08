const knex = require('knex');

// const knexLogger = require('knex-logger');

const config = require('../../config').pg;

// const db = knexLogger(knex(config));

const db = knex(config);

module.exports = db;

