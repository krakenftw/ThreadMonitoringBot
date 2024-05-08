// import { EmbedBuilder } from 'discord.js';
import { EmbedBuilder } from 'discord.js';
import { client } from '..';

export const checkAllThreads = async () => {
	console.log('Checking Time at ', Date.now());
	const guild = await client.guilds.fetch(process.env.SERVER_ID!);
	await guild.channels.fetch();
	let channels = guild.channels.cache;
	console.log(channels.size);
	channels.forEach((each) => {
		if (each.isThread()) {
			each.messages.fetch({ limit: 1 }).then(async (message) => {
				const firstMessage = message.first();
				const twentyFourHoursAgo = Date.now();
				console.log(twentyFourHoursAgo - firstMessage?.createdTimestamp!);
				if (!firstMessage || twentyFourHoursAgo - firstMessage?.createdTimestamp > 86400000) {
					console.log(each.name);
					const randomNumber = Math.floor(Math.random() * reminderTexts.length);
					const embed = new EmbedBuilder()
						.setColor(16776960)
						.setTitle('Reminder')
						.setDescription(reminderTexts[randomNumber])
						.setTimestamp();
					await each.send({ embeds: [embed] });
				}
			});
		}
	});
};

const reminderTexts = [
	"Hey how's your day going? Let's get going today @here",
	"Hey just wanted to follow up from yesterday! I'm ready to get things going today!@here",
	"How are you doing? I'm here for anything you need today! @here",
	"What's up! Lot's of progress to make today, let me know when you're available and we'll get going! @here",
	"Haven't heard from you recently, did you get my last message? @here",
	"How's it going!? Hope to hear from you today! @here",
	"Did you have any questions from yesterday? Let's get to work today! @here"
];
