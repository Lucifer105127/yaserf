const fs = require('fs').promises;
const path = require('path');

module.exports.config = {
  name: "changemodules",
  version: "1.0",
  hasPermission: 0,
  credits: "rickkkkkkkkk",
  usePrefix: true,
  description: "Change module properties cmd please follow this in order to use this command or you'll get an error and need mo check yong replit file,  no double quotations proterties  [hasPermission, cooldowns, usePrefix] and the other's have double quotations.",
  commandCategory: "System",
  cooldowns: 0,
};

module.exports.run = async ({ api, event, args }) => {
  try {
    if (args.length < 3) {
      return api.sendMessage("Usage: !changemodules <command_file_name> <property> <new_value>", event.threadID);
    }

    const [commandName, property, ...newPropertyValue] = args;

    
    const commandPath = path.join(__dirname, '..', 'commands', `${commandName}.js`);

   
    const commandContent = await fs.readFile(commandPath, 'utf-8');

 
    const propertyPattern = new RegExp(`${property}:\\s*([\\s\\S]*?),`, 'i');
    const updatedContent = commandContent.replace(
      propertyPattern,
      `${property}: ${newPropertyValue.join(' ')},`
    );

    
    await fs.writeFile(commandPath, updatedContent, 'utf-8');

    api.sendMessage(`Command "${commandName}" ${property} updated to ${newPropertyValue.join(' ')}.`, event.threadID);
  } catch (error) {
    console.error('Error updating property:', error);
    api.sendMessage("An error occurred while updating the property.", event.threadID);
  }
};
