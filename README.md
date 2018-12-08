# Risingstack bootcamp-step-4

## Requirements

- [ ] Implement the user model:

      - `User.insert({ id, login, avatar_url, html_url, type })`
        - validate the parameters
      - `User.read({ id, login })`
        - validate the parameters
        - one is required: `id` or `login`
- [ ] Implement the repository model:
      - `Repository.insert({ id, owner, full_name, description, html_url, language, stargazers_count })`
        - Validate the parameters
        - `description` and `language` can be empty `String`s
      - `Repository.read({ id, full_name })`
        - Validate the parameters
        - One is required: `id` or `full_name`
        - Return the owner as well as an object (join tables and reorganize fields)
- [ ] Implement the contribution model: 
      - `Contribution.insert({ repository, user, line_count })`
        - Validate the parameters
      - `Contribution.insertOrReplace({ repository, user, line_count })`
        - Validate the parameters
        - Use a [raw query](http://knexjs.org/#Raw-Queries) and the [`ON CONFLICT`](https://www.postgresql.org/docs/9.6/static/sql-insert.html) SQL expression
      - `Contribution.read({ user: { id, login }, repository: { id, full_name } })`
        - Validate the parameters
        - The function parameter should be an Object, it should contain either a user, either a repository field or both of them.

          If only the user is provided, then all the contributions of that user will be resolved. 
          If only the repository is provided, than all the users who contributed to that repository will be resolved.
          If both are provided, then it will match the contribution of a particular user to a particular repo.

        - The functions resolves to an Array of contributions (when both a user and a repository identifier is passed, it will only have 1 element)
        - Return the repository and user as well as an object
          (*This requirement is just for the sake of making up a problem, when you actually need this function, you will most likely have the user or the repository Object in a whole*)
          ```js
          {
            line_count: 10,
            user: { id: 1, login: 'coconut', ... },
            repository: { id: 1, full_name: 'risingstack/repo', ... }
          }
          ```
        - Use a **single** SQL query
        - When you join the tables, there will be conflicting column names (`id`, `html_url`). Use the `as` keyword when selecting columns (eg. `repository.id as repository_id`) to avoid this

  Notes:
  - `user` is a reserved keyword in PG, use double quotes where you reference the table in a raw query
  - You can get the columns of a table by querying `information_schema.columns`, which can be useful to select fields dinamically when joining tables, eg.:
    ```sql
    SELECT column_name FROM information_schema.columns WHERE table_name='contribution';
    ```

## Installation and Execution

1. git clone <https://github.com/orennitzan/bootcamp-step-4.git>
2. Change directory to **bootcamp-step-4**
3. Run 'npm install'
4. Modify your db parameters in dotenv file:
   - PORT=1000
   - LOG_LEVEL=debug
   - NODE_ENV=development
   - PROCESS_TYPE=web
   - DB_HOST='localhost'
   - DB_USER=postgres
   - DB_NAME=myDb
   - DB_PASS=******
   - DB_PORT=5432
5. Run 'npm run pre-commit' to exec pre-commit script and check results.
6. Run 'npm run migratedb' to run migrations. (make sure to create your db and set it's name in dotenv file).
7. Run 'npm run db-scripts' to test working with the data base.
   - Expect insert and read from users.
   - Expect insert and read from repository.
   - Expect Read from repository by raw sql (my version).
   - Expect Read with non existing repository id and get undefined.

## Comments

1. I was wondering how to test the db?
2. Did not implement the third model - contribution!!!  