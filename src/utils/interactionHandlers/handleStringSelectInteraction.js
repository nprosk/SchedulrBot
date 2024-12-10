const MatchupMakers = require("../../models/matchupMakers");

module.exports = {
  async handleStringSelectInteraction(interaction) {
    if (interaction.customId === "week") {
      await MatchupMakers.findOneAndUpdate(
        {
          server: interaction.guild.id,
        },
        { week: interaction.values[0] },
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