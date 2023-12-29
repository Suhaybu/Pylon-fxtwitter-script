# Pylon-fxtwitter-script

A simple TypeScript function for [Pylon.bot](https://pylon.bot) to automatically fix broken Twitter embeds in discord messages.
Pylon allows you to run custom TypeScript code on their bot for free. [FxTwitter by FixTweet](https://github.com/FixTweet/FxTwitter) fixes the embeds.

## How does the script work?

- The script checks if the message contains either twitter.com or x.com
- Messages that contain either links will result in Pylon bot responding to the original message with the embed without pinging the user it's responding to
- The response is in the format `@user via Twitter` where `user` is the author of the tweet
- The original twitter.com / X.com link is switched to [FXtwitter.com / Fixup.com](https://github.com/FixTweet/FxTwitter) to make the embeds functional

```ts
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
```
