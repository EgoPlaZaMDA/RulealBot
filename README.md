# Discord Rules & Appeals Bot

A Discord bot designed to manage server rules and player appeal templates with ease. This bot allows users to retrieve specific server rules and automatically generates response templates for different types of appeals. It's a useful tool for community managers and moderators looking to streamline the management of rule enforcement and player ban appeals.

## Features

- **Rules Command**: Retrieve specific rules from different sections and subindices, providing detailed information to users about server guidelines.
- **Appeals Command**: Generate pre-written appeal response templates for common cases like skin violations, butterfly clicking, drag clicking, and situations where the benefit of the doubt is given.
- **Error Handling**: Only the user who entered an invalid command or missing subindex sees the error message, ensuring a cleaner chat experience for others.
- **User Mentions**: Automatically mentions the player in appeal responses for more personalized interaction.

## Commands

### `/rule`
Retrieves the text of a specific rule or subindex based on user input.

- **Parameters**:
  - `section`: The section of the rule (e.g., "B" or "D").
  - `number`: The rule number within the section (e.g., "3").
  - `subindex`: (Optional) The subindex of the rule (e.g., "a", "b").

Example: `/rule section:B number:3 subindex:a`

### `/appeal`
Generates a response template for common appeal cases, tagging the user in question.

- **Parameters**:
  - `type`: The type of appeal (e.g., "bfly", "drag", "AC", "BoD", "skin").
  - `player`: The player to be tagged in the response.

Example: `/appeal type:butterflyclick player:@ExampleUser`

## How It Works

The bot uses a JSON file to store rules and appeal templates, allowing for easy updates without modifying the main code. Each rule entry can have a `main` text and optional `sub` entries for subindices. When a command is entered, the bot retrieves the relevant data from the JSON file and displays it in the chat.

For example:
- For the `rule` command, the bot will respond with the main rule text and any specified subindex, or all subindices if no specific one is given.
- For the `appeal` command, the bot will pull the appropriate template, replace the `@PLAYER` placeholder with the specified player mention, and send the message.

The rules were sourced from [oc.tc/rules](https://oc.tc/rules) and the appeal process from [oc.tc/appeal](https://oc.tc/appeal), and the content is tailored for this server. 

## Usage

Invite the bot to your Discord server and use the `/rule` and `/appeal` commands. The bot will respond based on the rules and appeal templates configured in the JSON file.

### Example Commands
`/rule section:B number:3 subindex:a`
Retrieves rule B.3.a and displays the related text.

`/appeal type:skin player:@ExampleUser`
Sends a skin-related appeal response, mentioning @ExampleUser.

## Setup

### Prerequisites
- [Node.js](https://nodejs.org/) (v16.6.0 or higher)
- [Discord.js](https://discord.js.org/) (v14 or higher)
- A Discord Bot Token (Create one in the [Discord Developer Portal](https://discord.com/developers/applications))
