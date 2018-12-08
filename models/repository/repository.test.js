const repository = require('./repository');

const insertObj = { owner: 1, full_name: 'orenni', description: 'kuku 111', html_url: 'orenni1@martix.co.il', language: 'js', stargazer_count: 4 }

test(`Insert one row - ${JSON.stringify(insertObj)} - into repository should return same data.`, async () => {

    const resObj = await repository.insert(insertObj)

    expect(resObj.full_name).toEqual(insertObj.full_name);
});

test(`Read last inserted row by id and get same data`, async () => {

    const repObj = await repository.insert(insertObj)
    
    const res = await repository.read({ id: `${repObj.id}` })

    expect(res.full_name).toEqual(repObj.full_name);
    expect(res.html_url).toEqual(repObj.html_url);
    expect(res.owner.id).toEqual(repObj.owner);
});


test(`Read last inserted row by SQL by id and get same data`, async () => {

    const rObj = await repository.insert(insertObj)
  
    const res = await repository.readBySql({ id: `${rObj.id}` })
  
    expect(res.full_name).toEqual(rObj.repository_full_name);
    expect(res.html_url).toEqual(rObj.repository_html_url);
    expect(res.owner.id).toEqual(rObj.repository_owner);

  });
  
  