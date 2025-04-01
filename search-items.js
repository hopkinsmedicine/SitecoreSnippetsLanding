// wait for DOM to load
window.addEventListener("DOMContentLoaded", () => {
  // select the form and prevent default submit
  let form = document.querySelector("#search-items");

  if(form){
    form.addEventListener("submit", (e) => {
      e.preventDefault();
    });
  }

  // accordion container
  const accordionContainer = document.querySelectorAll(".accordion-content");

  // get all the searchable items
  const itemsList = document.querySelectorAll("li.searchable-item");

  const totalItemsToSearch = itemsList.length;

  let totalEmptyResults;

  // form input to get search value
  const formInput = document.querySelector("input.search-input");

  // get empty containers to restoe
  const accordioItems = document.querySelectorAll(".accordion-item");



  // return if these elements does not exist
  if (!itemsList || !formInput) return;

  if(formInput){
    formInput.addEventListener("keyup", (e) => {
      e.preventDefault();
  
      itemsList.forEach((item) => {
        // get the item's text
        const itemText = item.textContent.toLowerCase();
        // get the input's value
        const inputText = e.target.value.toLowerCase();
        
        // if the item's text contains the input's value, show it
        if (itemText.includes(inputText) && inputText !== "") {
          item.style.display = "list-item";
          accordionContainer.forEach((a) => {
            a.classList.add("showing-results");
            a.style.visibility = "visible";
            a.style.opacity = "1";
            a.style.height = "auto";
            a.previousElementSibling.children[0].children[0].style.transform =
            "rotate(180deg)";
          });

        // if the item's text is blank restore default view
        } else if (inputText === "") {
          accordioItems.forEach((a) => {
            a.style.display = "block";
          });
          accordionContainer.forEach((a) => {
            a.style.display = "block";
            a.classList.remove("showing-results");
            item.classList.remove("empty-results")
            a.style.visibility = "hidden";
            a.style.opacity = "0";
            a.style.height = "0";
            a.previousElementSibling.children[0].children[0].style.transform =
              "rotate(0deg)";
          });
          document.querySelector("#no-results").textContent = "";
          // hide elements that don't match search input
        } else {
          console.log("not matching")
          // remove parent element
          item.style.display = "none";
          item.classList.add("empty-results")
          const ul = item.parentElement;
          var isEmpty = 0
          ul.querySelectorAll("li").forEach((li) => {
            if(li.classList.contains("empty-results")){
              isEmpty++
              
              if(ul.childElementCount === isEmpty){
                ul.parentElement.parentElement.style.display = "none";
              }
            }
          });
          
          totalEmptyResults = document.querySelectorAll(".empty-results").length;
          if(totalEmptyResults === totalItemsToSearch){
            document.querySelector("#no-results").textContent = "No results found.";
          } else {
            document.querySelector("#no-results").textContent = "";
          }
        }
      });
    });
  }

});
