document.addEventListener("DOMContentLoaded", function () {
  var feedback = document.forms.feedback;
  if (!feedback) return;

  feedback.hidden = false;

  // Use a simple click listener on the buttons to get the data
  var buttons = feedback.querySelectorAll("[data-md-value]");
  buttons.forEach(function (button) {
    button.addEventListener("click", function (ev) {
      ev.preventDefault();

      var page = document.location.pathname;
      var data = button.getAttribute("data-md-value");

      console.log(page, data);

      // Disable all buttons in the form to prevent double-submits
      buttons.forEach(function (btn) {
        btn.disabled = true;
      });

      var note = feedback.querySelector(
        ".md-feedback__note [data-md-value='" + data + "']"
      );
      if (note) {
        note.hidden = false;
      }
    });
  });
});
