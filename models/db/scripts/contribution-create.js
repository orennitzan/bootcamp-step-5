module.exports = `
SET client_min_messages TO WARNING;

DROP TABLE IF EXISTS contribution CASCADE;
CREATE TABLE contribution (
  user_id int not null REFERENCES users(id),
  repository_id int not null REFERENCES repository(id),
  line_count int
  PRIMARY(user_id, repository_id)
);
`;
