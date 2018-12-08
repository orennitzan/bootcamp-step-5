const heplerMethods = require('./helper-methods');

test('Validate a PORT env variable is Not falsy', () => {
  expect(heplerMethods.getDotEnvVar_PORT()).not.toBeFalsy();
});

test('Validate PORT exists in process.env.PORT and ia 1000', () => {
  expect(heplerMethods.getEnvVar_PORT()).toEqual('1000');
});
