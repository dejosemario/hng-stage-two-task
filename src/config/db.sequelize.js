const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');
const { Connector } = require('@google-cloud/cloud-sql-connector');
const pool = require('./db.js');

dotenv.config({ path: '.env' });

const connector = new Connector();

async function createSequelizeInstance() {
  const clientOpts = await connector.getOptions({
    instanceConnectionName: process.env.INSTANCE_CONNECTION_NAME,
    ipType: 'PUBLIC',
  });

  const sequelize = new Sequelize({
    dialect: 'postgres',
    username: process.env.PGUSER,
    // database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    host: process.env.PGHOST,
    port: process.env.DB_PORT,
    pool: {
      max: 5,
      min: 0,
      acquire: 60000,  // Increased acquire timeout
      idle: 20000,     // Increased idle timeout
    },   
  });

  // Test the connection
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (err) {
    console.log('Unable to connect to the database:', err);
  }

  return sequelize;
}

module.exports = createSequelizeInstance;