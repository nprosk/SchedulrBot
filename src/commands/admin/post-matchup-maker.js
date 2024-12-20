const {
  SlashCommandBuilder,
  ActionRowBuilder,
  RoleSelectMenuBuilder,
  ButtonBuilder,
  ButtonStyle,
  ChannelType,
  PermissionFlagsBits,
  StringSelectMenuBuilder,
  StringSelectMenuOptionBuilder,
  ChatInputCommandInteraction,
} = require("discord.js");
const MatchupMakers = require("../../models/matchupMakers");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("post-matchup-maker")
    .setDescription("Post the matchup maker message"),

  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   */
  async execute(interaction) {
    const team1 = new RoleSelectMenuBuilder()
      .setCustomId("team1")
      .setPlaceholder("Select team 1")
      .addDefaultRoles();

    const team2 = new RoleSelectMenuBuilder()
      .setCustomId("team2")
      .setPlaceholder("Select team 2")
      .addDefaultRoles();

    const weekOptions = [];
    for (i = 1; i < 8; i++) {
      weekOptions.push(
        new StringSelectMenuOptionBuilder()
          .setLabel(`Week ${i}`)
          .setDescription(`This match will be played in week ${i}`)
          .setValue(`${i}`)
      );
    }
    const week = new StringSelectMenuBuilder()
      .setOptions(weekOptions)
      .setCustomId("week")
      .setPlaceholder("Select week");

    const confirm = new ButtonBuilder()
      .setCustomId("create-matchup")
      .setLabel("Create Matchup")
      .setStyle(ButtonStyle.Primary);

    const remove = new ButtonBuilder()
      .setCustomId("remove-matchup")
      .setLabel("Remove Matchup")
      .setStyle(ButtonStyle.Danger);

    const row1 = new ActionRowBuilder().addComponents(team1);
    const row2 = new ActionRowBuilder().addComponents(team2);
    const row3 = new ActionRowBuilder().addComponents(week);
    const row4 = new ActionRowBuilder().addComponents(confirm, remove);

    const guild = interaction.guild;
    const findChannel = interaction.guild.channels.cache.find((channel) => {
      return (
        channel.name === "match-maker" && channel.type === ChannelType.GuildText
      );
    });
    if (!findChannel) {
      const channel = await guild.channels.create({
        name: "match-maker",
        type: ChannelType.GuildText,
        parent:
          interaction.guild.channels.cache.find(
            (channel) =>
              channel.name === "Bot Channels" &&
              channel.type === ChannelType.GuildCategory
          ) ||
          (await guild.channels.create({
            name: "Bot Channels",
            type: ChannelType.GuildCategory,
          })),
        permissionOverwrites: [
          {
            id: guild.roles.everyone.id,
            deny: [PermissionFlagsBits.ViewChannel],
          },
        ],
      });

      await channel.send({
        content: "Choose the two teams",
        components: [row1, row2, row3, row4],
      });
    } else {
      //delete all messages in the channel first
      const messages = await findChannel.messages.fetch();
      for (const message of messages.values()) {
        await message.delete();
      }

      await findChannel.send({
        content: "Choose the two teams",
        components: [row1, row2, row3, row4],
      });
    }

    //delete all prev matchup makers for the server
    await MatchupMakers.deleteMany({
      server: interaction.guild.id,
    });

    const matchupMaker = new MatchupMakers({
      team1: null,
      team2: null,
      week: null,
      server: interaction.guild.id,
    });

    await matchupMaker.save();

    await interaction.reply({
      content: "Message sent!",
      ephemeral: true,
    });
  },
};
