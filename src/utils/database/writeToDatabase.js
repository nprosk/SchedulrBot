const fs = require("fs");

module.exports = {
  writeToDatabase(data) {
    try {
      fs.writeFileSync("db.json", JSON.stringify(data, null, 2));
    } catch (err) {
      console.error(err);
    }
  },
};
