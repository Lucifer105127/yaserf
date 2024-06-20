const { readdirSync, readFileSync, writeFileSync } = require("fs-extra");
const { join, resolve } = require('path')
const { execSync } = require('child_process');
const axios = require('axios')
const config = require("../../ryuko.json");
const chalk = require("chalk");
const listPackage = JSON.parse(readFileSync('../../package.json')).dependencies;
const fs = require("fs");
const login = require('../system/login');
const moment = require("moment-timezone");
const logger = require("./ryukoc.js");
const gradient = require("gradient-string");
const process = require("process");
execSync("rm -rf ../../scripts/commands/cache && mkdir -p ../../scripts/commands/cache && rm -rf ../../scripts/events/cache && mkdir -p ../../scripts/events/cache", (error, stdout, stderr) => {
    if (error) {
        console.log(`error : ${error.message}`);
        return;
    }
    if (stderr) {
        console.log(`stderr : ${stderr} `);
        return;
    }});

const listbuiltinModules = require("module").builtinModules;

global.client = new Object({
    commands: new Map(),
    events: new Map(),
    cooldowns: new Map(),
    eventRegistered: new Array(),
    handleSchedule: new Array(),
    handleReaction: new Array(),
    handleReply: new Array(),
    mainPath: process.cwd(),
    configPath: new String(),
    apiryukoPath: new String(),
    ryukoPath: new String(),
    getTime: function (option) {
        switch (option) {
        case "seconds":
            return `${moment.tz("Asia/Manila").format("ss")}`;
        case "minutes":
            return `${moment.tz("Asia/Manila").format("mm")}`;
        case "hours":
            return `${moment.tz("Asia/Manila").format("HH")}`;
        case "date":
            return `${moment.tz("Asia/Manila").format("DD")}`;
        case "month":
            return `${moment.tz("Asia/Manila").format("MM")}`;
        case "year":
            return `${moment.tz("Asia/Manila").format("YYYY")}`;
        case "fullHour":
            return `${moment.tz("Asia/Manila").format("HH:mm:ss")}`;
        case "fullYear":
            return `${moment.tz("Asia/Manila").format("DD/MM/YYYY")}`;
        case "fullTime":
            return `${moment.tz("Asia/Manila").format("HH:mm:ss DD/MM/YYYY")}`;
        }
    },
    timeStart: Date.now()
});

global.data = new Object({
    threadInfo: new Map(),
    threadData: new Map(),
    userName: new Map(),
    userBanned: new Map(),
    threadBanned: new Map(),
    commandBanned: new Map(),
    threadAllowNSFW: new Array(),
    allUserID: new Array(),
    allCurrenciesID: new Array(),
    allThreadID: new Array(),
});

global.utils = require("./ryukod.js");
global.loading = require("./ryukoc.js");
global.nodemodule = new Object();
global.config = new Object();
global.ryuko = new Object();
global.apiryuko = new Object();
global.configModule = new Object();
global.moduleData = new Array();
global.language = new Object();
global.account = new Object();

  
const cheerful = gradient.fruit
const crayon = gradient('yellow', 'lime', 'green');
const sky = gradient('#3446eb', '#3455eb', '#3474eb');
const BLUE = ('#3467eb');

const errorMessages = [];
if (errorMessages.length > 0) {
    console.log("commands with errors : ");
    errorMessages.forEach(({ command, error }) => {
        console.log(`${command}: ${error}`);
    });
}

var apiryukoValue;
try {
    global.client.apiryukoPath = join(global.client.mainPath, "./assets/api.json");
    apiryukoValue = require(global.client.apiryukoPath);
} catch (e) {
    return;
}
try {
    for (const apiKeys in apiryukoValue) global.apiryuko[apiKeys] = apiryukoValue[apiKeys];
} catch (e) {
    return;
}

var ryukoValue;
try {
    global.client.ryukoPath = join(global.client.mainPath, "./assets/ryuko.json");
    ryukoValue = require(global.client.ryukoPath);
} catch (e) {
    return;
}
try {
    for (const Keys in ryukoValue) global.ryuko[Keys] = ryukoValue[Keys];
} catch (e) {
    return;
}

