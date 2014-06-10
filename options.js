document.addEventListener("DOMContentLoaded", function() {
  var saveButton     = document.getElementById("save_button"),
      helpButton     = document.getElementById("help_button"),
      helpContainer  = document.getElementById("help_container"),
      helpClose      = document.getElementById("help_box_closebutton"),
      replacementsEl = document.getElementById("replacements");
  replacementsEl.addEventListener("focus", function() {
    saveButton.textContent = "Save Changes";
  });
  saveButton.addEventListener("click", function() {
    localStorage.replacements = replacementsEl.value;
    this.textContent = "Saved";
  });
  if (!localStorage.helpshown && !localStorage.replacements) {
    localStorage.helpshown = "1";
    $("#help_container, #help_box").fadeIn("slow");
  } else {
    replacementsEl.value = localStorage.replacements || "";
  }
  helpButton.addEventListener("click", function() {
    helpContainer.style.zIndex = "1";
    helpContainer.style.opacity = "1";
  });
  helpContainer.addEventListener("mousedown", function(e) {
    if (e.target === helpContainer) {
      helpContainer.style.zIndex = "-1";
      helpContainer.style.opacity = "0";
    }
  });
  helpClose.addEventListener("click", function() {
    helpContainer.style.zIndex = "-1";
    helpContainer.style.opacity = "0";
  });
});
