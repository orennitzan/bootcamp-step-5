const user = require('./user');

const insertObj = { login: 'orenni1234@martix.co.il', avatar_url: 'orenni1@martix.co.il', html_url: 'orenni1@martix.co.il', phone: '972525252525' }

test(`Insert one row - ${JSON.stringify(insertObj)} - into users should return same data.`, async () => {

  const resObj = await user.insert(insertObj)

  expect(resObj.login).toEqual(insertObj.login);
});

test(`Read last inserted row by id and get same data`, async () => {

  const resObj = await user.insert(insertObj)

  const res = await user.read({ id: `${resObj.id}` })

  expect(res).toEqual(resObj);
});