var configValue;
try {
    global.client.configPath = join(global.client.mainPath, "../../ryuko.json");
    configValue = require(global.client.configPath);
    logger.loader(`deploying ${chalk.blueBright('ryuko')} file`);
} catch (e) {
    return logger.loader(`cant read ${chalk.blueBright('ryuko')} file`, "error");
}

try {
    for (const key in configValue) global.config[key] = configValue[key];
    logger.loader(`deployed ${chalk.blueBright('ryuko')} file`);
} catch (e) {
    return logger.loader(`can't deploy ${chalk.blueBright('ryuko')} file`, "error")
}
const { Sequelize, sequelize } = require("../system/database/index.js");

for (const property in listPackage) {
    try {
        global.nodemodule[property] = require(property)
    } catch (e) {}
}
const langFile = (readFileSync(`${__dirname}/languages/${global.config.language || "en"}.lang`, {
    encoding: 'utf-8'
})).split(/\r?\n|\r/);
const langData = langFile.filter(item => item.indexOf('#') != 0 && item != '');
for (const item of langData) {
    const getSeparator = item.indexOf('=');
    const itemKey = item.slice(0, getSeparator);
    const itemValue = item.slice(getSeparator + 1, item.length);
    const head = itemKey.slice(0, itemKey.indexOf('.'));
    const key = itemKey.replace(head + '.', '');
    const value = itemValue.replace(/\\n/gi, '\n');
    if (typeof global.language[head] == "undefined") global.language[head] = new Object();
    global.language[head][key] = value;
}

global.getText = function (...args) {
  const langText = global.language;
  if (!langText.hasOwnProperty(args[0])) {
    throw new Error(`${__filename} - not found key language : ${args[0]}`);
  }
  var text = langText[args[0]][args[1]];
  if (typeof text === 'undefined') {
    throw new Error(`${__filename} - not found key text : ${args[1]}`);
  }
  for (var i = args.length - 1; i > 0; i--) {
    const regEx = RegExp(`%${i}`, 'g');
    text = text.replace(regEx, args[i + 1]);
  }
  return text;
};

try {
    var appStateFile = resolve(join(global.client.mainPath, "../../ryukostate.json"));
    var appState = ((process.env.REPL_OWNER || process.env.PROCESSOR_IDENTIFIER) && (fs.readFileSync(appStateFile, 'utf8'))[0] != "[" && ryuko.encryptSt) ? JSON.parse(global.utils.decryptState(fs.readFileSync(appStateFile, 'utf8'), (process.env.REPL_OWNER || process.env.PROCESSOR_IDENTIFIER))) : require(appStateFile);
    logger.loader(`deploying ${chalk.blueBright('ryukostate')} file`)
} catch (e) {
    return logger.error(`can't read ${chalk.blueBright('ryukostate')} file`)
}

