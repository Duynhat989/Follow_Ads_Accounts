chrome.action.onClicked.addListener(function () {
  chrome.tabs.create({ url: chrome.runtime.getURL("index.html") });
});
chrome.runtime.onMessage.addListener((data, sender, sendResponse) => {
  if (data && data.action === "get") {
    var key = data.key
    chrome.storage.local.get([key], function (result) {
      sendResponse({ response: {
        status:true,
        data:result.prompt
      } });
    });
    return true;
  }
  if (data && data.action === "set") {
    var save = data.data
    var key = data.key
    var dataToSave = {};
    dataToSave[key] = save;
    chrome.storage.local.set(dataToSave, function () {
      sendResponse({ response: {
        status:true
      } });
    });
    return true;
  }
  if (data && data.action === "remove") {
    chrome.storage.local.remove(data.key, function() {
      // Gửi phản hồi với trạng thái thành công
      sendResponse({ response: { status: true } });
    });
    return true;
  }
});