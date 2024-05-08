import { EmbedBuilder } from 'discord.js';
import { client } from '..';

export const checkAllThreads = async () => {
	const guild = await client.guilds.fetch(process.env.SERVER_ID!);
	guild.channels.fetch();
	let channels = guild.channels.cache;
	channels = channels.filter((each) => {
		if (each.isThread()) {
			each.messages.fetch({ limit: 1 }).then((message) => {
				const firstMessage = message.first();
				const twentyFourHoursAgo = Date.now();
				console.log(twentyFourHoursAgo - firstMessage?.createdTimestamp!);
				if (!firstMessage || twentyFourHoursAgo - firstMessage?.createdTimestamp > 86400000) {
					const randomNumber = Math.floor(Math.random() * reminderTexts.length);
					const embed = new EmbedBuilder()
						.setColor(16776960)
						.setTitle('Reminder')
						.setDescription(reminderTexts[randomNumber])
						.setTimestamp();
					each.send({ embeds: [embed] });
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
