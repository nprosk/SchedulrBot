const { SlashCommandBuilder, PermissionFlagsBits, ChannelType } = require("discord.js");
const ServerData = require("../../models/serverData");
const Matches = require("../../models/matches");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("create-channels")
    .setDescription(
      "Create the channels for a specific week (defaults to current week)."
    )
    .addIntegerOption((option) =>
      option
        .setName("week")
        .setDescription("The week number for the channels")
        .setRequired(false)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   * @returns
   * */
  async execute(interaction) {
    const serverData = await ServerData.findOne({
      server: interaction.guild.id,
    }).catch(console.error);
    const week =
      interaction.options.getInteger("week") || serverData.currentWeek;

    if (!serverData) {
      return interaction.reply({
        content: "You need to set up the server data first!",
        ephemeral: true,
      });
    } else {
      let parentGroup = interaction.guild.channels.cache.find((channel) => {
        return channel.name === `Week ${week}`;
      });

      if (!parentGroup) {
        parentGroup = await interaction.guild.channels.create({
          name: `Week ${week}`,
          type: ChannelType.GuildCategory,
        });
      }

      const matches = await Matches.find({
        week,
        server: interaction.guild.id,
      }).catch(console.error);

      for (const match of matches) {
        const role1 = interaction.guild.roles.cache.find((role) => {
          return role.id === match.role1;
        });
        const role2 = interaction.guild.roles.cache.find((role) => {
          return role.id === match.role2;
        });

        const channel = await interaction.guild.channels.create(
          {
            name: `${role1.name}-vs-${role2.name}`,
            type: ChannelType.GuildText,
            parent: parentGroup,
            permissionOverwrites: [
              {
                id: interaction.guild.roles.everyone.id,
                deny: [PermissionFlagsBits.ViewChannel],
              },
              {
                id: role1.id,
                allow: [PermissionFlagsBits.ViewChannel],
              },
              {
                id: role2.id,
                allow: [PermissionFlagsBits.ViewChannel],
              },
            ],
          }
        );
      }

      await interaction.reply({
        content: `Channels for week ${week} have been created!`,
        ephemeral: true,
      });
    }
  },
};
