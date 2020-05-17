# Quick Add PokeNav POI by Webhook Script

This is a [Tampermonkey](https://www.tampermonkey.net/) script that was originally developed by [Forte](https://github.com/pkmngots/iitc-plugins) and subsequently modified by [Sunkast](https://gist.github.com/sunkast/f38961398f91b7a31e4d29e46dd1264a) for use with an IITC map. (If you are not familiar with using IITC map for mapping out PokeStops and Gyms, I highly recommend you check out [Alfonso's PoGo Tools script](https://gitlab.com/AlfonsoML/pogo-s2/-/wikis/How-to-add-new-PoI-to-your-city). You will need to install this script first.) The original script added two links into the portal info screen to quickly copy to the clipboard the command to add the selected portal to your PokeNav POI database.

This script took this concept one step further, but sending the PokeNav POI command directly to your #PokeNav channel, using a Discord webhook.

Like the script by Sunkast, if the gym is marked as an EX eligible gym, it will also add the modifier to tag it as ex_eligible in PokeNav.

## Adding your webhook URL

You will need to add the full URL for your Discord webhook in **two** places. Search for
```
request.open("POST", "https://discordapp.com/api/webhooks/REPLACE_WITH_WEBHOOK_URL");
```
and replace with your webhook URL.

Check out this [page](https://support.discord.com/hc/en-us/articles/228383668-Intro-to-Webhooks?page=1) if you need help making a webhook URL for your #pokenav channel.

## Customize Bot Username and Avatar

If you wish, you can customize the webhook's name and avatar by changing these parameters:
```
var params = {
        username: "IngressMapper",
        avatar_url: "https://cdn.discordapp.com/attachments/533291273914941460/711554807906959411/IngressMapper.jpg",
```
Again, they are in **two places** so be sure to change them both.

## Friendly Reminder—I am not a programmer!

Use this script at your own risk! I am not a Javascript programmer (as anyone can quickly see!) I simply took some information from the helpful [webpage](https://dev.to/oskarcodes/send-automated-discord-messages-through-webhooks-using-javascript-1p01) by [Oskar Codes](https://github.com/oskar-codes) and plugged it into the existing script. It seems to work but I'd happily take any suggestions from people who know what they are doing!
