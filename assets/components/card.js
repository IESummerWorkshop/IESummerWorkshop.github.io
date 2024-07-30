class Card extends HTMLElement {
    connectedCallback() {
    let link;
    if (this.hasAttribute("link")) {
        link = this.getAttribute("link");
    } else {
        link = "#";
    }

    let topic;
    if (this.hasAttribute("topic")) {
        topic = this.getAttribute("topic");
    } else {
        topic = "Default";
    }

    let badge;
    if (this.hasAttribute("badge")) {
        badge = this.getAttribute("badge");
    } else {
        badge = "";
    }

    let badgeColor;
    if (this.hasAttribute("badgeColor")) {
        badgeColor = this.getAttribute("badgeColor");
    } else {
        badgeColor = "";
    }

    this.innerHTML = `
    <div class="col">
    <a class="link-underline link-underline-opacity-0" href="`+ link +`">
    <div class="card-hover card overflow-hidden rounded-4 card-background">
    <div class="d-flex flex-column p-3 text-white text-shadow-1">
        <h3 class="pt-5 mb-3 fs-3 fw-bold"> `+ topic +`</h3>
        <div class="me-auto mt-2">
            <span class="badge rounded-pill `+badgeColor+`">`+badge+`</span>
        </div>
    </div>
    </div>
    </a>
    </div>
    `;
  }
  }
  
  customElements.define('card-component', Card);