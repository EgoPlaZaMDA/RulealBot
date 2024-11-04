const { REST, Routes } =require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
require('dotenv').config();

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

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_BOT_TOKEN);

(async () => {
    try {
        console.log('Started refreshing application (/) commands.');
        await rest.put(Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID), { body: commands });
        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
})();