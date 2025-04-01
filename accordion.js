const accordionButton = document.querySelectorAll(".accordion-button");

accordionButton.forEach((button) => {
  button.addEventListener("click", () => {
    button.classList.toggle("active");
    const panel = button.parentElement.nextElementSibling;
    const arrow = button.querySelector(".icon-container");
    // toggle visibility: visible, opacity: 1 and height: auto to the panel
    if (panel.style.visibility === "visible") {
      panel.style.visibility = "hidden";
      panel.style.opacity = "0";
      panel.style.height = "0";
      arrow.style.transform = "rotate(0deg)";
    } else {
      panel.style.visibility = "visible";
      panel.style.opacity = "1";
      panel.style.height = "auto";
      arrow.style.transform = "rotate(180deg)";
    }
  });
});