function onBot({ models: botModel }) {
    const loginData = {};
    loginData.appState = appState;
    login(loginData, async (loginError, loginApiData) => {
        if (loginError) {
            if (loginError.error == 'error retrieving userID. this can be caused by a lot of things, including getting blocked by facebook for logging in from an unknown location. try logging in with a browser to verify.') {
                console.log(loginError.error)
                process.exit(0)
            } else {
                console.log(loginError)
                return process.exit(0)
            }
        }
      
        const fbstate = loginApiData.getAppState();
        loginApiData.setOptions(global.ryuko.FCAOption);
        let d = loginApiData.getAppState();
        d = JSON.stringify(d, null, '\x09');
        if ((process.env.REPL_OWNER || process.env.PROCESSOR_IDENTIFIER) && global.ryuko.encryptSt) {
            d = await global.utils.encryptState(d, process.env.REPL_OWNER || process.env.PROCESSOR_IDENTIFIER);
            writeFileSync(appStateFile, d)
        } else {
            writeFileSync(appStateFile, d)
        }
        global.client.api = loginApiData
        global.ryuko.version = config.version,
        (async () => {
            const commandsPath = `../../scripts/commands`;
            const listCommand = readdirSync(commandsPath).filter(command => command.endsWith('.js') && !command.includes('example') && !global.config.commandDisabled.includes(command));

console.clear();
console.log(chalk.bold.blue(`DEPLOYING ALL COMMANDS\n`));
            for (const command of listCommand) {
                try {
                    const module = require(`${commandsPath}/${command}`);
                    const { config } = module;
                  
                  if (!config?.commandCategory) {
  try {
    throw new Error(`command - ${command} commandCategory is not in the correct format or empty`);
  } catch (error) {
    console.log(chalk.red(error.message));
    continue;
  }
                  }
                  
                  
                 if (!config?.hasOwnProperty('usePrefix')) {
  console.log(`command -`,chalk.hex("#ff0000")(command) + ` does not have the "usePrefix" property.`);
  continue;
                  }

                    if (global.client.commands.has(config.name || '')) {
                        console.log(chalk.red(`command - ${chalk.hex("#FFFF00")(command)} module is already deployed.`));
                        continue;
                    }
                    const { dependencies, envConfig } = config;
                    if (dependencies) {
                        Object.entries(dependencies).forEach(([reqDependency, dependencyVersion]) => {
                            if (listPackage[reqDependency]) return;
                            try {
                                execSync(`npm install --save ${reqDependency}${dependencyVersion ? `@${dependencyVersion}` : ''}`, {
                                    stdio: 'inherit',
                                    env: process.env,
                                    shell: true,
                                    cwd: join(__dirname, 'node_modules')
                                });
                                require.cache = {};
                            } catch (error) {
                                const errorMessage = `failed to install package ${reqDependency}\n`;
                                global.loading.err(chalk.hex('#ff7100')(errorMessage), 'command');
                            }
                        });
                    }

                    if (envConfig) {
                        const moduleName = config.name;
                        global.configModule[moduleName] = global.configModule[moduleName] || {};
                        global.ryuko[moduleName] = global.ryuko[moduleName] || {};
                        for (const envConfigKey in envConfig) {
                            global.configModule[moduleName][envConfigKey] = global.ryuko[moduleName][envConfigKey] ?? envConfig[envConfigKey];
                            global.ryuko[moduleName][envConfigKey] = global.ryuko[moduleName][envConfigKey] ?? envConfig[envConfigKey];
                        }
                        var ryukoPath = require('./assets/ryuko.json');
                        ryukoPath[moduleName] = envConfig;
                        writeFileSync(global.client.ryukoPath, JSON.stringify(ryukoPath, null, 4), 'utf-8');
                    }


                    if (module.onLoad) {
                        const moduleData = {};
                                moduleData.api = loginApiData;
                                moduleData.models = botModel;
                        try {
                            module.onLoad(moduleData);
                        } catch (error) {
                            const errorMessage = "unable to load the onLoad function of the module."
                            throw new Error(errorMessage, 'error');
                        }
                    }

                    if (module.handleEvent) global.client.eventRegistered.push(config.name);
                    global.client.commands.set(config.name, module);
                  try {
  global.loading(`${crayon(``)}successfully deployed ${chalk.blueBright(config.name)}`, "command");
                  } catch (err) {
  console.error("an error occurred while deploying the command : ", err);
                  }
                  
                  console.err
                } catch (error) {
                    global.loading.err(`${chalk.hex('#ff7100')(``)}failed to deploy ${chalk.hex("#FFFF00")(command)} ` + error + '\n' , "command");
                }
            }
        })(),
       
        (async () => {
            const events = readdirSync(join(global.client.mainPath, '../../scripts/events')).filter(ev => ev.endsWith('.js') && !global.config.eventDisabled.includes(ev));
            console.log(chalk.bold.blue(`\n` + `DEPLOYING ALL EVENTS\n`));
            for (const ev of events) {
                try {
                    const event = require(join(global.client.mainPath, '../../scripts/events', ev));
                    const { config, onLoad, run } = event;
                   if (!config || !config.name || !run) {
                        global.loading.err(`${chalk.hex('#ff7100')(``)} ${chalk.hex("#FFFF00")(ev)} module is not in the correct format. `, "event");
                        continue;
                    }
                  
        
if (errorMessages.length > 0) {
    console.log("commands with errors :");
    errorMessages.forEach(({ command, error }) => {
        console.log(`${command}: ${error}`);
    });
}                  
                  
                    if (global.client.events.has(config.name)) {
                        global.loading.err(`${chalk.hex('#ff7100')(``)} ${chalk.hex("#FFFF00")(ev)} module is already deployed.`, "event");
                        continue;
                    }
                    if (config.dependencies) {
                        const missingDeps = Object.keys(config.dependencies).filter(dep => !global.nodemodule[dep]);
                        if (missingDeps.length) {
                            const depsToInstall = missingDeps.map(dep => `${dep}${config.dependencies[dep] ? '@' + config.dependencies[dep] : ''}`).join(' ');
                            execSync(`npm install --no-package-lock --no-save ${depsToInstall}`, {
                                stdio: 'inherit',
                                env: process.env,
                                shell: true,
                                cwd: join(__dirname, 'node_modules')
                            });
                            Object.keys(require.cache).forEach(key => delete require.cache[key]);
                        }
                    }
                    if (config.envConfig) {
                        const configModule = global.configModule[config.name] || (global.configModule[config.name] = {});
                        const configData = global.ryuko[config.name] || (global.ryuko[config.name] = {});
                        for (const evt in config.envConfig) {
                            configModule[evt] = configData[evt] = config.envConfig[evt] || '';
                        }
                        writeFileSync(global.client.ryukoPath, JSON.stringify({
                            ...require(global.client.ryukoPath),
                            [config.name]: config.envConfig
                        }, null, 2));
                    }
                    if (onLoad) {
                        const eventData = {};
                            eventData.api = loginApiData, eventData.models = botModel;
                        await onLoad(eventData);
                    }
                    global.client.events.set(config.name, event);
                    global.loading(`${crayon(``)}successfully deployed ${chalk.blueBright(config.name)}`, "event");
                } 
          catch (err) {
global.loading.err(`${chalk.hex("#ff0000")('')}${chalk.blueBright(ev)} failed with error : ${err.message}`+`\n`, "event");
        }
         


            }
        })();
        console.log(chalk.bold.blue(`\n` + `DEPLOYING BOT DATA\n`));
        global.loading(`${crayon(``)}deployed ${chalk.blueBright(`${global.client.commands.size}`)} commands and ${chalk.blueBright(`${global.client.events.size}`)} events`, "data");
        global.loading(`${crayon(``)}deployed time : ${chalk.blueBright(((Date.now() - global.client.timeStart) / 1000).toFixed() + 's')}`, "data");
        const listenerData = {};
        listenerData.api = loginApiData; 
        listenerData.models = botModel;
        const listener = require('../system/listen.js')(listenerData);
        global.custom = require('../../ryuko.js')({ api: loginApiData });
        global.handleListen = loginApiData.listenMqtt(async (error, message) => {
            if (error) {
                if (error.error === 'Not logged in.') {
                    logger("your bot account has been logged out", 'login');
                    return process.exit(1);
                }
                if (error.error === 'Not logged in') {
                    logger("your account has been checkpointed, please confirm your account and log in again.", 'checkpoints');
                    return process.exit(0);
                }
                console.log(error);
                return process.exit(0);
            }
            if (['presence', 'typ', 'read_receipt'].some(data => data === message.type)) return;
            return listener(message);
        });
    });
}
(async() => {
    try {
        await sequelize.authenticate();
        const authentication = {};
        const chalk = require('chalk');
        authentication.Sequelize = Sequelize;
        authentication.sequelize = sequelize;
        const models = require('../system/database/model.js')(authentication);
        logger.loader(`connected to ${chalk.blueBright('database')}`, "database")
        const botData = {};
        botData.models = models
        onBot(botData);
    } catch (error) { logger(`can't connect to ${chalk.blueBright('database')}`, "database") }})();