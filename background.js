chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.method == "getSubstitutions")
  sendResponse({status: localStorage['replacements']});
  else
  sendResponse({});
});

document.querySelector('#replacements').addEventListener('focus', function() {
  document.getElementById("save_button").firstChild.data = "Save Changes";
});

document.addEventListener('DOMContentLoaded', function() {
  var replacements = localStorage["replacements"];
  if (!localStorage["helpshown"] && !replacements) {
    $("#help_container, #help_box").fadeIn('slow');
    localStorage["helpshown"] = true;
    return;
  }
  document.getElementById("replacements").value = replacements;
});

document.querySelector('#save_button').addEventListener('click', function() {
  var replacements = document.getElementById("replacements").value;
  localStorage["replacements"] = replacements;
  document.getElementById("save_button").firstChild.data = "Saved";
});

$("#help a").click(function() {
  $("#help_container, #help_box").fadeIn('slow');
});

$('#help_box_closebutton, #help_container').click(function() {
  $("#help_container, #help_box").fadeOut('slow');
});
