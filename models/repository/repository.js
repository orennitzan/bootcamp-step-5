const fp = require('lodash/fp')
const joi = require('joi')
const db = require('../db')
const { getColumns, addPrefixAliasToColumns, getColumnsByTableNamePrefix } = require('../db/utils')
const User = require('../user')
const sqlBase = require('../db/scripts/repository-select')

const tableName = 'repository'

const insertSchema = joi.object({
  // id: joi.number().integer().required(),
  owner: joi.number().integer().required(),
  full_name: joi.string().required(),
  description: joi.string().allow('').required(),
  html_url: joi.string()/*.uri()*/.required(),
  language: joi.string().allow('').required(),
  stargazer_count: joi.number().integer().required()
}).required()

async function insert(params) {
  const repository = joi.attempt(params, insertSchema)

  return db(tableName)
    .insert(repository)
    .returning('*')
    .then(fp.first)
}

const readSchema = joi.object({
  id: joi.number().integer(),
  full_name: joi.string()
})
  .xor('id', 'full_name')
  .required()

async function read(params) {
  const repository = joi.attempt(params, readSchema)

  // at least one field is required in the condition
  // filter out undefined values
  const condition = fp.omitBy(fp.isUndefined, {
    [`${tableName}.id`]: repository.id,
    [`${tableName}.full_name`]: repository.full_name
  })

  // get the columns of the user table
  // add alias prefixes to avoid column name collisions
  const userColumns = await getColumns(User.tableName)
    .then(addPrefixAliasToColumns(User.tableName))
  const selection = [`${tableName}.*`, ...userColumns]

  const repo = await db(tableName)
    .where(condition)
    .leftJoin(User.tableName, `${tableName}.owner`, `${User.tableName}.id`)
    .select(selection)
    .first()

  if (!repo) {
    return undefined
  }

  const omitUserColumns = fp.omitBy((value, column) => fp.startsWith(`${User.tableName}_`, column))

  return Object.assign(omitUserColumns(repo), {
    owner: getColumnsByTableNamePrefix(User.tableName, repo),
  })
}

async function readBySql(params) {
  const repository = joi.attempt(params, readSchema)

  // at least one field is required in the condition
  // filter out undefined values
  const condition = fp.omitBy(fp.isUndefined, {
    [`${tableName}.id`]: repository.id,
    [`${tableName}.full_name`]: repository.full_name
  })
  let sqlSelect = sqlBase
  if (fp.get('repository.id', condition)) {
    sqlSelect += ` where r.id = ${fp.get('repository.id', condition)} `
  }
  else {
    sqlSelect += ` where  r.full_name = ${fp.get('condition.full_name', condition)}`
  }

  const repo = await db.raw(sqlSelect)

  if (!repo) {
    return undefined
  }

  const omitUserColumns = fp.omitBy((value, column) => fp.startsWith(`${User.tableName}_`, column))
  const omitRepoColumns = fp.omitBy((value, column) => fp.startsWith(`${tableName}_`, column))

  const row = repo.rows[0];
  if (row) {
    return Object.assign(omitUserColumns(row), {
      owner: omitRepoColumns(row),
    })
  }
  return undefined
}

module.exports = {
  tableName,
  insert,
  read,
  readBySql
}
