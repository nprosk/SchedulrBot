const { parseDatabase } = require("../database/parseDatabase");
const Matches = require("../../models/matches");
const MatchupMakers = require("../../models/matchupMakers");
const { Interaction } = require("discord.js");

/**
 *
 * @param {Interaction} interaction
 * @returns
 */
module.exports = {
  async handleButtonInteraction(interaction) {
    const existingMatchupMaker = await MatchupMakers.findOne({
      server: interaction.guild.id,
    }).catch(console.error);

    if (!existingMatchupMaker) {
      return interaction.reply({
        content: "You need to set up the matchup maker first!",
        ephemeral: true,
      });
    }
    if (!existingMatchupMaker.team1 || !existingMatchupMaker.team2) {
      return interaction.reply({
        content: "You need to select two teams!",
        ephemeral: true,
      });
    }

    if (db.roles.length < 2) {
      await interaction.reply({
        content: "You need to select two teams!",
        ephemeral: true,
      });
      return;
    } else if (db.roles[0] === db.roles[1]) {
      await interaction.reply({
        content: "You need to select two different teams!",
        ephemeral: true,
      });
      return;
    } else if (!db.roles[0] || !db.roles[1]) {
      await interaction.reply({
        content: "You need to select two teams!",
        ephemeral: true,
      });
      return;
    }

    if (!db.weekSelection) {
      await interaction.reply({
        content: "You need to select a week!",
        ephemeral: true,
      });
      return;
    }

    const week = parseInt(db.weekSelection);
    const role1 = db.roles[0];
    const role2 = db.roles[1];
    const server = interaction.guild.id;
    const status = "pending";

    const existingMatch = await Matches.findOne({
      week: week,
      role1: role1,
      role2: role2,
      server: server,
    }).catch(console.error);
    if (existingMatch) {
      return interaction.reply({
        content:
          "The matchup is already in the database!" +
          " Change the week number or the roles.",
        ephemeral: true,
      });
    } else {
      const newMatch = new Matches({
        week: week,
        role1: role1,
        role2: role2,
        status: status,
        server: server,
      });

      newMatch.save().catch((error) => {
        console.error(error);
        return interaction.reply({
          content: "There was an error adding the match!",
          ephemeral: true,
        });
      });

      return interaction.reply({
        content: `Match in week ${week}, ${role1} vs. ${role2} has been added to the database!`,
        ephemeral: true,
      });
    }
  },
};
