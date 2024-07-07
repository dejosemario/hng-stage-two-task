const app = require("./app.js");
const { config } = require("dotenv");
 require("./config/db.js");

config("/*.env");

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
