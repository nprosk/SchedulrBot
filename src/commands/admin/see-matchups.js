const {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  PermissionFlagsBits,
} = require("discord.js");
const Matches = require("../../models/matches");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("see-matchups")
    .setDescription("See all matchups in the database")
    .addIntegerOption((option) =>
      option
        .setName("week")
        .setDescription("The week number for this matchup")
        .setRequired(false)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   * @returns
   */
  async execute(interaction) {
    const week = interaction.options.getInteger("week");
    const server = interaction.guild.id;
    const filter = week ? { week, server } : { server };

    const matchups = await Matches.find(filter).catch(console.error);
    if (matchups.length === 0) {
      return interaction.reply({
        content: "No matchups found",
        ephemeral: true,
      });
    }
    const matchupsString = matchups
      .map((matchup) => {
        return `Week ${matchup.week}: <@&${matchup.role1}> vs <@&${matchup.role2}>`;
      })
      .join("\n");

    interaction.reply({
      content: matchupsString,
      ephemeral: true,
    });
  },
};
