const fp = require('lodash/fp')
const user = require('../user/user');
const repository = require('../repository/repository');
const contribution = require('./contribution');

const insertObjUser = { login: 'orenn777@martix.co.il', avatar_url: 'orenni1@martix.co.il', html_url: 'orenni1@martix.co.il', phone: '123456789' }
const insertObjRepo = { owner: 1, full_name: 'orenni-bootcamp', description: 'test repo', html_url: 'orenni1@martix.co.il', language: 'js', stargazer_count: 8 }


test(`Insert user, repository and contribution - return same contribution data.`, async () => {

    const resObjUser = await user.insert(insertObjUser)
    const resObjRepo = await repository.insert(insertObjRepo)

    const insertObjCont = { user_id: `${resObjUser.id}`, repository_id: `${resObjRepo.id}`, line_count: 77 }
    const resObjInsert = await contribution.insertOrReplace(insertObjCont)

    // console.log(resObjInsert)
    expect(resObjInsert.line_count).toEqual(77);
    expect(resObjInsert.user_id).toEqual(resObjUser.id);
    expect(resObjInsert.repository_id).toEqual(resObjRepo.id);

    const readObjCont = { user: { id: `${resObjUser.id}` }, repository: { id: `${resObjRepo.id}` } }
    const resObjRead = await contribution.read(readObjCont).then(fp.first)

    // console.log(resObjRead)

    expect(resObjRead.user.login).toEqual(insertObjUser.login);
    expect(resObjRead.user.login).toEqual(resObjUser.login);

    expect(resObjRead.repository.full_name).toEqual(insertObjRepo.full_name);
    expect(resObjRead.repository.full_name).toEqual(resObjRepo.full_name);


});