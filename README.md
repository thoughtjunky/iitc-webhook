# IITC-plugin for adding POIs to PokeNav and Meowth Discord bots

This script is to be used with [Ingress Intel Total Conversion (IITC)](https://iitc.app/) to help add POIs to two popular Discord bots—[PokeNav](https://pokenavbot.com/) and [Meowth](https://github.com/FoglyOgly/Meowth). If you are looking to use these scripts in your Discord server and do not know anything about IITC, check out the prerequisites below for some information on how to get started.


## The Plugin

The plugin originated from a fork of [Forte's PokeNav Quick Copy POI plugin](https://github.com/pkmngots/iitc-plugins) for the IITC Map. Additional code was taken from [Sunkast's version](https://gist.github.com/sunkast/f38961398f91b7a31e4d29e46dd1264a) of the same script. The original script was adapted to add two different use cases:

1. For Meowth bot, the script adds a links to the portal information, allowing you add either the `!addstop` or`!addgym` commands to the clipboard. If you have marked a gym as EX-eligible, it will use the `!addexraidgym` command. You can then paste the command in your bot command channel, to add the POI to Meowth.

2. For PokeNav, clicking on the link will send either the `$create poi pokestop` or `$create poi gym` command directly to your #pokenav moderation channel via a webhook. If you have marked a gym as EX-eligible, it will add `"ex_eligible: 1"` to the command.

## Installation
### Prerequisites
1. Any Browser that supports the [Chrome Web Store](https://chrome.google.com/webstore/category/extensions) or [Firefox Addons](https://addons.mozilla.org/en-US/firefox/) ([Google Chrome](http://google.com/chrome), [FireFox](https://www.mozilla.org/en-US/firefox/new/), [Brave](https://brave.com), [Microsoft Edge](https://www.microsoft.com/en-us/edge) (Chromium Version), [Opera](https://www.microsoft.com/en-us/edge), etc.) 
2. [Ingress Account](https://ingress.com/)

### Install
1. Install [IITC](https://iitc.app/download_desktop.html) from [Chrome Web Store](https://chrome.google.com/webstore/detail/iitc-button/febaefghpimpenpigafpolgljcfkeakn) or [Firefox Addons](https://addons.mozilla.org/firefox/addon/iitc-button). 
2. Install [AlfonsoML's pogo-s2 plugin](https://gitlab.com/AlfonsoML/pogo-s2) by clicking [here](https://gitlab.com/AlfonsoML/pogo-s2/raw/master/s2check.user.js?inline=false), Then clicking the install button at the top of the new page that appears.
3. Install [typographynerd's Webhook Raid Bot POI Command](https://github.com/typographynerd/iitc-plugins) by clicking [here](https://github.com/typographynerd/iitc-plugins/raw/master/webhookraidbotpoicommand.user.js?inline=false), Then clicking the install button at the top of the new page that appears.
4. Open the [Ingress Intel Map](https://ingress.com/intel) and verify that you see the `POI Webhook Settings` and `PoGo Settings` at the bottom of the poi info pane. If you both of those things then you've installed everything sucessfully! [[Example Screenshot]](https://i.imgur.com/AR9xhUH.png)


### Setting Up and Using the Plugin
Check out the instructions on the [wiki page](https://github.com/typographynerd/iitc-plugins/wiki/Using-the-plugin).
