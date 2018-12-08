const helperMethods = {
  getDotEnvVars: () => {
    const dotenv = require('dotenv'); // eslint-disable-line global-require
    const result = dotenv.config();
    return result;
  },

  getDotEnvVar_PORT: () => {
    const dotenv = require('dotenv'); // eslint-disable-line global-require
    const result = dotenv.config();
    return result.parsed.PORT;
  },
  getEnvVar_PORT: () => process.env.PORT
};
module.exports = helperMethods;
