class SelectionMenu {
    constructor({lab, link, onComplete}) {
      this.onComplete = onComplete;
      this.lab = lab;
      this.link = link;
    }
  
    getOptions() {
      return [
        {
          label: "Yes",
          description: `${this.lab}`,
          handler: () => {
            window.open(this.link, "_blank");
            this.close();
          }
        },
        {
          label: "No",
          description: "Close the menu",
          handler: () => {
            this.close();
          }
        }
      ]
    }
  
    createElement() {
      this.element = document.createElement("div");
      this.element.classList.add("SelectionMenu");
      this.element.classList.add("overlayMenu");
      this.element.innerHTML = (`
        <h2>Select an option</h2>
      `)
    }
  
    close() {
      this.keyboardMenu.end();
      this.element.remove();
      this.onComplete();
    }
  
  
    init(container) {
      this.createElement();
      this.keyboardMenu = new KeyboardMenu({
        descriptionContainer: container
      })
      this.keyboardMenu.init(this.element)
      this.keyboardMenu.setOptions(this.getOptions())
  
      container.appendChild(this.element);
    }
  }