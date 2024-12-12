const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const ServerData = require("../../models/serverData");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("init-server-data")
    .setDescription("Initialize the server data for this server")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  /**
   * 
   * @param {ChatInputCommandInteraction} interaction
   * @returns
   */
  async execute(interaction) {
    const serverData = await ServerData.findOne({
      server: interaction.guild.id,
    }).catch(console.error);
    if (serverData) {
      return interaction.reply({
        content: "Server data already initialized!",
        ephemeral: true,
      });
    }
    const newServerData = new ServerData({
      server: interaction.guild.id,
      currentWeek: 1,
    });
    await newServerData.save().catch(console.error);
    interaction.reply({
      content: "Server data initialized!",
      ephemeral: true,
    });
  }
};