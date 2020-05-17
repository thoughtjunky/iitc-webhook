# IITC-plugins for adding POIs to PokeNav and Meowth Discord bots

This repository has two scripts, which are to be used with [Ingress Intel Total Conversion (IITC)](https://iitc.me/) to help add POIs to two popular Discord bots—[PokeNav](https://pokenavbot.com/) and [Meowth](https://github.com/FoglyOgly/Meowth). If you are looking to use these scripts in your Discord server and do not know anything about IITC, check out the prerequisites below for some information on how to get started.


## The Plugins

Both plugins are forks of Forte's PokeNav Quick Copy POI plugin for the IITC Map. The original script was adapted to add two different use cases:

1. For Meowth bot, the script adds a links to the portal information, allowing you add either the !addgym or !addstop commands to the clipboard. You can then paste the command in your bot command channel, to add the POI to Meowth.
![Portal Info with Meowth Script running](https://i.imgur.com/IInhyh0.png)

2. For PokeNav, clicking on the link will send either the $create poi gym or $create poi stop command directly to your #pokenav moderation channel via a webhook.
![Portal Info with PokeNav Script running](https://i.imgur.com/w3t6ffF.png)


The Meowth functionality is available in the master branch.
The PokeNav webhook functionality is in the webhook branch. It is working but is still subject to tweaking.
