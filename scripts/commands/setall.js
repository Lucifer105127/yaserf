const fs = require('fs').promises;
const path = require('path');

module.exports.config = {
  name: "setallcategory",
  version: "1.0",
  hasPermission: 2,
  credits: "RICKCIEL",
  usePrefix: true,
  description: "Change the command category of specific commands",
  commandCategory: "System",
  cooldowns: 0,
};

module.exports.run = async ({ api, event, args }) => {
  try {
    if (args.length < 2) {
      return api.sendMessage("Usage: !setallcategory <current_category> <new_category>", event.threadID);
    }

    const [currentCategory, newCategory] = args;

    const commandsPath = path.join(__dirname, '..', 'commands');
    const commandFiles = await fs.readdir(commandsPath);

    let changedCommands = 0;

    for (const fileName of commandFiles) {
      if (fileName.endsWith('.js')) {
        const commandPath = path.join(commandsPath, fileName);
        const commandContent = await fs.readFile(commandPath, 'utf-8');
        
        if (commandContent.includes(`commandCategory: "${currentCategory}"`)) {
          const updatedContent = commandContent.replace(
            `commandCategory: "${currentCategory}"`,
            `commandCategory: "${newCategory}"`
          );

          await fs.writeFile(commandPath, updatedContent, 'utf-8');
          changedCommands++;
        }
      }
    }

    api.sendMessage(`Updated ${changedCommands} commands from category "${currentCategory}" to "${newCategory}".`, event.threadID);
  } catch (error) {
    console.error('Error updating command categories:', error);
    api.sendMessage("An error occurred while updating the command categories.", event.threadID);
  }
};
