const {
  SlashCommandBuilder,
  PermissionFlagsBits,
  ChatInputCommandInteraction,
} = require("discord.js");
const Matches = require("../../models/matches");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("add-matchup")
    .setDescription("Adds a new matchup to the database")
    .addIntegerOption((option) =>
      option
        .setName("week")
        .setDescription("The week number for this matchup")
        .setRequired(true)
    )
    .addRoleOption((option) =>
      option
        .setName("role-1")
        .setDescription("The first role in the matchup")
        .setRequired(true)
    )
    .addRoleOption((option) =>
      option
        .setName("role-2")
        .setDescription("The second role in the matchup")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("status")
        .setDescription("The status of the matchup")
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
    const role1 = interaction.options.getRole("role-1");
    const role2 = interaction.options.getRole("role-2");

    const existingMatch = await Matches.findOne({
      week,
      role1: role1.id,
      role2: role2.id,
      server: interaction.guild.id,
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
        week,
        role1: role1.id,
        role2: role2.id,
        status: interaction.options.getString("status") || "pending",
        server: interaction.guild.id,
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
