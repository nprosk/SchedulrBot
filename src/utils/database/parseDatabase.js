const fs = require("fs");

module.exports = {
  parseDatabase() {
    try {
      const data = fs.readFileSync("db.json", "utf8");
      return JSON.parse(data);
    } catch (err) {
      console.error(err);
      return null;
    }
  },
};