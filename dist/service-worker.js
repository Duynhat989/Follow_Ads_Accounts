(function () {
	'use strict';

	chrome.action.onClicked.addListener(function(){chrome.tabs.create({url:chrome.runtime.getURL("index.html")});});chrome.runtime.onMessage.addListener((e,u,r)=>{if(e&&e.action==="get"){var t=e.key;return chrome.storage.local.get([t],function(c){r({response:{status:!0,data:c.prompt}});}),!0}if(e&&e.action==="set"){var n=e.data,t=e.key,o={};return o[t]=n,chrome.storage.local.set(o,function(){r({response:{status:!0}});}),!0}if(e&&e.action==="remove")return chrome.storage.local.remove(e.key,function(){r({response:{status:!0}});}),!0});

})();
