chrome.runtime.sendMessage({method: "getSubstitutions"}, function(response) {
  var replacements = response.status.split("\n");

  if (replacements.length == 0) { return; }
  for (var i = 0; i < replacements.length; i++) {
    replacements[i] = replacements[i].split(/(?:(?: )+|)\|\|\|(?:(?: )+|)/);
  }
  var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
  var node;

  while(node = walker.nextNode()) {
    for (var i = 0; i < replacements.length; i++) {
      var nodeData = node.data;
      var search = replacements[i][0];
      var substitution = replacements[i][1];
      if (!node.nodeValue || node.parentElement.tagName.toLowerCase() == 'script' || !search || !substitution) { continue ; }
      var r = node.data.replace(new RegExp(search, "g"), substitution);
      if (r != node.data) {
        node.nodeValue = r;
      }
    }
  }
});
