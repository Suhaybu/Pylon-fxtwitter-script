// A simple script for Pylon.bot that replies to any twitter links with a fxtwitter.com/fixupx.com

discord.on('MESSAGE_CREATE', async (message) => {
    // Regex for twitter.com and x.com url's
    const twitterRegex = /https?:\/\/twitter\.com\/(\w+)(\/status\/\S*)/;
    const xRegex = /https?:\/\/x\.com\/(\w+)(\/status\/\S*)/;
  
    // Checks if the message has a Twitter link
    let match = message.content.match(twitterRegex);
    let service = 'Twitter';
    let fixupUrl = 'https://fxtwitter.com/';
  
    // If no Twitter link, check if it has an X link
    if (!match) {
      match = message.content.match(xRegex);
      service = 'X (aka Twitter)';
      fixupUrl = 'https://fixupx.com/';
    }
  
    if (match) {
      // Splits username and the data after the username
      const username = match[1];
      const data = match[2];
  
      const replyMessage = `[@${username} via ${service}](${fixupUrl}${username}${data})`;
  
      // Specifying the content and no ping rule for silent reply
      const options = {
        content: replyMessage,
        allowedMentions: {},
      };
  
      // Reply to the message with respect to options
      await message.inlineReply(options);
    }
  });
  