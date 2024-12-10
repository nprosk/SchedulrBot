const MatchupMakers = require("../../models/matchupMakers");

module.exports = {
  async handleRoleSelectInteraction(interaction) {
    if (interaction.customId = "team1") {
      await MatchupMakers.findOneAndUpdate(
        {
          server: interaction.guild.id,
        },
        { team1: interaction.values[0] },
        { new: true, runValidators: true, upsert: false }
      )
        .then((result) => {
          if (!result) {
            return interaction.reply({
              content: "You need to set up the matchup maker first!",
              ephemeral: true,
            });
          } else {
            interaction.deferUpdate();
          }
        })
        .catch(console.error);
    }
    else if (interaction.customId = "team2") {
      await MatchupMakers.findOneAndUpdate(
        {
          server: interaction.guild.id,
        },
        { team2: interaction.values[0] },
        { new: true, runValidators: true, upsert: false }
      )
        .then((result) => {
          if (!result) {
            return interaction.reply({
              content: "You need to set up the matchup maker first!",
              ephemeral: true,
            });
          } else {
            interaction.deferUpdate();
          }
        })
        .catch(console.error);
    }
  },
};
