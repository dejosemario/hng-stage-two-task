const app = require("./app.js");
const createSequelizeInstance = require("./config/db.js");
const { initializeModels } = require("./models");

const { config } = require("dotenv");
require("./config/db.js");

config("/*.env");

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  await createSequelizeInstance();
  const { sequelize } = await initializeModels();
  await sequelize.sync({ force: true });
  console.log(`Server is running on port ${PORT}`);
});
