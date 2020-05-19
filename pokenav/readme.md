# Quick Add PokeNav POI by Webhook Script

This is a [Tampermonkey](https://www.tampermonkey.net/) script that was originally developed by [Forte](https://github.com/pkmngots/iitc-plugins) and subsequently modified by [Sunkast](https://gist.github.com/sunkast/f38961398f91b7a31e4d29e46dd1264a) for use with an IITC map. (If you are not familiar with using IITC map for mapping out PokeStops and Gyms, I highly recommend you check out [Alfonso's PoGo Tools script](https://gitlab.com/AlfonsoML/pogo-s2/-/wikis/How-to-add-new-PoI-to-your-city). You will need to install this script first.) The original script added two links into the portal info screen to quickly copy to the clipboard the command to add the selected portal to your PokeNav POI database.

This script took the original concept further by sending the PokeNav POI command directly to your #PokeNav channel, using a Discord webhook. This version A huge shout out for [tehstone](https://github.com/tehstone) for cleaning up the original code and making configuration a lot easier!


## Installation
### Prerequisites
1. Ingress account so you can access the Ingress Intel maps
2. Tampermonkey extension
3. Ingress Intel Total Conversion (IITC)
4. PoGo Tools script

You can find instructions for all of these steps [here](https://gitlab.com/AlfonsoML/pogo-s2).

### Installing the plug-in
Click [here](https://github.com/typographynerd/iitc-plugins/raw/master/pokenav/webhookpokenavpoicommand.user.js) to install the script in Tampermonkey.

## POI Webhook Settings
Click on **POI Webhook Settings** to bring up the configuration dialog box.

![POI Webhook Settings link](https://i.imgur.com/CymRSyL.png)


### Configuration Options
1. If needed, change prefix for PokeNav commands.
2. Paste in the webhook URL for your #pokenav channel. Check out this [page](https://support.discord.com/hc/en-us/articles/228383668-Intro-to-Webhooks?page=1) if you need help making a webhook URL for your #pokenav channel.
3. Customize the bot name/avatar, if desisred.

![POI Webhook Configuration](https://i.imgur.com/K8s4PGi.png)


## Using the Plug-in
Adding a new POI to PokeNav is now just a click away.
1. Make sure you have labelled the portal as a PokéStop or Gym. Mark as EX gym, if applicable.
2. Click on **Create POI Command** and the command will be sent to your PokeNav channel as a webhook.

![Using the Plug-in](https://i.imgur.com/UXlKjyd.png)

![Discord Command](https://i.imgur.com/0QxG0oU.png)
