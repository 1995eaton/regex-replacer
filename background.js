chrome.runtime.onMessage.addListener(function(request, sender, callback) {
  callback(localStorage.replacements);
});
