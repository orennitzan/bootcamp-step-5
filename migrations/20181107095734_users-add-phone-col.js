exports.up = (knex, Promise) =>
  Promise.all([
    knex.schema.alterTable('users', table => table.string('phone'))
  ]);

exports.down = (knex, Promise) =>
  Promise.all([
    knex.table('users', table => {
      table.dropColumn('phone');
    })
  ]);
