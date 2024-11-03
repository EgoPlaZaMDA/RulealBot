const { Client, GatewayIntentBits } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const fs = require('fs');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

// Cargar las reglas desde el archivo JSON
const rules = JSON.parse(fs.readFileSync('rules.json', 'utf8'));

client.once('ready', () => {
    console.log('Bot is ready!');
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const { commandName, options } = interaction;

    if (commandName === 'rule') {
        const section = options.getString('section');
        const ruleNumber = options.getString('number');
        const subIndex = options.getString('subindex'); 

        if (rules[section] && rules[section][ruleNumber]) {
            let response = `**Rule ${section}.${ruleNumber}**: `;
            const rule = rules[section][ruleNumber];

            if (typeof rule === 'string') {
                // Regla sin subíndices
                response += rule;
                await interaction.reply({ content: response, ephemeral: false });
            } else {
                // Regla con subíndices
                response += rule.main;
                if (subIndex) {
                    // Mostrar subíndice específico si existe
                    if (rule.sub[subIndex]) {
                        response += `\n  ${subIndex}. ${rule.sub[subIndex]}`;
                        await interaction.reply({ content: response, ephemeral: false });
                    } else {
                        // Subíndice no encontrado, mostrar solo al usuario
                        await interaction.reply({ content: "Sorry, I couldn't find that subindex.", ephemeral: true });
                    }
                } else {
                    // Mostrar todos los subíndices
                    for (const [key, subRule] of Object.entries(rule.sub)) {
                        response += `\n  ${key}. ${subRule}`;
                    }
                    await interaction.reply({ content: response, ephemeral: false });
                }
            }
        } else {
            await interaction.reply({ content: "Sorry, I couldn't find that rule.", ephemeral: true });
        }
    } else if (commandName === 'appeal') {
        const appealType = options.getString('type');
        const player = options.getUser('player');
    
        if (rules.appeals[appealType]) {
            let response = rules.appeals[appealType].replace('@PLAYER', `<@${player.id}>`);
            await interaction.reply({ content: response, ephemeral: false });
        } else {
            // Tipo de apelación no encontrado, mostrar solo al usuario
            await interaction.reply({ content: "Sorry, I couldn't find that appeal template.", ephemeral: true });
        }
    }
});

client.on('ready', async () => {
    const commands = [
        new SlashCommandBuilder()
            .setName('rule')
            .setDescription('Get a specific rule')
            .addStringOption(option => 
                option.setName('section')
                    .setDescription('Section of the rule (A, B, C, D, E)')
                    .setRequired(true))
            .addStringOption(option => 
                option.setName('number')
                    .setDescription('Rule number')
                    .setRequired(true))
            .addStringOption(option => 
                option.setName('subindex')
                    .setDescription('Subindex of the rule (optional)')
                    .setRequired(false))  
            .toJSON(),
        new SlashCommandBuilder()
            .setName('appeal')
            .setDescription('Send an appeal template')
            .addStringOption(option =>
                option.setName('type')
                    .setDescription('Type of appeal (bfly, drag, BoD, skin, AC)')
                    .setRequired(true))
            .addUserOption(option =>
                option.setName('player')
                    .setDescription('Mention the player')
                    .setRequired(true))
            .toJSON()
    ];

    const guildId = '1079157452894896188';
    const guild = client.guilds.cache.get(guildId);
    await guild.commands.set(commands);
    console.log('Slash commands registered');
});

client.login('MTMwMjE3Nzg3MDAyOTc4MzEzNw.GHoaru.4_DAtA0EAX0slM7i02mDCAtHT1z_aUBW18U24I'); 
