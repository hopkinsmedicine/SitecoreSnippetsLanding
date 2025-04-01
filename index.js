import "./search-items.js";
import "./accordion.js";

// web component code start
// get path from url to determine if we are on the main page or not and hide the copy code button if we are
const path = window.location.pathname;

const template = document.createElement("template");

template.innerHTML = `
<style>
  @import url("https://www.hopkinsmedicine.org/assets/css/base.css");
  *{
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }
  .underline {
    text-decoration: underline;
    cursor: pointer;
  }

  /* ------------------ */
  /* JHM Hero Banner */
  /* ------------------ */

  nav.jh-hero-banner-img {
    min-width: 100%;
    backgrund-color: red;
    background: linear-gradient(rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.9)), url("https://jhmcdn.blob.core.windows.net/custom-snippets/images/puzzle.jpg");
    background-position: center;
    background-size: cover;
  }

  div.jh-hero-link-container{
    width: 100%;
    background-color: #fff;
    height: 3.5rem;
    border-bottom: 1px solid rgba(0,44,199,.2);
  }

  div.jh-hero-link{
    max-width: 75rem;
    margin: auto;
  }

  header.jh-header {
    max-width: 75rem;
    height: 25rem;
    margin: auto;
    display: flex;
    align-items: center;
  }

  div.jh-hero-text {
    color: #09141e;
    padding: 4rem .5rem;
  }

</style>

${
  path === "/custom-snippets/html/" || 
  path === "/custom-snippets/html/index.html" || 
  path === "/html/index.html" || 
  path === "/html/" || 
  path === "/index.html"
    ? `
    <nav class="jh-hero-banner-img">
      <div class="jh-hero-link-container">
        <div class="jh-hero-link">
          <a href='/custom-snippets/html/index.html'>
            <img
              src='https://jhmcdn.blob.core.windows.net/qualtrics-theme/images/jhm-new-header-logo.png'
              alt='Johns Hopkins Medicine Logo'
              class='logo'
            />
          </a>
        </div>
      </div>
      <header class="jh-header">
        <div class="jh-hero-text">
          <h1>Sitecore Generic HTML</h1>
          <p>
            <strong>
              The full list of Johns Hopkins Medicine HTML Snippets living in Sitecore
            </strong>
          </p>
        </div>
      </header>
    </nav>
    `
    : "<span style='display: none'></span>"
}
<hr style="border-top: 1px solid rgba(0,44,199,.2)">
<div style='max-width: 75rem; margin: auto; font-weight: bold; padding: 0; padding: .5rem .5rem 1rem .5rem;  position: relative'>
  ${
    path !== "/html/index.html" && 
    path !== "/html/" && 
    path !== "/custom-snippets/html/index.html" && 
    path !== "/custom-snippets/html/"&& 
    path !== "/index.html"
    ? `
        <div style="padding: .5rem .5rem 1rem .5rem; border: 3px solid #333333">
          <h3 id="snippetName" style='margin: 0'></h3>
          <span style="word-break: break-word" id="snippetLocation"></span>
          <div>
            <button 
              id='copy-code-selector'  
              style='
                cursor: pointer; 
                border: none; 
                background-color: #333333; 
                color: white; 
                border-radius: 8px; 
                padding: 8px 20px; 
                margin-top: 1rem; 
                with: 100%' 
              '
            >
              <i class="fa fa-clone" aria-hidden="true"></i>
              Copy Code Snippet
            </button>
          </div>
        </div>
      `
      : "<span style='display: none'></span>"
  } 
</div>
`;

class CustomHeader extends HTMLElement {
  constructor() {
    super();
    // enable shadow dom
    this.attachShadow({ mode: "open" });
    // append template to shadow dom
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    // add fontawesome cdn to shadow dom in a css file
    const fontAwesome = document.createElement("link");
    fontAwesome.setAttribute("rel", "stylesheet");
    fontAwesome.setAttribute(
      "href",
      "../../styles/fontawesome-4.7.css"
    );
    this.shadowRoot.appendChild(fontAwesome);

    // set h3 to the value of the snippet name if it exists
    this.elementNameContainer = this.shadowRoot.querySelector("#snippetName");
    this.snippetName =
    this.elementNameContainer !== null
    ? (this.elementNameContainer.innerHTML =
      `<strong>Snippet name:</strong> <span>${this.getAttribute('snippetName')}</span>`)
        : "Snippet name: Not assigned.";;

    // set span to the value of the snippet location if it exists
    this.elementLocationContainer = this.shadowRoot.querySelector("#snippetLocation");
    this.elementLocationContainer !== null 
      && this.getAttribute('snippetLocation') !== null
      && (this.elementLocationContainer.innerHTML = `Location: <a target="_blank" rel="noreferrer noopener" href=${this.getAttribute('snippetLocation')}>${this.getAttribute('snippetLocation')}</a>`)
    this.elementLocationContainer !== null && this.getAttribute('snippetLocation') === ""
    && (this.elementLocationContainer.innerText = "Location: Not assigned.")
    
    // if we are on the index page, hide the copy code button, otherwise add event listener to copy code button
    this.shadowRoot.querySelector("#copy-code-selector")
      ? this.shadowRoot
          .querySelector("#copy-code-selector")
          .addEventListener("click", this.showHideCopyCodeButton)
      : null;

    // determine if snippet is ready to be copy paste
    this.snippetCanCopy = Boolean(this.getAttribute("snippetCanCopy"));
  }

  showHideCopyCodeButton = async () => {
    let elToCopy = document.querySelector("#html-snippet").outerHTML.toString();
    await parent.navigator.clipboard.writeText(elToCopy);
    alert(`HTML Snippet copied to clipboard! You can now paste it in Sitecore.`);
  };

  // when the component is connected to the DOM, set the h3 to the value of the snippet name
  connectedCallback() {
    this.h3 = this.getAttribute("snippetName");
    this.span = this.getAttribute("snippetLocation");
    this.snippetCanCopy = this.getAttribute("snippetCanCopy")
    this.copyButton = this.shadowRoot.querySelector("#copy-code-selector")

    if(this.copyButton){
      // show to copy button if the snippet is ready to be copied
      this.snippetCanCopy === "true"
        ? (this.shadowRoot.querySelector("#copy-code-selector").style.display =
            "block")
        : (this.shadowRoot.querySelector("#copy-code-selector").style.display =
            "none");
    }
  }
}

window.customElements.define("custom-header", CustomHeader);
// web component end
