**Original PokeNav Script**

This is a Tampermonkey script that was originally developed by [Forte](https://github.com/pkmngots/iitc-plugins) and subsequently modified by [Sunkast](https://gist.github.com/sunkast/f38961398f91b7a31e4d29e46dd1264a). This plugin adds two links into the portal info screen to quickly copy to the clipboard the command to add the selected portal to your PokeNav POI database. If the gym is marked as an EX eligible gym, it will also add the modifier to tag it as ex_eligible in PokeNav.

The script adds two buttons to the portal info pane to quick copy PokeNav related commands to the clipboard.

Depending on what button is selected, it will either copy\
  $create poi pokestop "`portal name`" `portal latitude` `portal longitude`\
    or\
  $create poi gym "`portal name`" `portal latitude` `portal longitude`\
    or\
  $create poi gym "`portal name`" `portal latitude` `portal longitude` "`ex_eligible: 1`"\
      *if gym is marked as EX eligible*
