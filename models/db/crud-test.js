const logger = require('../../src/logger').getLogger();
const user = require('../user')
const repository = require('../repository')

logger.debug("Starting db crud test...\n");

(async () => {
    logger.debug("Inserting row into users table...\n")

    let userId = -1

    await user.insert({ login: 'orenni1@martix.co.il', avatar_url: 'orenni1@martix.co.il', html_url: 'orenni1@martix.co.il', phone: '972525252525' })
        .then((res) => {
            userId = res.id;
            console.log(`inserted user id ${userId}`)
        })
        .catch((err) => console.log(err));

    logger.debug(`Reading row from user by user_id ${userId}`)

    await user.read({ id: `${userId}` })
        .then((res) => {
            console.log(res)
        })
        .catch((err) => console.log(err));

    logger.debug("Inserting row into repository table...\n")

    let repoId = -1
    await repository.insert({ owner: 1, full_name: 'orenni', description: 'kuku 111', html_url: 'orenni1@martix.co.il', language: 'js', stargazer_count: 4 })
        .then((res) => {
            repoId = res.id
            console.log(`inserted repository id ${repoId}`)
        })
        .catch((err) => console.log(err));

    logger.debug(`Reading row from repository by repoId ${repoId}`)

    await repository.read({ id: `${repoId}` })
        .then((res) => {
            console.log(res);
        })
        .catch((err) => console.log(err));


    logger.debug(`Reading by sql (my code!!)  row from repository by repoId ${repoId}`)

    await repository.readBySql({ id: `${repoId}` })
        .then((res) => {
            console.log(res);
        })
        .catch((err) => console.log(err));

    logger.debug(`Reading ERROR REPO ID by sql (my code!!)  row from repository by repoId 1002`)

    await repository.readBySql({ id: 1002 })
        .then((res) => {
            console.log(res);
        })
        .catch((err) => {
            console.log(err)
        });


})()


