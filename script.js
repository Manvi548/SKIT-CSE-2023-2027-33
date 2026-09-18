function selectInput(inputType) {
  const message = document.getElementById("message");

  message.innerHTML =
    "<strong>" + inputType + " selected!</strong><br>" +
    "The " + inputType.toLowerCase() +
    " input interface will be developed in the next stage.";

  message.scrollIntoView({
    behavior: "smooth",
    block: "center"
  });
}
