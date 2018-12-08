module.exports = `
SET client_min_messages TO WARNING;

DROP TABLE IF EXISTS repository CASCADE;
CREATE TABLE repository (
  id serial,
  owner int not null  REFERENCES users (id),
  full_name varchar(255) not null,
  description varchar(255),
  html_url varchar(255),
  language varchar(255),
  stargazer_count int,
  create_date timestamp DEFAULT now(),
  PRIMARY KEY (id)
);
`;
