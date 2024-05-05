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
				const twentyFourHoursAgo = Date.now() - 24 * 1000;
				if (!firstMessage || firstMessage?.createdTimestamp < twentyFourHoursAgo) {
					const embed = new EmbedBuilder()
						.setColor(16776960)
						.setTitle('Reminder')
						.setDescription(
							'No Messages has been sent in this channel from last 24 hours, This is a reminder to keep the mentors updated! @here'
						)
						.setTimestamp();
					each.send({ embeds: [embed] });
				}
			});
		}
	});
};
