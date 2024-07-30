class FlagMenu {
    constructor({onComplete, flagValue}) {
      this.flagValue = flagValue;
      this.onComplete = onComplete;
    }
  
    getOptions() {
      return {
      root: [
        {
          label: "Yes",
          description: `Enter the flag`,
          handler: () => {
            this.keyboardMenu.setInputbox(this.getOptions().flagPage)
          }
        },
        {
          label: "No",
          description: "Close the menu",
          handler: () => {
            this.close();
          }
        }
      ],
      flagPage: [
        {
            label: "Submit",
            description: `Enter the flag`,
            inputbox: true,
            handler: () => {
              //addUserRecord("test20202@gmail.com", "Angela is on999999999")
              console.log(document.getElementById("flag").value);
              this.flagValue = document.getElementById("flag").value;
              this.close(this.flagValue);
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
    }
  
    createElement() {
      this.element = document.createElement("div");
      this.element.classList.add("SelectionMenu");
      this.element.classList.add("overlayMenu");
      this.element.innerHTML = (`
        <h2>Submit the flag</h2>
      `)
    }
  
    close(flag) {
      this.keyboardMenu.end();
      this.element.remove();
      this.onComplete(flag);
    }
  
  
    init(container) {
      this.createElement();
      this.keyboardMenu = new KeyboardMenu({
        descriptionContainer: container
      })
      this.keyboardMenu.init(this.element)
      this.keyboardMenu.setInputbox(this.getOptions().flagPage)
  
      container.appendChild(this.element);
    }
  }