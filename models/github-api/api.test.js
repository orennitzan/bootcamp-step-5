const nock = require('nock');
const api = require('./api');

test('Search repository "bootcamp-step-1 in:name" should return 1 item', async () => {
  nock('https://api.github.com', {
    reqheaders: {
      accept: 'application/vnd.github.v3+json',
      'user-agent': 'RisingStack-Bootcamp'
    }
  })
    .persist()
    .get('/search/repositories')
    .query({ q: 'bootcamp-step-1 in:name' })
    .reply(200, {
      items: [
        {
          name: 'bootcamp-step-1',
          full_name: 'orennitzan/bootcamp-step-1'
        }
        // Uncomment to fail test
        // {
        //     "name": "bootcamp-step-3",
        //     "full_name": "orennitzan/bootcamp-step-3",
        // }
      ]
    });

  const res = await api.searchRepositories({ q: 'bootcamp-step-1 in:name' });
  // expect(gitApi.isDone()).to.eql(true)
  expect(res.items.length).toBe(1);
});

test('Contributors should indicate 1 contributor', async () => {
  nock('https://api.github.com', {
    reqheaders: {
      accept: 'application/vnd.github.v3+json',
      'user-agent': 'RisingStack-Bootcamp'
    }
  })
    .persist()
    .get('/repos/orennitzan/bootcamp-step-1/stats/contributors')
    .query({})
    .reply(200, [
      {
        author: { login: 'orennitzan' }
      }
    ]);

  const res = await api.getContributors('orennitzan/bootcamp-step-1', {});
  expect(res.length).toBeGreaterThanOrEqual(1);
});

// Working search url
// https://api.github.com/search/repositories?q=bootcamp-step-1%20in:name
// Working contributors url
// https://api.github.com/repos/orennitzan/bootcamp-step-1/stats/contributors

// Note!! These tests work against the real git-api. But the task asks to nock it!! 
// See above tests.

test('Search repository "bootcamp-step-1 in:name" should return 1 item', async () => {
  const res = await api.searchRepositories({ q: 'bootcamp-step-1 in:name' });
  expect(res.items.length).toBe(1);
});

test('Search repository bootcamp-step-1 in:name should return 1 repository with full_name as orennitzan/bootcamp-step-1', async () => {
  const res = await api.searchRepositories({ q: 'bootcamp-step-1 in:name' });
  expect(res.items[0].full_name).toBe('orennitzan/bootcamp-step-1');
});

test('Contributors should indicate 1 contributor', async () => {
  const res = await api.getContributors('orennitzan/bootcamp-step-1', {});
  expect(res.length).toBeGreaterThanOrEqual(1);
});

test('Contributors first author login should be orennitzan', async () => {
  const res = await api.getContributors('orennitzan/bootcamp-step-1');
  expect(res[0].author.login).toBe('orennitzan');
});
