document.addEventListener("DOMContentLoaded", function() {
  chrome.runtime.sendMessage({method: "getSubstitutions"}, function(response) {
    var replacements, replacement, repLen, nodeName, iterator, node;
    if (!document || !document.body || !response || response.length === 0) {
      return;
    }
    replacements = response.split(/\n+/)
        .filter(function(e) { return e; })
        .map(function(e) { return e.split(/ *\|{3} */); });
    repLen = replacements.length;
    iterator = document.createNodeIterator(document.body, NodeFilter.SHOW_TEXT, function(node) {
      if (!node.parentNode) {
        return NodeFilter.FILTER_REJECT;
      }
      nodeName = node.parentNode.localName.toLowerCase();
      if (nodeName === "script" || nodeName === "style" || nodeName === "noscript" || !node.data) {
        return NodeFilter.FILTER_REJECT;
      }
      return NodeFilter.FILTER_ACCEPT;
    }, false);
    while (node = iterator.nextNode()) {
      for (var i = 0; i < repLen; i++) {
        replacement = node.data.replace(new RegExp(replacements[i][0], "g"), replacements[i][1]);
        if (replacement !== node.data) {
          node.data = replacement;
        }
      }
    }
  });
});
