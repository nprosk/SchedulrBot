const {
  SlashCommandBuilder,
  PermissionFlagsBits,
  ChatInputCommandInteraction,
} = require("discord.js");
const Matches = require("../../models/matches");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("remove-matchup")
    .setDescription("Removes a matchup from the database")
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
    if (!existingMatch) {
      return interaction.reply({
        content:
          "The matchup is not in the database!",
        ephemeral: true,
      });
    } else {
      await Matches.deleteOne({
        week,
        role1: role1.id,
        role2: role2.id,
        server: interaction.guild.id,
      }).catch(console.error);
      return interaction.reply({
        content:
          "The matchup has been removed from the database!",
        ephemeral: true,
      });
    }
  }
};