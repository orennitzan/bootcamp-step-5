const fp = require('lodash/fp')
const joi = require('joi')
const db = require('../db')

const { getColumns, addPrefixAliasToColumns, getColumnsByTableNamePrefix } = require('../db/utils')

const User = require('../user')

const Repository = require('../repository')

const insertReplaceQuery = require('../db/scripts/contribution-insert-replace')

const tableName = 'contribution'

const insertSchema = joi.object({
    repository_id: joi.number().integer().required(),
    user_id: joi.number().integer().required(),
    line_count: joi.number().integer().default(0)
}).required()

// { repository, user, line_count }
async function insert(params) {
    const contribution = joi.attempt(params, insertSchema)

    return db(tableName)
        .insert(contribution)
        .returning('*')
        .then(fp.first)
}

async function insertOrReplace(params) {
    const contribution = joi.attempt(params, insertSchema)

    const pObj = Object.assign({ tableName }, contribution);

    // console.log(pObj);
    return db.raw(insertReplaceQuery, pObj)
        .then((d) => {
            const res = fp.first(d.rows);
            return res;
        })
}

const readSchema = joi.object({
    user: joi.object({
        id: joi.number().integer(),
        login: joi.string()
    }).xor('id', 'login'),
    repository: joi.object({
        id: joi.number().integer(),
        full_name: joi.string()
    }).xor('id', 'full_name')
})
    .or('user', 'repository')
    .required()

async function read(params) {
    const { repository = {}, user = {} } = joi.attempt(params, readSchema)

    // at least one field is required in the condition
    // filter out undefined values
    const condition = fp.omitBy(fp.isUndefined, {
        [`${User.tableName}.id`]: user.id,
        [`${User.tableName}.login`]: user.login,
        [`${Repository.tableName}.id`]: repository.id,
        [`${Repository.tableName}.full_name`]: repository.full_name
    })

    // get the columns of the user and repository tables
    // add alias prefixes to avoid column name collisions
    const [userColumns, repositoryColumns] = await Promise.all([
        getColumns(User.tableName)
            .then(addPrefixAliasToColumns(User.tableName)),
        getColumns(Repository.tableName)
            .then(addPrefixAliasToColumns(Repository.tableName))
    ])
    const selection = [`${tableName}.*`, ...userColumns, ...repositoryColumns]

    const contributions = await db(tableName)
        .where(condition)
        .leftJoin(User.tableName, `${tableName}.user_id`, `${User.tableName}.id`)
        .leftJoin(Repository.tableName, `${tableName}.repository_id`, `${Repository.tableName}.id`)
        .select(selection)

    // format contributions
    const omitUserAndRepositoryColumns = fp.compose([
        fp.omitBy((value, column) => fp.startsWith(`${User.tableName}_`, column)),
        fp.omitBy((value, column) => fp.startsWith(`${Repository.tableName}_`, column))
    ])

    return fp.map((contribution) => Object.assign(omitUserAndRepositoryColumns(contribution), {
        user: getColumnsByTableNamePrefix(User.tableName, contribution),
        repository: getColumnsByTableNamePrefix(Repository.tableName, contribution)
    }), contributions)
}




module.exports = {
    tableName,
    insert,
    insertOrReplace,
    read,

}
