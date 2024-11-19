const { parseDatabase } = require("../database/parseDatabase");
const { writeToDatabase } = require("../database/writeToDatabase");

module.exports = {
  handleRoleSelectInteraction(interaction) {
    let db = parseDatabase();

    if (interaction.customId === "team1") {
      db.roles[0] = interaction.values[0];
    }
    if (interaction.customId === "team2") {
      db.roles[1] = interaction.values[0];
    }
    writeToDatabase(db);
    interaction.deferUpdate();
  },
};