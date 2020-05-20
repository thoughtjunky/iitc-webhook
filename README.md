# IITC-plugin for adding POIs to PokeNav and Meowth Discord bots

This script is to be used with [Ingress Intel Total Conversion (IITC)](https://iitc.me/) to help add POIs to two popular Discord bots—[PokeNav](https://pokenavbot.com/) and [Meowth](https://github.com/FoglyOgly/Meowth). If you are looking to use these scripts in your Discord server and do not know anything about IITC, check out the prerequisites below for some information on how to get started.


## The Plugin

The plugin originated from a fork of [Forte's PokeNav Quick Copy POI plugin](https://github.com/pkmngots/iitc-plugins) for the IITC Map. Additional code was taken from [Sunkast's version](https://gist.github.com/sunkast/f38961398f91b7a31e4d29e46dd1264a) of the same script. The original script was adapted to add two different use cases:

1. For Meowth bot, the script adds a links to the portal information, allowing you add either the `!addstop` or`!addgym` commands to the clipboard. If you have marked a gym as EX-eligible, it will use the `!addexraidgym` command. You can then paste the command in your bot command channel, to add the POI to Meowth.

2. For PokeNav, clicking on the link will send either the `$create poi pokestop` or `$create poi gym` command directly to your #pokenav moderation channel via a webhook. If you have marked a gym as EX-eligible, it will add `"ex_eligible: 1"` to the command.

## Installation
### Prerequisites
1. Ingress account so you can access the Ingress Intel maps
2. Tampermonkey extension
3. Ingress Intel Total Conversion (IITC)
4. PoGo Tools script

You can find instructions for all of these steps [here](https://gitlab.com/AlfonsoML/pogo-s2).

### Installing and Using the Plugin
Check out the instructions on the [wiki page](https://github.com/typographynerd/iitc-plugins/wiki/Using-the-plugin).
