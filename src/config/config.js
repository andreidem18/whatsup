require('dotenv').config();

module.exports = {
  development: {
    use_env_variable: "DATABASE_DEV_URL", 
    dialect: "postgres"
  },
  test: {
    use_env_variable: "DATABASE_TEST_URL", 
    dialect: "postgres"
  },
  production: {
    use_env_variable: "DATABASE_PROD_URL", 
    dialect: "postgres"
  }
}
