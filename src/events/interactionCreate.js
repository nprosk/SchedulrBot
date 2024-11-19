const { Events } = require("discord.js");
const {
  handleButtonInteraction,
} = require("../utils/interactionHandlers/handleButtonInteraction");
const {
  handleRoleSelectInteraction,
} = require("../utils/interactionHandlers/handleRoleSelectInteraction");
const {
  handleStringSelectInteraction,
} = require("../utils/interactionHandlers/handleStringSelectInteraction");

module.exports = {
  name: Events.InteractionCreate,
  async execute(interaction) {
    if (interaction.isChatInputCommand()) {
      const command = interaction.client.commands.get(interaction.commandName);

      if (!command) {
        console.error(
          `No command matching ${interaction.commandName} was found.`
        );
        return;
      }

      try {
        await command.execute(interaction);
      } catch (error) {
        console.error(error);
        if (interaction.replied || interaction.deferred) {
          await interaction.followUp({
            content: "There was an error while executing this command!",
            ephemeral: true,
          });
        } else {
          await interaction.reply({
            content: "There was an error while executing this command!",
            ephemeral: true,
          });
        }
      }
    } else if (interaction.isButton()) {
      handleButtonInteraction(interaction);
    } else if (interaction.isRoleSelectMenu()) {
      handleRoleSelectInteraction(interaction);
    } else if (interaction.isStringSelectMenu()) {
      handleStringSelectInteraction(interaction);
    }
  },
};
