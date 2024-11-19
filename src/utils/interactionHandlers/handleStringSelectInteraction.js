const { parseDatabase } = require("../database/parseDatabase");
const { writeToDatabase } = require("../database/writeToDatabase");

module.exports = {
  handleStringSelectInteraction(interaction) {
    let db = parseDatabase();

    if (interaction.customId === "week") {
      db.weekSelection = interaction.values[0];
    }
    writeToDatabase(db);
    interaction.deferUpdate();
  },
};