const { Pool } = require("pg");
const { Sequelize, DataTypes } = require('sequelize');
const dotenv = require("dotenv");
const { Connector } = require("@google-cloud/cloud-sql-connector");
const createSequelizeInstance = require("./db.sequelize");
dotenv.config({ path: ".env" });

const connector = new Connector();


const clientOpts = async function () {
  return await connector.getOptions({
    instanceConnectionName: process.env.INSTANCE_CONNECTION_NAME,
    ipType: "PUBLIC",
  });
};

async function createPool() {
  const opts = await clientOpts();

  const pool = new Pool({
    ...opts,
    user: process.env.PGUSER,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    max: 5,
  });

  // Example query
  pool.query("SELECT NOW()", (err, res) => {
    if (err) {
      console.error("Error executing query", err);
      return;
    }
    console.log("Current date and time from PostgreSQL:", res.rows[0].now);
  });

  return pool;
}

createSequelizeInstance()


createPool()
  .then((pool) => {
    console.log("Pool created successfully")
    module.exports = pool;
  })
  .catch((err) => {
    console.error("Error with the pool", err);
  });
