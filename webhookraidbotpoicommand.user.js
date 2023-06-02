// ==UserScript==
// @id quickCopyPortalnameplus
// @name IITC Plugin: Webhook Raid Bot POI Command
// @category Tweaks
// @version 0.10.0
// @namespace    https://github.com/typographynerd/iitc-plugins
// @downloadURL  https://github.com/typographynerd/iitc-plugins/raw/master/webhookraidbotpoicommand.user.js
// @homepageURL  https://github.com/typographynerd/iitc-plugins
// @description Sends command to manage POIs to raid bot admin channel with one click
// @author tehstone, typographynerd. forked from Forte and Sunkast
// @include        https://intel.ingress.com/*
// @match          https://intel.ingress.com/*
// @grant          none
// ==/UserScript==

/* globals dialog */

// Wrapper function that will be stringified and injected
// into the document. Because of this, normal closure rules
// do not apply here.
function wrapper(plugin_info) {
  // Make sure that window.plugin exists. IITC defines it as a no-op function,
  // and other plugins assume the same.
  if (typeof window.plugin !== "function") window.plugin = function () {};

  const thisPlugin = window.plugin;
  const KEY_SETTINGS = "plugin-pokenav-webhook-settings";

  // Use own namespace for plugin
  window.plugin.SendToWebhook = function () {};

  // Name of the IITC build for first-party plugins
  plugin_info.buildName = "SendToWebhook";

  // Datetime-derived version of the plugin
  plugin_info.dateTimeVersion = "20190101000000";

  // ID/name of the plugin
  plugin_info.pluginId = "pokenavpoimanagement";

  const TIMERS = {};
  function createThrottledTimer(name, callback, ms) {
    if (TIMERS[name]) clearTimeout(TIMERS[name]);

    // throttle if there are several calls to the functions
    TIMERS[name] = setTimeout(function () {
      delete TIMERS[name];
      if (typeof window.requestIdleCallback == "undefined") callback();
      // and even now, wait for iddle
      else
        requestIdleCallback(
          function () {
            callback();
          },
          { timeout: 2000 }
        );
    }, ms || 100);
  }

  // The entry point for this plugin.
  function setup() {
    const webhookNotification =
      ".webhookNotifcation{width:200px;height:20px;height:auto;position:absolute;left:50%;margin-left:-100px;top:20px;z-index:10000;background-color: #383838;color: #F0F0F0;font-family: Calibri;font-size: 20px;padding:10px;text-align:center;border-radius: 2px;-webkit-box-shadow: 0px 0px 24px -1px rgba(56, 56, 56, 1);-moz-box-shadow: 0px 0px 24px -1px rgba(56, 56, 56, 1);box-shadow: 0px 0px 24px -1px rgba(56, 56, 56, 1);}";
    const copyNotification =
      ".copyNotification{width:200px;height:20px;height:auto;position:absolute;left:50%;margin-left:-100px;top:20px;z-index:10000;background-color: #383838;color: #F0F0F0;font-family: Calibri;font-size: 20px;padding:10px;text-align:center;border-radius: 2px;-webkit-box-shadow: 0px 0px 24px -1px rgba(56, 56, 56, 1);-moz-box-shadow: 0px 0px 24px -1px rgba(56, 56, 56, 1);box-shadow: 0px 0px 24px -1px rgba(56, 56, 56, 1);}";
    $("head").append("<style>" + webhookNotification + "</style>");
    $("head").append("<style>" + copyNotification + "</style>");

    const titleCSS = ".title{cursor:pointer;}";
    $("head").append("<style>" + titleCSS + "</style>");

    $("body").append(
      "<div class='webhookNotification' style='display:none'>Webhook Sent</div>"
    );
    $("body").append(
      "<div class='copyNotification' style='display:none'>Command Copied to Clipboard</div>"
    );


    window.addHook(
      "portalDetailsUpdated",
      window.plugin.SendToWebhook.addButton
    );

    const toolbox = document.getElementById("toolbox");

    const buttonWebhook = document.createElement("a");
    buttonWebhook.textContent = "POI Webhook Settings";
    buttonWebhook.title = "Configuration for POI Webhook";
    buttonWebhook.addEventListener("click", thisPlugin.showSettingsDialog);
    toolbox.appendChild(buttonWebhook);

    loadSettings();
  }

  thisPlugin.showSettingsDialog = function () {
    const html =
              `<p><label for="textBotName">Bot Display Name</label><br><input type="text" id="textBotName" size="20" /></p>
               <p><label for="textWebhookUrl">Webhook URL</label><br><input type="text" id="textWebhookUrl" size="40" /></p>
               <p><label for="textWebhookUrlAlt">2nd Webhook URL (optional)</label><br><input type="text" id="textWebhookUrlAlt" size="40" /></p>
               <p><label for="textAvatarUrl">Avatar URL</label><br><input type="text" id="textAvatarUrl" size="40" /></p>
               <p><label for="selectBotType">Raid Bot</label>
                <select id="selectBotType">
                  <option value="kyogre">Kyogre</option>
                  <option value="meowth">Meowth</option>
                  <option value="pokenav">Pokenav</option>
                </select>
               <p>
              `;

    const width = Math.min(screen.availWidth, 420);
    const container = dialog({
      id: "settings",
      width: width + "px",
      html: html,
      title: "POI Webhook Settings",
    });

    const div = container[0];

    const textBotPrefixStr = div.querySelector("#textBotPrefix");
    textBotPrefixStr.value = settings.botPrefix;
    textBotPrefixStr.addEventListener("change", (e) => {
      settings.botPrefix = textBotPrefixStr.value;
      saveSettings();
    });

    const textWebhookUrlStr = div.querySelector("#textWebhookUrl");
    textWebhookUrlStr.value = settings.webhookUrl;

    textWebhookUrlStr.addEventListener("change", (e) => {
      settings.webhookUrl = textWebhookUrlStr.value;
      saveSettings();
    });

    const textWebhookUrlAltStr = div.querySelector("#textWebhookUrlAlt");
    textWebhookUrlAltStr.value = settings.webhookUrlAlt;

    textWebhookUrlAltStr.addEventListener("change", (e) => {
      settings.webhookUrlAlt = textWebhookUrlAltStr.value;
      saveSettings();
    });

    const textBotNameStr = div.querySelector("#textBotName");
    textBotNameStr.value = settings.botName;

    textBotNameStr.addEventListener("change", (e) => {
      settings.botName = textBotNameStr.value;
      saveSettings();
    });

    const textAvatarUrlStr = div.querySelector("#textAvatarUrl");
    textAvatarUrlStr.value = settings.avatarUrl;

    textAvatarUrlStr.addEventListener("change", (e) => {
      settings.avatarUrl = textAvatarUrlStr.value;
      saveSettings();
    });

    const selectBotTypeSel = div.querySelector("#selectBotType");
    selectBotTypeSel.value = settings.botType;

    selectBotTypeSel.addEventListener("change", (e) => {
      settings.botType = selectBotTypeSel.value;
      saveSettings();
    });
  };

  window.plugin.SendToWebhook.addButton = function () {
    $(".linkdetails").append(
      '<br><aside><a href="#" onclick="window.plugin.SendToWebhook.createPOICommand()">Create POI Command</a></aside><br>'
    );
    if (settings.botType == "kyogre") {
      $(".linkdetails").append(
        '<aside><a href="#" onclick="window.plugin.SendToWebhook.convertToGymCommand()">Convert to Gym Command</a></aside><br>'
      );
    }
    if (settings.botType != "meowth") {
      $(".linkdetails").append(
        '<aside><a href="#" onclick="window.plugin.SendToWebhook.markEXCommand()">Set Gym as EX Command</a></aside><br>'
      );
      $(".linkdetails").append(
        '<aside><a href="#" onclick="window.plugin.SendToWebhook.updatePOICommand()">Update POI Command</a></aside><br>'
      );
    }
    $(".linkdetails").append(
      '<aside><a href="#" onclick="window.plugin.SendToWebhook.getInfoCommand()">Get POI Info Command</a></aside><br>'
    );
    $(".linkdetails").append(
      '<aside><a href="#" onclick="window.plugin.SendToWebhook.openPGmapCommand()">Open portal in pgmap.org</a></aside><br>'
    );
  };

  window.plugin.SendToWebhook.createPOICommand = function () {
    const poiType = getPoiType();
    if (poiType == "none") {
        alert("Please mark this POI as either a stop or gym and try again");
        return;
    }
    const portalData = window.portals[window.selectedPortal].options.data;
    let prompt = false;
    if (settings.botType == "kyogre") {
      prompt = true;
    }
    const commands = getCommands(portalData, prompt);

    let commandMessageText = "";
    if (poiType == "gym") {
        const is_ex = document.getElementById("PogoGymEx");
        commandMessageText = commands.gym_create;
        if (is_ex && is_ex.checked) {
            commandMessageText = commands.gym_create_ex;
        }
    } else {
        commandMessageText = commands.stop_create;
    }

    if (settings.botType == "meowth") {
      copyCommandToClipboard(settings.botPrefix + commandMessageText);
    } else {
      sendCommandToWebhook(settings.botPrefix + commandMessageText);
    }

  };

  window.plugin.SendToWebhook.convertToGymCommand = function () {
    const portalData = window.portals[window.selectedPortal].options.data;

    const commands = getCommands(portalData, false);

    const commandMessageText = settings.botPrefix + commands.convert_to_gym;

    sendCommandToWebhook(commandMessageText);
  };

  window.plugin.SendToWebhook.markEXCommand = function() {
    const portalData = window.portals[window.selectedPortal].options.data;
    let prompt = false;
    if (settings.botType == "pokenav") {
      prompt = true;
    }

    const commands = getCommands(portalData, prompt);

    const commandMessageText = settings.botPrefix + commands.mark_ex;

    sendCommandToWebhook(commandMessageText);
  }

  window.plugin.SendToWebhook.updatePOICommand = function() {
    const poiType = getPoiType();
    if (poiType == "none") {
        alert("Please mark this POI as either a stop or gym and try again");
        return;
    }

    const portalData = window.portals[window.selectedPortal].options.data;
    let shouldPrompt = false;
    if (settings.botType == "pokenav") {
      shouldPrompt = true;
    }

    let commandMessageText = ""
    if (settings.botType == "kyogre") {
      let promptResponse;
      promptResponse = prompt('Do you want to update the "name" or the "location" of this POI?');
      if (promptResponse && promptResponse == "name") {
        promptResponse = prompt('What is the old name of this POI?');
        if (promptResponse) {
          let commands = getCommands(portalData, false, promptResponse);
          if (poiType == "gym") {
            commandMessageText = settings.botPrefix + commands.edit_gym_name;
          } else {
            commandMessageText = settings.botPrefix + commands.edit_stop_name;
          }
        } else {
          window.plugin.dialog.message('Must provide the previous name for this POI.');
          return;
        }
      } else if (promptResponse && promptResponse == "location") {
        let commands = getCommands(portalData, shouldPrompt);
        if (poiType == "gym") {
          commandMessageText = settings.botPrefix + commands.edit_gym_location;
        } else {
          commandMessageText = settings.botPrefix + commands.edit_stop_location;
        }
      } else {
        window.plugin.dialog.message('Must choose either "name" or "location" as the update type.');
        return;
      }
    } else {
      let commands = getCommands(portalData, shouldPrompt);
      if (poiType == "gym") {
        const is_ex = document.getElementById("PogoGymEx");
        commandMessageText = settings.botPrefix + commands.update_poi_gym;
        if (is_ex && is_ex.checked) {
            commandMessageText = settings.botPrefix + commands.update_poi_EXgym;
        }
        } else {
        commandMessageText = settings.botPrefix + commands.update_poi_stop;
      }
    }

    sendCommandToWebhook(commandMessageText);
  }

  window.plugin.SendToWebhook.getInfoCommand = function() {
    const poiType = getPoiType();
    if (poiType == "none") {
        alert("Please mark this POI as either a stop or gym and try again");
        return;
    }

    const portalData = window.portals[window.selectedPortal].options.data;
    const commands = getCommands(portalData, false);

    let commandMessageText = ""
    if (poiType == "gym") {
      commandMessageText = settings.botPrefix + commands.gym_info;
    } else {
      commandMessageText = settings.botPrefix + commands.stop_info;
    }

    sendCommandToWebhook(commandMessageText);
  }

  window.plugin.SendToWebhook.openPGmapCommand = function() {

    const portalData = window.portals[window.selectedPortal].options.data;

    const commands = getCommands(portalData, false);

    let commandMessageText = ""
      commandMessageText = commands.poi_url;

    var myWindow = window.open("", "POImapWindow");

    myWindow.location.href = commandMessageText
  }

  const getCommands = function(portalData, prompt, old_name) {
    const { p_name, p_lat, p_lng } = getPortalData(portalData);
    let label = "";
    if (prompt) {
      label = promptInfo();
    }

    const botCommandTemplates = {
      "kyogre":
        { "stop_create": `loc add stop, ${p_name}, ${p_lat} , ${p_lng}, ${label}`,
          "gym_create": `loc add gym, ${p_name}, ${p_lat} , ${p_lng}, ${label}`,
          "gym_create_ex": `loc add gym, ${p_name}, ${p_lat} , ${p_lng}, ${label}, true`,
          "mark_ex": `loc extoggle ${p_name}`,
          "convert_to_gym": `loc convert ${p_name}`,
          "stop_info": `pokestop ${p_name}`,
          "gym_info": `gym ${p_name}`,
          "edit_stop_name": `loc edit stop, ${old_name}, name, ${p_name}`,
          "edit_stop_location": `loc edit stop, ${p_name}, location, ${p_lat}, ${p_lng}`,
          "edit_gym_name": `loc edit gym, ${old_name}, name, ${p_name}`,
          "edit_gym_location": `loc edit gym, ${p_name}, location, ${p_lat}, ${p_lng}`
        },
      "meowth":
        {
          "stop_create": `addstop "${p_name}" ${p_lat} ${p_lng}`,
          "gym_create": `addgym "${p_name}" ${p_lat} ${p_lng}`,
          "gym_create_ex": `addexraidgym "${p_name}" ${p_lat} ${p_lng}`,
          "mark_ex": ``,
          "convert_to_gym": ``,
          "stop_info": `whereis ${p_name}`,
          "gym_info": `whereis ${p_name}`
        },
      Okay, I'll remove the quotes around p_name. Here is the updated code:

"pokenav":
        {
          "stop_create": `/mod-poi poi create name:${p_name} latitude:${p_lat} longitude:${p_lng} poi_type:pokestop`,
          "gym_create": `/mod-poi poi create name:${p_name} latitude:${p_lat} longitude:${p_lng} poi_type:gym`,
          "gym_create_ex": `/mod-poi poi create name:${p_name} latitude:${p_lat} longitude:${p_lng} poi_type:gym ex_eligible:True`,
          "mark_ex": `/mod-poi poi update poi_id:${label} poi_type:gym ex_eligible:True`,
          "convert_to_gym": `/mod-poi poi update poi_id:${label} poi_type:gym`,
          "update_poi_gym": `/mod-poi poi update poi_id:${label} name:${p_name} latitude:${p_lat} longitude:${p_lng} poi_type:gym ex_eligible:False`,
          "update_poi_EXgym": `/mod-poi poi update poi_id:${label} name:${p_name} latitude:${p_lat} longitude:${p_lng} poi_type:gym ex_eligible:True`,
          "update_poi_stop": `/mod-poi poi update poi_id:${label} name:${p_name} latitude:${p_lat} longitude:${p_lng} poi_type:pokestop`,
          "stop_info": `si ${p_name}`,
          "gym_info": `gi ${p_name}`,
          "poi_url": `https://pgmap.org/map.html?center=${p_lat},${p_lng}&zoom=18&map=OpenStreetMap&show=1111`
        }
    }
    return botCommandTemplates[settings.botType];
  };

  const getPoiType = function() {
      const gymEl = document.getElementsByClassName("pogoGym");
      const stopEl = document.getElementsByClassName("pogoStop");
      if (gymEl[0].className.includes("favorite")) {
          return "gym";
      }
      else if (stopEl[0].className.includes("favorite")) {
          return "stop";
      }
      return "none";
    };

  const promptInfo = function() {
    let promptAction = null;
    if (settings.botType == "pokenav") {
      promptAction = prompt("Please enter the ID number for this POI");
    }
    else if (settings.botType == "kyogre") {
      promptAction = prompt("Select the region this POI is in");
    }

    if (promptAction !== null && promptAction !== "") {
      return promptAction;
    } else {
      window.plugin.dialog.message("Failed. Choose a Region.");
      return false;
    }
  };

  const getPortalData = function (portalData) {
    return {
      p_name: portalData.title,
      p_lat: portalData.latE6 / 1e6,
      p_lng: portalData.lngE6 / 1e6,
    };
  };

  const sendCommandToWebhook = function (messageText) {
    let request = new XMLHttpRequest();
    request.open("POST", settings.webhookUrl);
    request.setRequestHeader("Content-type", "application/json");
    const params = {
      username: settings.botName,
      avatar_url: settings.avatarUrl,
      content: messageText,
    };
    request.send(JSON.stringify(params));
    $(".webhookNotification").fadeIn(400).delay(3000).fadeOut(400);


    if (settings.webhookUrlAlt != null && settings.webhookUrlAlt.length > 0) {
      request = new XMLHttpRequest();
      request.open("POST", settings.webhookUrlAlt);
      request.setRequestHeader("Content-type", "application/json");
      request.send(JSON.stringify(params));
    }
  };

  const copyCommandToClipboard = function(messageText) {
    $('body').append('<textarea class="portal-name-textarea">' + messageText + '</textarea>');
    $('.portal-name-textarea').select();
    document.execCommand('copy');
    $('.portal-name-textarea').remove();
    $(".copyNotification").fadeIn(400).delay(3000).fadeOut(400);
  }

  setup.info = plugin_info; //add the script info data to the function as a property
  // if IITC has already booted, immediately run the 'setup' function
  if (window.iitcLoaded) {
    setup();
  } else {
    if (!window.bootPlugins) {
      window.bootPlugins = [];
    }
    window.bootPlugins.push(setup);
  }

  const defaultSettings = {
    botPrefix: "!",
    webhookUrl: "",
    webhookUrlAlt: "",
    botName: "IngressMapper",
    avatarUrl:
      "https://cdn.discordapp.com/attachments/533291273914941460/711554807906959411/IngressMapper.jpg",
    botType: "pokenav"
  };

  let settings = defaultSettings;

  function saveSettings() {
    createThrottledTimer("saveSettings", function () {
      localStorage[KEY_SETTINGS] = JSON.stringify(settings);
    });
  }

  function loadSettings() {
    const tmp = localStorage[KEY_SETTINGS];
    try {
      settings = JSON.parse(tmp);
    } catch (e) {
      // eslint-disable-line no-empty
    }
    if (!settings.botPrefix) {
      settings.botPrefix = "!";
    }
    if (!settings.botType) {
      settings.botType = "pokenav";
    }
  }
}

(function () {
  const plugin_info = {};
  if (typeof GM_info !== 'undefined' && GM_info && GM_info.script) {
    plugin_info.script = {
      version: GM_info.script.version,
      name: GM_info.script.name,
      description: GM_info.script.description
    };
  }
  // Greasemonkey. It will be quite hard to debug
  if (typeof unsafeWindow != 'undefined' || typeof GM_info == 'undefined' || GM_info.scriptHandler != 'Tampermonkey') {
    // inject code into site context
    const script = document.createElement('script');
    script.appendChild(document.createTextNode('(' + wrapper + ')(' + JSON.stringify(plugin_info) + ');'));
    (document.body || document.head || document.documentElement).appendChild(script);
  } else {
    // Tampermonkey, run code directly
    wrapper(plugin_info);
  }
})();
