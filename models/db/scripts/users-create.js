module.exports = `SET client_min_messages TO WARNING;

DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users (
  id serial,
  login varchar(255) not null,
  avatar_url varchar(255),
  html_url varchar(255),
  create_date timestamp DEFAULT now(),
  PRIMARY KEY (id)
);`;
